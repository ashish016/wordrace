# Generated by Django 3.2.7 on 2021-09-08 05:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leaderboard', '0003_alter_scoreboard_times_played'),
    ]

    operations = [
        migrations.AddField(
            model_name='scoreboard',
            name='max_level',
            field=models.IntegerField(default=0),
        ),
    ]
