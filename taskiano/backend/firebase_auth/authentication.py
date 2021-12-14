import os
from pathlib import Path

import firebase_admin
from api.models import Users
from django.core.exceptions import ObjectDoesNotExist
from firebase_admin import credentials
from firebase_admin.auth import (ExpiredIdTokenError, InvalidIdTokenError,
                                 RevokedIdTokenError, verify_id_token)
from rest_framework.authentication import (BaseAuthentication,
                                           get_authorization_header)
from taskiano.settings import env

from .exceptions import (AuthenticationFailedError, ExpiredIdTokenFBError,
                         InvalidAuthTokenFBError, NoAuthTokenError,
                         RevokedIdTokenFBError, UserAlreadyExistFBError,
                         UserDoesNotExistFBError)

BASE_DIR = Path(__file__).resolve().parent.parent

FIREBASE_KEY = os.path.join(BASE_DIR, env('FIREBASE_KEY_PATH'))

cred = credentials.Certificate(FIREBASE_KEY)
default_app = firebase_admin.initialize_app(cred)


class FirebaseAuthentication(BaseAuthentication):

    def __getToken(self, request: any) -> str:
        auth = get_authorization_header(request).split()

        if not auth:
            raise NoAuthTokenError()
        if len(auth) == 2:
            if auth[1]:
                auth = auth[1]
        else:
            auth = auth[0]

        try:
            decoded_token = verify_id_token(auth)
        except RevokedIdTokenError:
            raise RevokedIdTokenFBError()
        except ExpiredIdTokenError:
            raise ExpiredIdTokenFBError()
        except InvalidIdTokenError:
            raise InvalidAuthTokenFBError()
        except Exception:
            raise AuthenticationFailedError()

        return decoded_token

    def __isCreateRoute(self, request: any) -> bool:
        method = request.META.get('REQUEST_METHOD')
        route = request.META.get('PATH_INFO')

        return method == "POST" and route == "/users/"

    def __createUser(self, request: any):
        return Users.objects.create(
            id=request.data.get('id'),
            name=request.data.get('name'),
            avatar=request.data.get('avatar'),
            email=request.data.get('email'),
        )

    def authenticate(self, request):
        token = self.__getToken(request)

        if self.__isCreateRoute(request):
            try:
                Users.objects.get(id=request.data.get('id'))
                raise UserAlreadyExistFBError()
            except ObjectDoesNotExist:
                user = self.__createUser(request)

                Users.is_authenticated = True
                return (user, None)

        try:
            user = Users.objects.get(id=token.get('uid'))
        except Users.DoesNotExist:
            raise UserDoesNotExistFBError()

        Users.is_authenticated = True
        return (user, None)
