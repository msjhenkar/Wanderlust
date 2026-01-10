from django.db import models
from users.models import User


# Create your models here.
class Listing(models.Model):
    host = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='listings'
    )

    title = models.CharField(max_length=200)
    description = models.TextField()

    price_per_night = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    location= models.CharField(max_length=255)

    is_available = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title