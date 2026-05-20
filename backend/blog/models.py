from django.db import models
from pgvector.django import VectorField
from .slm_service import generate_embedding_slm


class Blog(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()

    embedding = VectorField(dimensions=384, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        text = f"{self.title} {self.content}"
        self.embedding = generate_embedding_slm(text)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class AIInteraction(models.Model):
    prompt = models.TextField()
    input = models.TextField()
    output = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)