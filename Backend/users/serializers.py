from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only =True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        user = authenticate(email=email, password = password)

        if not user:
            raise serializers.ValidationError("Invalid Credentials")
        
        refresh = RefreshToken.for_user(user)

        return {
            "user_id": user.id,
            "email": user.email,
            "access": str(refresh.access_token),
            "refresh": str(refresh),            
        }
    

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)

    class Meta:
        model = User
        fields = ['email', 'password', 'role','full_name', 'phone_number']

    def validate_role(self, value):
        if value == 'ADMIN':
            raise serializers.ValidationError("Admin cannot be created via API")
        return value
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        role = validated_data.get('role','USER')

        user = User.objects.create_user(
            password=password,
            **validated_data
        )

        # host needs admin approval
        if role == 'HOST':
            user.is_host_approved = False
            user.save()

            
        return user


# class  RegisterSerializer(serializers.ModelSerialzer):
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = ['email','password','full_name']

#     def validate_email(self, value):
#         if User.objects.filter(email =value).exists():
#             raise serializers.ValidationError("emial already exists")
#         return value
#     def create(self, validated_data):
#         return User.objects.create_user(**validated_data)