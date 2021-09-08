from django.shortcuts import render
from .models import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


# Create your views here.
class ApplicationUser(APIView):
    def post(self, request):
        try:

            name = request.data['name']
            email = request.data['email']
            score = request.data['score']
            difficulty = request.data['difficulty']
            max_level = request.data['max_level']
            try:
                does_exists = Scoreboard.objects.get(email=email, difficulty=difficulty)
                if does_exists:
                    if max_level > does_exists.max_level:
                        does_exists.max_level = max_level
                    does_exists.times_played = does_exists.times_played + 1
                    does_exists.total_score = does_exists.total_score + score
                    if score > does_exists.score:
                        does_exists.score = score
                    does_exists.save(force_update=True)
            except:
                scoreboard = Scoreboard(email=email, name=name, score=score, difficulty=difficulty, max_level=max_level,
                                        total_score=score)
                scoreboard.save()
            return Response({
                "status": "Success"
            })
        except Exception as e:
            return Response({

                "Failed": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)


class ScoreBoard(APIView):
    def get(self, request, *args, **kwargs):
        try:
            difficulty = kwargs['level']
            res = Scoreboard.objects.filter(difficulty=difficulty).order_by(
                '-score').values(
                "name", "score", "difficulty", "max_level", "total_score", "times_played")
            if len(res) > 10:
                res = res[0:10:1]
            return Response({
                "status": "success",
                "data": res
            })
        except Exception as e:
            return Response({
                "Failed": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
