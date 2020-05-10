# Generated by Django 3.0.5 on 2020-05-07 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0009_auto_20200507_1732'),
    ]

    operations = [
        migrations.AlterField(
            model_name='actor',
            name='wikipedia',
            field=models.URLField(blank=True, max_length=500, unique=True, verbose_name='Википедия'),
        ),
        migrations.AlterField(
            model_name='director',
            name='wikipedia',
            field=models.URLField(blank=True, max_length=500, unique=True, verbose_name='Википедия'),
        ),
    ]
