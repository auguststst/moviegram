# Generated by Django 3.0.5 on 2020-05-08 09:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0014_auto_20200508_0810'),
    ]

    operations = [
        migrations.AlterField(
            model_name='actor',
            name='wikipedia',
            field=models.URLField(blank=True, max_length=500, null=True, unique=True, verbose_name='Википедия'),
        ),
        migrations.AlterField(
            model_name='director',
            name='wikipedia',
            field=models.URLField(blank=True, max_length=500, null=True, unique=True, verbose_name='Википедия'),
        ),
    ]
