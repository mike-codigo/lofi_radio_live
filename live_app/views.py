from django.shortcuts import render
from django.http import HttpResponse
import os
from django.templatetags.static import static
from django.contrib.auth import authenticate, login
import pygame

# AUTHENTICAÇÃO
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return render(request, 'index.html')
        else:
            return render(request, 'index.html', 
                {'message': 'Bad username or password'}
            )
    else:
        return render(request, 'index.html')
    return

# INDEX
def index(request):
    path_lofis = "C:/Users/lilod/Desktop/Site lofi Python/site/app_lofi/live_app/static/musics/"
    lofi_list = sorted(os.listdir(path_lofis))

    video_id = "jfKfPfyJRdk"
    domain = "7488-2804-14c-b387-23f5-cc3f-fc58-6e58-1015.sa.ngrok.io"

    return render(request, "index.html",{
        "lofi_list" : lofi_list,
        "video_id" : video_id,
        "domain" : domain,
        })

def play_song(request, song):
    song_path = f"C:/Users/lilod/Desktop/Site lofi Python/site/app_lofi/live_app/static/musics/{song}"
    os.startfile(song_path)
    
    return HttpResponse(status=204)