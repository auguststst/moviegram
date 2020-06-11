from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.i18n import i18n_patterns

urlpatterns = [
    path('i18n/',include('django.conf.urls.i18n')),
]


urlpatterns += i18n_patterns(
	path('03b81e0d332cf70c35050357747f59db/', admin.site.urls),
	path('', include('movies.urls')),
	prefix_default_language=False
)

if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

