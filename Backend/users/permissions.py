from rest_framework.permissions import BasePermission

class IsUser(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role == "USER"
        )

class IsHost(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role == "HOST"
        )

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role == "ADMIN"
        )
    
class IsHostOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role in ["HOST", "ADMIN"]
        )
    
class IsApprovedHost(BasePermission):
    # Allow access to approved host or admin

    def has_permission(self, request, view):
        user = request.user

        if not user or not user.is_authenticated:
            return False
        
        # admin always allowed
        if user.role == 'ADMIN':
            return True
        
        # Approved Host allowed
        if user.role == 'HOST' and user.is_host_approved:
            return True

        return False
