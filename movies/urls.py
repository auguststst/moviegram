from django.urls import path
from movies import views



#app_name = 'movie'

urlpatterns = [

	path('', views.index, name='index'),
	path('language/<str:language_code>/', views.changelanguage, name='activate_language'),
	path('<int:pk>/', views.detail, name='detail'),
	path('genremovies/<str:slug>/', views.genremovies, name='genremovies'),
	path('categorymovies/<str:cat>/',views.categorymovies, name='categorymovies'),
	path('search/', views.search, name='search'),
	path('telegram/', views.telegram, name='telegram'),
        path('telegram/addlink', views.addChannel, name='addtelegram'),
        path('contact/', views.email, name='email'),
        path('donate/', views.donate, name='donate'),

]

