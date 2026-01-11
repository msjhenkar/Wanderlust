from django.urls import path
from .views import CreateListingView
from .views import MyListingView

urlpatterns = [
    path('create/', CreateListingView.as_view()),
    path('my/', MyListingView.as_view())
]
