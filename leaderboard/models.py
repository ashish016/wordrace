from django.db import models


# Create your models here.


class Scoreboard(models.Model):
    name = models.TextField()
    email = models.EmailField()
    score = models.IntegerField()
    difficulty = models.TextField()
    max_level = models.IntegerField(default=0)
    times_played = models.IntegerField(default=1)
    total_score = models.IntegerField(default=0)
