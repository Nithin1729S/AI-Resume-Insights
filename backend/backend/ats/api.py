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

@api_view(['POST', 'FILES'])
def upload_resume(request):
    form = ResumeForm(request.POST, request.FILES)
    if form.is_valid():
        uploaded_file = request.FILES.get('pdf')
        import tempfile

        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
            for chunk in uploaded_file.chunks():
                tmp_file.write(chunk)
            tmp_file_path = tmp_file.name

        new_resume_text = extract_text_from_pdf(tmp_file_path)
        existing_resume = Resume.objects.filter(resume_content=new_resume_text).first()
        if existing_resume:
            # Return the existing resume info (using a serializer if needed)
            serializer = ResumeSerializer(existing_resume)
            return JsonResponse({
                'success': True,
                'message': 'Resume already exists, returning stored resume.',
                'data': serializer.data
            })
        
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
        print(safe_get(structured_results, "agent_summaries.Impact.score", 0))
        resume_text=extract_text_from_pdf(resume.pdf.path)
        skills=identify_skills(resume_text)
        resume.skills=skills
        # Fill resume fields safely
        resume.resume_content = resume_text
        resume.impact_score = safe_get(structured_results, "agent_summaries.Impact.score", 5)
        resume.impact_feedback = safe_get(structured_results, "agent_summaries.Impact.feedback", "The impact score reflects how effectively your resume demonstrates measurable achievements and contributions.")

        resume.brevity_score = safe_get(structured_results, "agent_summaries.Brevity.score", 5)
        resume.brevity_feedback = safe_get(structured_results, "agent_summaries.Brevity.feedback", "The brevity score evaluates how concise and to-the-point your resume content is.")

        resume.style_score = safe_get(structured_results, "agent_summaries.Style.score", 5)
        resume.style_feedback = safe_get(structured_results, "agent_summaries.Style.feedback", "The style score assesses the overall formatting, design, and readability of your resume.")

        resume.sections_score = safe_get(structured_results, "agent_summaries.Sections.score", 5)
        resume.sections_feedback = safe_get(structured_results, "agent_summaries.Sections.feedback", "The sections score measures how well-organized and appropriately structured your resume sections are.")

        resume.quantify_impact_score = safe_get(structured_results, "subagent_analysis.Quantify impact.score", 5)
        resume.quantify_impact_feedback = safe_get(structured_results, "subagent_analysis.Quantify impact.feedback", "The quantify impact score evaluates how effectively you use numbers and metrics to highlight achievements.")

        resume.repetition_score = safe_get(structured_results, "subagent_analysis.Repetition.score", 5)
        resume.repetition_feedback = safe_get(structured_results, "subagent_analysis.Repetition.feedback", "The repetition score identifies redundant phrases or repeated information in your resume.")

        resume.weak_verbs_score = safe_get(structured_results, "subagent_analysis.Weak verbs.score", 5)
        resume.weak_verbs_feedback = safe_get(structured_results, "subagent_analysis.Weak verbs.feedback", "The weak verbs score highlights the use of less impactful verbs that could be replaced with stronger alternatives.")

        resume.verb_tenses_score = safe_get(structured_results, "subagent_analysis.Verb tenses.score", 5)
        resume.verb_tenses_feedback = safe_get(structured_results, "subagent_analysis.Verb tenses.feedback", "The verb tenses score ensures consistency in the use of past and present tense throughout your resume.")

        resume.responsibilities_score = safe_get(structured_results, "subagent_analysis.Responsibilities.score", 5)
        resume.responsibilities_feedback = safe_get(structured_results, "subagent_analysis.Responsibilities.feedback", "The responsibilities score evaluates how effectively your resume highlights key job responsibilities and aligns them with the desired role.")

        resume.spelling_and_consistency_score = safe_get(structured_results, "subagent_analysis.Spelling & consistency.score", 5)
        resume.spelling_and_consistency_feedback = safe_get(structured_results, "subagent_analysis.Spelling & consistency.feedback", "The spelling and consistency score ensures that your resume is free from spelling errors and maintains consistent formatting throughout.")

        resume.length_score = safe_get(structured_results, "subagent_analysis.Length.score", 5)
        resume.length_feedback = safe_get(structured_results, "subagent_analysis.Length.feedback", "The length score assesses whether your resume is appropriately concise while still providing all necessary details for the role.")

        resume.use_of_bullets_score = safe_get(structured_results, "subagent_analysis.Use of bullets.score", 5)
        resume.use_of_bullets_feedback = safe_get(structured_results, "subagent_analysis.Use of bullets.feedback", "The use of bullets score evaluates how effectively bullet points are used to present information in a clear and organized manner.")

        resume.bullet_lengths_score = safe_get(structured_results, "subagent_analysis.Bullet Lengths.score", 5)
        resume.bullet_lengths_feedback = safe_get(structured_results, "subagent_analysis.Bullet Lengths.feedback", "The bullet lengths score measures whether your bullet points are concise and to the point, avoiding overly long or vague descriptions.")

        resume.filler_words_score = safe_get(structured_results, "subagent_analysis.Filler Words.score", 5)
        resume.filler_words_feedback = safe_get(structured_results, "subagent_analysis.Filler Words.feedback", "The filler words score identifies unnecessary words or phrases that could be removed to make your resume more impactful and professional.")

        resume.page_density_score = safe_get(structured_results, "subagent_analysis.Page Density.score", 5)
        resume.page_density_feedback = safe_get(structured_results, "subagent_analysis.Page Density.feedback", "The page density score evaluates the balance between text and white space on your resume, ensuring it is visually appealing and easy to read.")

        resume.buzzwords_score = safe_get(structured_results, "subagent_analysis.Buzzwords.score", 5)
        resume.buzzwords_feedback = safe_get(structured_results, "subagent_analysis.Buzzwords.feedback", "The buzzwords score highlights the use of overused or generic terms, encouraging the inclusion of more specific and impactful language.")

        resume.dates_score = safe_get(structured_results, "subagent_analysis.Dates.score", 5)
        resume.dates_feedback = safe_get(structured_results, "subagent_analysis.Dates.feedback", "The dates score ensures that all dates on your resume are accurate, properly formatted, and clearly indicate the timeline of your experiences.")

        resume.contact_and_personal_details_score = safe_get(structured_results, "subagent_analysis.Contact and Personal Details.score", 5)
        resume.contact_and_personal_details_feedback = safe_get(structured_results, "subagent_analysis.Contact and Personal Details.feedback", "The contact and personal details section ensures your resume includes accurate and professional information for potential employers to reach you effectively.")

        resume.readability_score = safe_get(structured_results, "subagent_analysis.Readability.score", 5)
        resume.readability_feedback = safe_get(structured_results, "subagent_analysis.Readability.feedback", "The readability score evaluates how easy it is for hiring managers to read and understand the content of your resume.")

        resume.personal_pronouns_score = safe_get(structured_results, "subagent_analysis.Personal Pronouns.score", 5)
        resume.personal_pronouns_feedback = safe_get(structured_results, "subagent_analysis.Personal Pronouns.feedback", "The personal pronouns score ensures that your resume avoids the use of first-person pronouns, maintaining a professional tone.")

        resume.active_voice_score = safe_get(structured_results, "subagent_analysis.Active Voice.score", 5)
        resume.active_voice_feedback = safe_get(structured_results, "subagent_analysis.Active Voice.feedback", "The active voice score evaluates how effectively your resume uses active voice to convey a strong and confident tone.")

        resume.consistency_score = safe_get(structured_results, "subagent_analysis.Consistency.score", 5)
        resume.consistency_feedback = safe_get(structured_results, "subagent_analysis.Consistency.feedback", "The consistency score ensures that your resume maintains uniform formatting, style, and tone throughout the document.")

        resume.education_score = safe_get(structured_results, "subagent_analysis.Education.score", 5)
        resume.education_feedback = safe_get(structured_results, "subagent_analysis.Education.feedback", "The education score evaluates how well your academic qualifications are presented and aligned with the job requirements.")

        resume.unnecessary_sections_score = safe_get(structured_results, "subagent_analysis.Unnecessary Sections.score", 5)
        resume.unnecessary_sections_feedback = safe_get(structured_results, "subagent_analysis.Unnecessary Sections.feedback", "The unnecessary sections score identifies any irrelevant or redundant sections that could be removed to improve your resume's focus.")

        resume.skills_score = safe_get(structured_results, "subagent_analysis.Skills.score", 5)
        resume.skills_feedback = safe_get(structured_results, "subagent_analysis.Skills.feedback", "The skills score evaluates how effectively your resume highlights relevant technical and professional skills for the desired role.")

        resume.soft_skills_score = safe_get(structured_results, "agent_summaries.SoftSkills.score", 5)
        resume.soft_skills_feedback = safe_get(structured_results, "agent_summaries.SoftSkills.feedback", "The soft skills score assesses how well your resume demonstrates interpersonal and communication skills essential for workplace success.")

        resume.communication_score = safe_get(structured_results, "subagent_analysis.Communication.score", 5)
        resume.communication_feedback = safe_get(structured_results, "subagent_analysis.Communication.feedback", "The communication score evaluates how effectively your resume conveys your ability to articulate ideas and collaborate with others.")

        resume.leadership_score = safe_get(structured_results, "subagent_analysis.Leadership.score", 5)
        resume.leadership_feedback = safe_get(structured_results, "subagent_analysis.Leadership.feedback", "The leadership score highlights your ability to take initiative, guide teams, and achieve results in professional settings.")

        resume.analytical_score = safe_get(structured_results, "subagent_analysis.Analytical.score", 5)
        resume.analytical_feedback = safe_get(structured_results, "subagent_analysis.Analytical.feedback", "The analytical score evaluates how well your resume demonstrates problem-solving and critical thinking skills relevant to the role.")

        resume.teamwork_score = safe_get(structured_results, "subagent_analysis.Teamwork.score", 5)
        resume.teamwork_feedback = safe_get(structured_results, "subagent_analysis.Teamwork.feedback", "The teamwork score assesses how effectively your resume showcases your ability to collaborate and work cohesively with others.")

        resume.drive_score = safe_get(structured_results, "subagent_analysis.Drive.score", 5)
        resume.drive_feedback = safe_get(structured_results, "subagent_analysis.Drive.feedback", "The drive score evaluates how well your resume reflects your motivation, ambition, and commitment to achieving professional goals.")

        resume.overall_score = safe_get(structured_results, "final_verdict.score", 5)
        resume.overall_feedback = safe_get(structured_results, "final_verdict.feedback", "The overall score provides a comprehensive evaluation of your resume's effectiveness in presenting your qualifications and suitability for the role.")

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