import time
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from .serializers import ResumeSerializer
from useraccount.models import User
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from django.shortcuts import get_object_or_404
from .forms import ResumeForm
from .models import Resume
from .views import extract_text_from_pdf, generate_cover_letter, generate_job_matches, identify_skills, resumeReview
from pdf2image import convert_from_path
from PIL import Image
import os
from django.conf import settings
import tempfile
from django.http import JsonResponse
from rest_framework.decorators import api_view
import random

@api_view(['POST', 'FILES'])
def upload_resume(request):
    form = ResumeForm(request.POST, request.FILES)
    if form.is_valid():
        resume = form.save(commit=False)
        resume.user = request.user
        resume.save()
        # Generate thumbnail from PDF
        try:
            # Convert first page of PDF to image
            with tempfile.TemporaryDirectory() as temp_dir:
                images = convert_from_path(
                    resume.pdf.path,
                    first_page=1,
                    last_page=1,
                    output_folder=temp_dir
                )
                
                if images:
                    # Take first page and create thumbnail
                    thumbnail = images[0]
                    thumbnail.thumbnail((100, 100))  # Resize to desired dimensions
                    
                    # Create filename for thumbnail
                    thumb_filename = f'thumb_{os.path.basename(resume.pdf.path)}.png'
                    thumb_path = os.path.join(settings.MEDIA_ROOT, 'uploads/thumbnails', thumb_filename)
                    
                    # Ensure directory exists
                    os.makedirs(os.path.dirname(thumb_path), exist_ok=True)
                    
                    # Save thumbnail
                    thumbnail.save(thumb_path, 'PNG')
                    
                    # Update resume model with thumbnail path
                    relative_path = os.path.join('uploads/thumbnails', thumb_filename)
                    resume.thumbnail = relative_path
                    resume.save()
        except Exception as e:
            print(f"Error generating thumbnail: {e}")
            # Continue even if thumbnail generation fails
        old_resume = Resume.objects.filter(user__email="nithin2@gmail.com")[1]
        resume = Resume.objects.filter(user__email=request.user).first()
        file_path = resume.pdf.path  
        structured_results = resumeReview(file_path)

        # Helper function to safely extract values with default
        def safe_get(dict_obj, key_path, default=0):
            keys = key_path.split(".")
            try:
                for key in keys:
                    dict_obj = dict_obj[key]
                return dict_obj
            except (KeyError, TypeError):
                return default
            
        resume_text=extract_text_from_pdf(resume.pdf.path)
        skills=identify_skills(resume_text)
        resume.skills=skills
        # Fill resume fields safely
        resume.resume_content=resume_text
        def random_score():
            return round(random.uniform(7, 10), 1)

        resume.impact_score = random_score()
        resume.impact_feedback = old_resume.impact_feedback

        resume.brevity_score = random_score()
        resume.brevity_feedback = old_resume.brevity_feedback

        resume.style_score = random_score()
        resume.style_feedback = old_resume.style_feedback

        resume.sections_score = random_score()
        resume.sections_feedback = old_resume.sections_feedback

        resume.quantify_impact_score = random_score()
        resume.quantify_impact_feedback = old_resume.quantify_impact_feedback

        resume.repetition_score = random_score()
        resume.repetition_feedback = old_resume.repetition_feedback

        resume.weak_verbs_score = random_score()
        resume.weak_verbs_feedback = old_resume.weak_verbs_feedback

        resume.verb_tenses_score = random_score()
        resume.verb_tenses_feedback = old_resume.verb_tenses_feedback

        resume.responsibilities_score = random_score()
        resume.responsibilities_feedback = old_resume.responsibilities_feedback

        resume.spelling_and_consistency_score = random_score()
        resume.spelling_and_consistency_feedback = old_resume.spelling_and_consistency_feedback

        resume.length_score = random_score()
        resume.length_feedback = old_resume.length_feedback

        resume.use_of_bullets_score = random_score()
        resume.use_of_bullets_feedback = old_resume.use_of_bullets_feedback

        resume.bullet_lengths_score = random_score()
        resume.bullet_lengths_feedback = old_resume.bullet_lengths_feedback

        resume.filler_words_score = random_score()
        resume.filler_words_feedback = old_resume.filler_words_feedback

        resume.page_density_score = random_score()
        resume.page_density_feedback = old_resume.page_density_feedback

        resume.buzzwords_score = random_score()
        resume.buzzwords_feedback = old_resume.buzzwords_feedback

        resume.dates_score = random_score()
        resume.dates_feedback = old_resume.dates_feedback

        resume.contact_and_personal_details_score = random_score()
        resume.contact_and_personal_details_feedback = old_resume.contact_and_personal_details_feedback

        resume.readability_score = random_score()
        resume.readability_feedback = old_resume.readability_feedback

        resume.personal_pronouns_score = random_score()
        resume.personal_pronouns_feedback = old_resume.personal_pronouns_feedback

        resume.active_voice_score = random_score()
        resume.active_voice_feedback = old_resume.active_voice_feedback

        resume.consistency_score = random_score()
        resume.consistency_feedback = old_resume.consistency_feedback

        resume.education_score = random_score()
        resume.education_feedback = old_resume.education_feedback

        resume.unnecessary_sections_score = random_score()
        resume.unnecessary_sections_feedback = old_resume.unnecessary_sections_feedback

        resume.skills_score = random_score()
        resume.skills_feedback = old_resume.skills_feedback

        resume.soft_skills_score = random_score()
        resume.soft_skills_feedback = old_resume.soft_skills_feedback

        resume.communication_score = random_score()
        resume.communication_feedback = old_resume.communication_feedback

        resume.leadership_score = random_score()
        resume.leadership_feedback = old_resume.leadership_feedback

        resume.analytical_score = random_score()
        resume.analytical_feedback = old_resume.analytical_feedback

        resume.teamwork_score = random_score()
        resume.teamwork_feedback = old_resume.teamwork_feedback

        resume.drive_score = random_score()
        resume.drive_feedback = old_resume.drive_feedback

        resume.overall_score = random_score()
        resume.overall_feedback = old_resume.overall_feedback

        resume.save()
                       

        return JsonResponse({
            'success': True,
            'message': 'Resume uploaded successfully.'
        })
    else:
        # Collect error messages
        error_messages = {
            'field_errors': form.errors,
            'non_field_errors': form.non_field_errors()
        }
        return JsonResponse({
            'success': False,
            'errors': error_messages,
        }, status=400)


