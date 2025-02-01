import uuid
from django.conf import settings
from django.db import models
from useraccount.models import User

class Resume(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user=models.ForeignKey(User,related_name='resumes',on_delete=models.CASCADE)
    pdf = models.FileField(upload_to='uploads/resumes/', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='uploads/thumbnails/', null=True, blank=True)
    resume_content=models.TextField(blank=True, null=True)
    skills = models.JSONField(default=list, blank=True, null=True)
    
    ############### Impact #################

    impact_score = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    impact_feedback = models.TextField(blank=True, null=True)

    quantify_impact_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    quantify_impact_feedback = models.TextField(blank=True, null=True)

    repetition_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    repetition_feedback = models.TextField(blank=True, null=True)

    weak_verbs_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    weak_verbs_feedback = models.TextField(blank=True, null=True)

    verb_tenses_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    verb_tenses_feedback = models.TextField(blank=True, null=True)

    responsibilities_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    responsibilities_feedback = models.TextField(blank=True, null=True)

    spelling_and_consistency_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    spelling_and_consistency_feedback = models.TextField(blank=True, null=True)

    ################ Brevity #############3

    brevity_score = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    brevity_feedback = models.TextField(blank=True, null=True)

    length_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    length_feedback = models.TextField(blank=True, null=True)

    use_of_bullets_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    use_of_bullets_feedback = models.TextField(blank=True, null=True)

    bullet_lengths_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    bullet_lengths_feedback = models.TextField(blank=True, null=True)

    filler_words_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    filler_words_feedback = models.TextField(blank=True, null=True)

    page_density_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    page_density_feedback = models.TextField(blank=True, null=True)

    ###################Style#############

    style_score = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    style_feedback = models.TextField(blank=True, null=True)

    buzzwords_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    buzzwords_feedback = models.TextField(blank=True, null=True)

    dates_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    dates_feedback = models.TextField(blank=True, null=True)

    contact_and_personal_details_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    contact_and_personal_details_feedback = models.TextField(blank=True, null=True)

    readability_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    readability_feedback = models.TextField(blank=True, null=True)

    personal_pronouns_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    personal_pronouns_feedback = models.TextField(blank=True, null=True)

    active_voice_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    active_voice_feedback = models.TextField(blank=True, null=True)

    consistency_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    consistency_feedback = models.TextField(blank=True, null=True)

    ################# Sections #######################

    sections_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    sections_feedback = models.TextField(blank=True, null=True)

    education_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    education_feedback = models.TextField(blank=True, null=True)

    unnecessary_sections_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    unnecessary_sections_feedback = models.TextField(blank=True, null=True)

    skills_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    skills_feedback = models.TextField(blank=True, null=True)

    ######## Soft Skills ####################

    soft_skills_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    soft_skills_feedback = models.TextField(blank=True, null=True)

    communication_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    communication_feedback = models.TextField(blank=True, null=True)

    leadership_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    leadership_feedback = models.TextField(blank=True, null=True)

    analytical_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    analytical_feedback = models.TextField(blank=True, null=True)

    teamwork_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    teamwork_feedback = models.TextField(blank=True, null=True)

    drive_score = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    drive_feedback = models.TextField(blank=True, null=True)

    overall_score=models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    overall_feedback=models.TextField(blank=True, null=True)

    cover_letter=models.TextField(blank=True, null=True)
    job_matches=models.TextField(blank=True, null=True)


    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Resume"
        verbose_name_plural = "Resumes"
        ordering = ['-created_at']

    def __str__(self):
        return f"Resume {self.id} for User {self.user.email}"

    def get_pdf_url(self):
        """Return the full URL to the uploaded PDF if available."""
        if self.pdf:
            return f'{settings.WEBSITE_URL}{self.pdf.url}'
        return ''
