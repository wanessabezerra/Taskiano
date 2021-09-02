from rest_framework import status
from rest_framework.exceptions import APIException


class NoAuthToken(APIException):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = 'No authentication token provided'
    default_code = 'no_auth_token'


class ExpiredIdTokenError(APIException):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = 'Authentication token expired'
    default_code = 'expiredid_token_error'


class RevokedIdTokenError(APIException):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = 'Authentication token revoked'
    default_code = 'revoked_id_token_error'


class InvalidAuthToken(APIException):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = 'Invalid authentication token provided'
    default_code = 'invalid_token'


class FirebaseError(APIException):
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    default_detail = 'The user provided with the auth token is not a valid Firebase user, it has no Firebase UID'
    default_code = 'no_firebase_uid'
