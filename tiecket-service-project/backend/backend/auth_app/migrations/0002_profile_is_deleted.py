# Generated by Django 3.2.14 on 2022-08-08 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='is_deleted',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
