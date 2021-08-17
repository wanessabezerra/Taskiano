import os
from pathlib import Path

from task.models import Users

from rest_framework import authentication
from rest_framework import exceptions

import firebase_admin
from firebase_admin import credentials, auth

from .exceptions import InvalidAuthToken

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
FIREBASE_KEY = os.path.join(
    BASE_DIR, 'taskiano-todo-firebase-adminsdk-u16j8-6aa874af1e.json')

cred = credentials.Certificate(FIREBASE_KEY)
default_app = firebase_admin.initialize_app(cred)


class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        method = request.META.get('REQUEST_METHOD')
        route = request.META.get('PATH_INFO')

        if auth_header:
            if (' ' in auth_header):
                auth_header = auth_header.split(' ')[1]

        if method == "POST" and route == "/users/":
            try:
                user = Users.objects.get(id=request.data.get('id'))
                return ((), None)
            except Users.DoesNotExist:
                user = Users.objects.create(
                    id=request.data.get('id'),
                    name=request.data.get('name'),
                    avatar=request.data.get('avatar'),
                    email=request.data.get('email'),
                )
                
                Users.is_authenticated = True
                return (user, None)

        try:
            decoded_token = auth.verify_id_token(auth_header)
        except:
            raise InvalidAuthToken

        if not auth_header or not decoded_token:
            raise InvalidAuthToken

        uid = decoded_token.get('uid')

        try:
            user = Users.objects.get(id=uid)
        except Users.DoesNotExist:
            raise exceptions.AuthenticationFailed('The user does not exist')

        Users.is_authenticated = True
        return (user, auth_header)
