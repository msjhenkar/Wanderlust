from django.urls import path
from .views import CreateListingView

urlpatterns = [
    path('create/', CreateListingView.as_view())
]
