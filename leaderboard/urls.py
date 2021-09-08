from django.contrib import admin
from django.urls import path
from leaderboard.views import ApplicationUser, ScoreBoard

urlpatterns = [
    path('', ApplicationUser.as_view()),
    path('difficulty/<str:level>', ScoreBoard.as_view())
]
