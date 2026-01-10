from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.contrib.auth.base_user import BaseUserManager

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self,email, password = None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        
        email = self.normalize_email(email)
        extra_fields.setdefault('role', 'USER')

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using = self._db)
        return user
    
    def create_superuser(self,email,password=None, **extra_fields):
        extra_fields.setdefault('role', 'ADMIN')
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        return self.create_user(email,password,**extra_fields)
    

class User(AbstractBaseUser,PermissionsMixin):
    ROLE_CHOICES = (
        ("USER","user"),
        ("HOST","host"),
        ("ADMIN","admin"),
    )

    email = models.EmailField(unique=True)
    # full_name = models.CharField(max_length=100)
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="USER")

    is_host_approved = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)


    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()
    
    USERNAME_FIELD ="email"
    
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email