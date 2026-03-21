from django.urls import path,re_path, include
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView
from .views import LoginView
from .views import ProfileView
from .views import RegisterView
from .views import login_page
from .views import PendingHostrequestView,ApproveHostView
from .views import dashboard
from .views import create_Listing_page
from .views import my_listing_page

urlpatterns = [
     # path('api/', include('users.urls')),
     path("login/", login_page, name="login_page"),
     path("dashboard/", dashboard, name="dashboard"),
     path("create-listing/", create_Listing_page, name="create_listing"),
     path('register/', RegisterView.as_view(), name='home'),
     path('api-login/', LoginView.as_view(), name='login'),
     path("profile/", ProfileView.as_view(), name="profile"),
     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('api-register/', RegisterView.as_view()),
     path('admin/pending-hosts/', PendingHostrequestView.as_view()),
     path('admin/approve-host/<int:user_id>/', ApproveHostView.as_view()),
     path("my-listings/", my_listing_page, name="my_listings"),
     re_path(r'^.*$', views.index),
]