from django.urls import path
from .views import CreateListingView
from .views import MyListingView, FeaturedListingsView

urlpatterns = [
    path('create/', CreateListingView.as_view()),
    path('my/', MyListingView.as_view()),
    path('featured/', FeaturedListingsView.as_view(), name='featured-listings'),
]
  