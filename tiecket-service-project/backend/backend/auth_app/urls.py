from django.urls import path

from backend.auth_app.views import UserLoginView, UserCreateView, UserDetailsView, EditProfileView, \
    ChangeUserPasswordView, UserLogoutView

urlpatterns = (
    path('login/', UserLoginView.as_view(), name='login user'),
    path('register/', UserCreateView.as_view(), name='request user'),
    # path('logout/', UserLogoutView.as_view(), name='logout user'),
    # path('profile/<int:pk>/', UserDetailsView.as_view(), name='profile'),
    # path('profile/edit/<int:pk>/', EditProfileView.as_view(), name='edit profile'),
    # path('edit-password/', ChangeUserPasswordView.as_view(), name='change password'),
)