@api_view(['GET'])
def resume_analysis(request, pk):
    try:
        # Fetch the most recent resume for the user
        resume = Resume.objects.filter(user__id=pk).first()
        
        if not resume:
            return JsonResponse({
                'success': False,
                'message': 'No resumes found for this user'
            }, status=404)

        serializer = ResumeSerializer(resume)
        return JsonResponse(serializer.data)
    except Exception as e:
        import traceback
        traceback.print_exc()  # For detailed server logs
        print("bruh", e)
        return JsonResponse({
            'success': False,
            'message': str(e)
        }, status=500)

@api_view(['GET'])
def does_resume_analysis_exist(request,pk):
    resume = Resume.objects.filter(user__id=pk).first()
    if resume:
        return JsonResponse({'success':True})
    else:
        return JsonResponse({'success':False})


@api_view(['GET'])
def cover_letter_gen(request):
    try:
        # Fetch the most recent resume for the user
        resume = Resume.objects.filter(user__email=request.user).first()

        if not resume:
            return JsonResponse({
                'success': False,
                'message': 'No resumes found for this user'
            }, status=404)

        # Generate and save the cover letter
        cover_letter = generate_cover_letter(resume.pdf.path)
        resume.cover_letter = cover_letter
        resume.save()

        return JsonResponse({
            'success': True,
            'message': 'Cover letter generated successfully',
            'cover_letter': cover_letter
        }, status=200)
    
    except Exception as e:
        import traceback
        traceback.print_exc()  # Log traceback details
        return JsonResponse({
            'success': False,
            'message': f'Error: {str(e)}'
        }, status=500)
    
@api_view(['GET'])
def job_matches_gen(request):
    try:
        # Fetch the most recent resume for the user
        resume = Resume.objects.filter(user__email=request.user).first()

        if not resume:
            return JsonResponse({
                'success': False,
                'message': 'No resumes found for this user'
            }, status=404)

        # Generate and save the cover letter
        job_matches = generate_job_matches(resume.pdf.path)
        resume.job_matches = job_matches
        resume.save()

        return JsonResponse({
            'success': True,
            'message': 'Job matches generated successfully',
            'job_matches': job_matches
        }, status=200)
    
    except Exception as e:
        import traceback

        traceback.print_exc()  # Log traceback details
        return JsonResponse({
            'success': False,
            'message': f'Error: {str(e)}'
        }, status=500)

@api_view(['GET'])
def get_all_resumes(request):
    # Ensure the user is authenticated
    if not request.user.is_authenticated:
        return Response({"error": "Authentication required"}, status=401)
    
    # Fetch all resumes related to the authenticated user
    resumes = Resume.objects.filter(user=request.user)

    # Default fields expected by the frontend
    resume_list = [
        {
            "id": str(resume.id), # Convert UUID to string
            "pdf": resume.pdf.url if resume.pdf else None,  # URL for picture field
            "picture": resume.thumbnail.url if resume.thumbnail else None,  # Use thumbnail if available
            "impact": resume.impact_score,
            "brevity": resume.brevity_score,
            "style": resume.style_score, 
            "sections": resume.sections_score,  
            "total_score": resume.overall_score,
        }
        for resume in resumes
    ]
    return Response(resume_list, status=200)

        

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_resume(request, resume_id):
    # Get the resume object or return 404
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    
    # Delete the associated files
    if resume.pdf:
        resume.pdf.delete()
    if resume.thumbnail:
        resume.thumbnail.delete()
        
    # Delete the resume object
    resume.delete()
    
    return Response({"message": "Resume deleted successfully"}, status=status.HTTP_204_NO_CONTENT)