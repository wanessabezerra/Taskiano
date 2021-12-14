import datetime

from rest_framework import status
from rest_framework.exceptions import APIException
from termcolor import colored


class APIAuthExceptionWithLog(APIException):
    status_code = status.HTTP_401_UNAUTHORIZED

    def __init__(self, *args, **kwargs):
        date = datetime.datetime.now().strftime("%d/%b/%Y %H:%M:%S")
        print(colored(f'[{date}]: {self.default_code}', 'red'))
        super().__init__(*args, **kwargs)


class NoAuthTokenError(APIAuthExceptionWithLog):
    default_detail = 'No authentication token provided'
    default_code = 'no_auth_token'


class AuthenticationFailedError(APIAuthExceptionWithLog):
    default_detail = 'Authentication failed'
    default_code = 'authentication_failed_error'


class ExpiredIdTokenFBError(APIAuthExceptionWithLog):
    default_detail = 'Authentication token expired'
    default_code = 'expired_id_token_error'


class RevokedIdTokenFBError(APIAuthExceptionWithLog):
    default_detail = 'Authentication token revoked'
    default_code = 'revoked_id_token_error'


class InvalidAuthTokenFBError(APIAuthExceptionWithLog):
    default_detail = 'Invalid authentication token provided'
    default_code = 'invalid_token'


class UserDoesNotExistFBError(APIAuthExceptionWithLog):
    default_detail = 'User Does Not Exist'
    default_code = 'user_does_not_exist'


class UserAlreadyExistFBError(APIAuthExceptionWithLog):
    default_detail = 'User Already Exist Error'
    default_code = 'user_already_exist_error'


class FirebaseErrorError(APIAuthExceptionWithLog):
    default_detail = 'The user provided with the auth token is not a valid Firebase user, it has no Firebase UID'
    default_code = 'no_firebase_uid'
