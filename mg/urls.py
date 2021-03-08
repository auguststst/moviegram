from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.i18n import i18n_patterns
from django.contrib.sitemaps.views import sitemap
from movies.sitemaps import MovieSitemap, StaticViewSitemap
from django.views.generic import TemplateView


sitemaps = {
	'movies': MovieSitemap,
	'static': StaticViewSitemap
}

urlpatterns = [
    path('i18n/',include('django.conf.urls.i18n')),
]


urlpatterns += i18n_patterns(
	path('efb7315e6f3341d2ef370185f1a44707/', admin.site.urls),
	path('sitemap.xml/', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
	path('robots.txt/', TemplateView.as_view(template_name="robots.txt", content_type='text/plain')),
	path('', include('movies.urls')),
	prefix_default_language=False
)

if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

