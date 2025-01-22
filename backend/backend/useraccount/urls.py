from django.urls import path

from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from rest_framework_simplejwt.views import TokenVerifyView
from . import api
from .views import google_auth

urlpatterns = [
    path('register/', RegisterView.as_view(), name='rest_register'),
    path('login/', LoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
    path('<uuid:pk>/',api.user_details,name='user_details'),
    path('update_avatar/',api.update_avatar,name='update_avatar'),
    path('update_user_details/',api.update_user_details,name='update_user_details'),
    path('google/', google_auth, name='google_auth'),
]