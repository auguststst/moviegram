from django.contrib.sitemaps import Sitemap
from django.urls import reverse

from .models import Movie

class MovieSitemap(Sitemap):
	
	changefreq = "weekly"
	priority = 0.5
	i18n=True
	protocol="https"

	def items(self):
		return Movie.objects.all().order_by('-id')


class StaticViewSitemap(Sitemap):

	def items(self):
		return ['telegram','email','donate','index']

	def location(self, item):
		return reverse(item)
