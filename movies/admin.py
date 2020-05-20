from django.contrib import admin

# Register your models here.
from django.utils.safestring import mark_safe
from .models import Category, Genre, Actor, Director, Movie, TelegramChannel



class MovieAdmin(admin.ModelAdmin):
	list_display = ("title","telegram","wall")
	list_display_links = ("telegram",)
	list_filter = ("category",)
	search_fields = ("title",)
	filter_horizontal = ('actors','directors',)
	list_editable = ("wall",)
	readonly_fields = ("get_image",)

	def get_image(self,obj):
		return mark_safe(f'<img src={obj.poster.url} width="200" height="300">')
	
	get_image.short_description = "Изображение"

class MovieActor(admin.ModelAdmin):
	list_display = ("id","name", "wikipedia")
	list_display_links = ("name",)
	search_fields = ("name", "wikipedia")


class MovieDirector(admin.ModelAdmin):
	list_display = ("id","name", "wikipedia")
	list_display_links = ("name",)
	search_fields = ("name", "wikipedia")

class MovieTelegram(admin.ModelAdmin):
	list_display = ("id", "link")



admin.site.register(Category)
admin.site.register(Genre)
admin.site.register(Actor, MovieActor)
admin.site.register(Director, MovieDirector)
admin.site.register(Movie, MovieAdmin)
admin.site.register(TelegramChannel, MovieTelegram)

admin.site.site_title = "It’s better to be a pirate than join the Navy — Steve Jobs"
admin.site.site_header = "It’s better to be a pirate than join the Navy — Steve Jobs"


