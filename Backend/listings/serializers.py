from rest_framework import serializers
from .models import Listing

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = [
            'id',
            'title',
            'description',
            'price_per_night',
            'location',
            'image',
            'rating',
            'is_available',
            'created_at'
        ]
        read_only_fields = ['id','created_at']