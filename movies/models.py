from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone



class Category(models.Model):

	name = models.CharField("Категория", max_length=100)
	url  = models.SlugField(max_length=160, unique=True)
	
	def __str__(self):
		return self.name

	class Meta:
		verbose_name = "Категория"
		verbose_name_plural = "Категории"


class Genre(models.Model):

	name = models.CharField("Название", max_length=100)
	url  = models.SlugField(max_length=100, unique=True)

	def __str__(self):
		return self.name

	class Meta:
		verbose_name = "Жанр"
		verbose_name_plural = "Жанры"


class General(models.Model):
	
	name 	   = models.CharField("Имя", max_length=100, unique=True)
	wikipedia  = models.URLField("Википедия", max_length=500, blank=True, unique=True, null=True) 


	def __str__(self):
		return self.name

	class Meta:

		abstract = True


class Actor(General):


	class Meta:
		
		verbose_name = "Актер"
		verbose_name_plural = "Актеры"
		

class Director(General):

	
	class Meta:
		
		verbose_name = "Режиссер"
		verbose_name_plural = "Режиссеры"


class TelegramChannel(models.Model):

	link = models.URLField("Телеграм канал", max_length=100,)

	def __str__(self):
		return self.link

	class Meta:
		verbose_name = "Телеграм канал"
		verbose_name_plural = "Телеграм каналы"




class Movie(models.Model):
	
	

	title 			= models.CharField("Название", max_length=100, unique=True)
	short_title     	= models.CharField("Короткое название", max_length=100, blank=True, help_text='для фильмов которые делятся на части')
	poster 			= models.ImageField("Изображение", upload_to="movies/")
	description 		= models.TextField("Описание")
	year 			= models.PositiveSmallIntegerField("Год Выпуска", default=2020)
	
	country			= models.CharField("Страна", max_length=130)
	directors		= models.ManyToManyField(Director, verbose_name="режиссеры")
	actors			= models.ManyToManyField(Actor, verbose_name="актеры", blank=True)
	genres 			= models.ManyToManyField(Genre, verbose_name="жанры")
	world_premiere  	= models.DateField("Премьера", default=timezone.now)


	wall 			= models.BooleanField("Главная страница", default=False)
	telegram		= models.URLField("Telegram", max_length=100)
	online 			= models.URLField("Online", max_length=160, blank=True)
	wallpaper 		= models.ImageField("Обложка", upload_to="wallpapers/", blank=True)
	youtube			= models.URLField("Youtube", max_length=100,help_text='https://www.youtube.com/embed/')
	wikipedia       	= models.URLField("Wikipedia", max_length=100, blank=True)


	category 		= models.ForeignKey(
		Category, verbose_name="Категория", on_delete=models.SET_NULL, null=True
	)

	
	def __str__(self):
		return self.title


	def ShortenText(self):
		return self.description[:268]

	def MetaDescription(self):
		return self.description[:160]

	def get_absolute_url(self):
		return "%i/" % self.id



	class Meta:

		verbose_name = "Фильм"
		verbose_name_plural = "Фильмы"
