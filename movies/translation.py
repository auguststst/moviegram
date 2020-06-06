from modeltranslation.translator import register, TranslationOptions
from .models import Category, Actor, Director, Movie, Genre, TelegramChannel

@register(Category)
class CategoryTranslationOptions(TranslationOptions):
	fields = ('name',)

@register(Genre)
class GenreTranslationOptions(TranslationOptions):
	fields = ('name',)

@register(Actor)
class ActorTranslationOptions(TranslationOptions):
	fields = ('name','wikipedia')

@register(Director)
class DirectorTranslationOptions(TranslationOptions):
	fields = ('name','wikipedia')

@register(Movie)
class MovieTranslationOptions(TranslationOptions):
	fields = ('title','short_title','poster','wall','description','country', 'world_premiere', 'telegram', 'youtube', 'wikipedia')

