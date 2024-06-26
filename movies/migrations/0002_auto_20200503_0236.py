# Generated by Django 3.0.5 on 2020-05-03 02:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='actor',
            options={'verbose_name': 'Актер', 'verbose_name_plural': 'Актеры'},
        ),
        migrations.AlterModelOptions(
            name='administrator',
            options={'ordering': ('username',), 'verbose_name': 'Администратор', 'verbose_name_plural': 'Администраторы'},
        ),
        migrations.AlterModelOptions(
            name='director',
            options={'verbose_name': 'Режиссер', 'verbose_name_plural': 'Режиссеры'},
        ),
        migrations.AlterField(
            model_name='actor',
            name='wikipedia',
            field=models.URLField(blank=True, max_length=500, verbose_name='Википедия'),
        ),
        migrations.AlterField(
            model_name='director',
            name='wikipedia',
            field=models.URLField(blank=True, max_length=500, verbose_name='Википедия'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='youtube',
            field=models.URLField(help_text='https://www.youtube.com/embed/', max_length=100, verbose_name='Youtube'),
        ),
    ]
