from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsApprovedHost
from rest_framework import status

from .serializers import ListingSerializer

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