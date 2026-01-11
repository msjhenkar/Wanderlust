from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsUser
from .permissions import IsHost
from .permissions import IsAdmin
from .permissions import IsHostOrAdmin
from .serializers import RegisterSerializer



User = get_user_model()


# Create your views here.
@csrf_exempt
def login_page(request):
    # print("HTML LOGIN PAGE HIT ")
    return render(request,"login.html")

def dashboard(request):
    return render(request, "dashboard.html")

def create_Listing_page(request):
    return render(request, "listings.html")

def my_listing_page(request):
    return render(request, "my_listings.html")

class RegisterView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"error":"Email and Password are required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if User.objects.filter(email=email).exists():
            return Response(
                {"error":"Email already exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = User.objects.create_user(email=email, password=password)

        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "User registered successfully",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            
        })

class LoginView(APIView):
    def post(self, request):
        # print("API LOGIN VIEW HIT ")
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "email": request.user.email,
            "role": request.user.role
        })
    

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated, IsUser]

    def get(self, request):
        return Response({"message":"Hello User"})
    
class PendingHostrequestView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self, request):
        if request.user.role != 'ADMIN':
            return Response(
                {'Error': "only Admins can view this"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        hosts = User.objects.filter(role='HOST', is_host_approved=False)

        data = [
            {
                "id":host.id,
                "email": host.email
                # "full_name": host.full_name,

            }
            for host in hosts
        ]

        return Response(data)
    
class HostDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsHostOrAdmin]

    def get(self, request):
        return Response({"message":"Welcome Host"})
    
class ApproveHostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        if request.user.role != 'ADMIN':
            return Response(
                {
                    'error': 'Only admin can appprove this'
                },
                status = status.HTTP_403_FORBIDDEN
            )
        
        try:
            host = User.objects.get(id=user_id,role='HOST')
            host.is_host_approved = True
            host.save()
            return Response({'message' : "Host approved succesfully"})
        
        except User.DoesNotExist:
            return Response(
                {"error": "Host not Found"},
                status=status.HTTP_404_NOT_FOUND
            )
    
    
class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        return Response({"message":"Admin Access Granted"})
    

class RegisterView(APIView):

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)