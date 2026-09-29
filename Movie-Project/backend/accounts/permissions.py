from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsManagerOrReadOnly(BasePermission):
    """Allow public reads and restrict mutations to managers and staff."""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        user = request.user
        return bool(
            user
            and user.is_authenticated
            and (user.is_staff or user.is_superuser or hasattr(user, 'manager_profile'))
        )


class ManagerOrReviewCreatorPermission(IsManagerOrReadOnly):
    """Let signed-in users create reviews while reserving other writes for managers."""

    def has_permission(self, request, view):
        if request.method == 'POST' and request.user.is_authenticated:
            return True
        return super().has_permission(request, view)