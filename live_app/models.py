from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime

#____________________USER and PROFILES________________________
class User(AbstractUser):
    user_image = models.ImageField(upload_to="users/profile_pic", default='users/profile_pic/default.png')
    date_joined = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return f"{self.username}"
    
    def serialize(self):
        return {
            "id" : self.id,
            "username" : self.username,
            "user_image" : self.user_image.url,
        }

class Playlist(models.Model):
    PLAY_STATE_CHOICES = [('RUNNING', 'Running'), ('NEXT', 'Next')]

    name = models.CharField(max_length=500)
    duration = models.CharField(max_length=100)
    play_state = models.CharField(max_length=7, choices=PLAY_STATE_CHOICES, default='RUNNING')
    votes = models.IntegerField()

class Musics(models.Model):
    name = models.CharField(max_length=500)
    file = models.FileField(blank=False)
    playlist = models.ManyToManyField(Playlist,blank=False)

class YoutubeLive(models.Model):
    video_id = models.CharField(max_length=1000)
    domain = models.CharField(max_length=500)

