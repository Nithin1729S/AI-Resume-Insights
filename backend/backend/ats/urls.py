from django.urls import path
from . import api

urlpatterns = [
    path('upload-resume/',api.upload_resume,name='upload_resume'),
    path('<uuid:pk>/',api.resume_analysis,name='resume_analysis'),
    path('<uuid:pk>/is-exist/',api.does_resume_analysis_exist,name='does_resume_analysis_exist'),
    path('cover-letter-gen/',api.cover_letter_gen,name='cover_letter_gen'),
    path('job-matches/',api.job_matches_gen,name='job_matches_gen'),
    path('my-resumes/',api.get_all_resumes,name='my_resumes'),
    path('resumes/<uuid:resume_id>/', api.delete_resume, name='delete_resume'),
]
