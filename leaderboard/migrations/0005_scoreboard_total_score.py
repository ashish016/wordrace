# Generated by Django 3.2.7 on 2021-09-08 06:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leaderboard', '0004_scoreboard_max_level'),
    ]

    operations = [
        migrations.AddField(
            model_name='scoreboard',
            name='total_score',
            field=models.IntegerField(default=0),
        ),
    ]
