import os
import requests
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from useraccount.models import User
from google.oauth2.credentials import Credentials
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from rest_framework_simplejwt.tokens import RefreshToken
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([AllowAny])
def google_auth(request):
    try:
        logger.debug("Request data: %s", request.data)  # Log the request data
        
        id_token_str = request.data.get('id_token')
        if not id_token_str:
            raise ValueError("No id_token provided")
        
        # Verify ID token
        idinfo = id_token.verify_oauth2_token(
            id_token_str,
            google_requests.Request(),
            settings.GOOGLE_CLIENT_ID
        )
        
        email = idinfo['email']
        picture_url = idinfo.get('picture', '')
        user, created = User.objects.get_or_create(
            email=email,
            defaults={'name': idinfo.get('name', '')}
        )
        
        if picture_url:
            # Download the image from the URL
            response = requests.get(picture_url)
            if response.status_code == 200:
                # Create a unique filename
                filename = f"avatars/{user.id}.jpg"
                # Save the image to the media directory
                user.avatar.save(filename, ContentFile(response.content), save=True)
        
        refresh = RefreshToken.for_user(user)
        
        response_data = {
            'user_id': str(user.id),
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'profile_picture': user.avatar.url
        }

        logger.debug("Response data: %s", response_data)
        
        return Response(response_data)
        
    except Exception as e:
        logger.error("Error during Google authentication: %s", str(e))
        return Response({'error': str(e)}, status=400)