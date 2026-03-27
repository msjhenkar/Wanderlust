from django.shortcuts import render
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsApprovedHost
from rest_framework import status
from .serializers import ListingSerializer
from .models import Listing
from rest_framework.permissions import AllowAny

# Create your views here.
class CreateListingView(APIView):
    permission_classes = [IsAuthenticated, IsApprovedHost]

    def post(self,request):
        serializer = ListingSerializer(data=request.data)

        if serializer.is_valid():
            listing = serializer.save(host=request.user)

            return Response(
                ListingSerializer(listing).data,
                status=status.HTTP_201_CREATED
                )
    
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
class MyListingView(APIView):
    permission_classes = [IsAuthenticated,IsApprovedHost]

    def get(self, request):
        listings = Listing.objects.filter(host = request.user)
        serializer = ListingSerializer(listings, many = True)
        return Response(serializer.data)

class FeaturedListingPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 20

class FeaturedListingsView(generics.ListAPIView):
    """
    Returns top-rated featured listings.
    Supports pagination and optimizes query by selecting host.
    """
    serializer_class = ListingSerializer
    pagination_class = FeaturedListingPagination
    # You can add AllowAny here if the homepage should be public
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        # Optimized query: select_related('host') and sort by rating descending
        return Listing.objects.select_related('host').filter(is_available=True).order_by('-rating')
