from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('play_song/<str:song>', views.play_song, name='play_song'),
]