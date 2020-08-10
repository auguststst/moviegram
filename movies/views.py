# -*- coding: utf-8 -*-
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from .models import Movie, Genre, Category, TelegramChannel
from django.core.paginator import Paginator, EmptyPage, InvalidPage, PageNotAnInteger
from django.db.models import Q
from django.core.validators import URLValidator
from django.utils import translation
import logging
import locale;

if locale.getpreferredencoding().upper() != 'UTF-8':
	locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')


logging.basicConfig(filename="/home/august/mg/logfile", level=logging.INFO)

class PageUrl:

	i = None

def index(request):

	PageUrl.i = None
	
	template = 'index.html'

	movies = Movie.objects.filter(wall=True).order_by('-id').exclude(title=None)[:6]
	genres = Genre.objects.all().order_by('name')
	categories = Category.objects.all()

	context = {

		"movies": movies,
		"genres": genres,
		'categories': categories,
	}
	
	return render(request, template, context)


def detail(request, pk):
	
	template = 'movie.html'

	movie = get_object_or_404(Movie,pk=pk)
	genres = Genre.objects.all().order_by('name')
	categories = Category.objects.all()
	movies = Movie.objects.filter(telegram__exact=movie.telegram)
	
	context = {

		"movie":movie,
		"genres": genres,
		'categories': categories,
		"movies": movies,
	}
	return render(request, template, context)


def genremovies(request, slug):

	template = 'irc.html'
	
	genre = get_object_or_404(Genre, url__exact=slug)
	
	pag=""
	
	if PageUrl.i is not None:
	    pag = get_object_or_404(Category, url__exact=PageUrl.i)
	
	if pag:
	    movie_list = genre.movie_set.all().order_by('-year').filter(category__exact=pag).exclude(title=None)
	else:
	    movie_list = genre.movie_set.all().order_by('-year').exclude(title=None)

	


	paginator = Paginator(movie_list, 5)
	
	try:
		page = request.GET.get('page','1')
	except:
		page = 1
	
	try:
		movies = paginator.page(page)
	except(EmptyPage, InvalidPage):
		movies = paginator.page(paginator.num_pages)

	genres = Genre.objects.all().order_by('name')
	categories = Category.objects.all()

	context = {
		"page": page,
		"genres": genres,
		"movies": movies,
		"categories": categories,
		"genre": genre,
	}

	return render(request, template, context)


def categorymovies(request, cat):
   
   template = 'categorymov.html'

   PageUrl.i = cat

   
   genres = Genre.objects.all().order_by('name')
   categories = Category.objects.all()
   category = get_object_or_404(Category, url__exact=cat)
   movies = category.movie_set.all().order_by('-world_premiere').exclude(title=None)
   paginator = Paginator(movies, 6)
   
   page = request.GET.get('page')
   try:
       movies = paginator.page(page)
   except PageNotAnInteger:
       movies = paginator.page(1)
   except EmptyPage:
   	   movies = paginator.page(paginator.num_pages)
   
   
   context = {
	  "page": page,
          "genres": genres,
   	  "categories": categories,
   	  "movies": movies,
   	  "category": category,
   }
   
   return render(request, template, context)


def addChannel(request):
	
	if request.method == "POST":
		check = is_valid_url(request.POST.get('telegramchannel'))

		if (request.POST.get('telegramchannel') and check == True):
			
			channel = TelegramChannel()
			channel.link = request.POST.get('telegramchannel')
			channel.save()
			return redirect('index')
		
		elif check == False:
			
			return redirect('telegram')
			


def is_valid_url(url):

    validate = URLValidator()
    try:
        validate(url)
        return True
    except:
        return False 


def telegram(request):
	
	template = 'telegram.html'
	categories = Category.objects.all()

	context = {
		'categories': categories,
	}

	return render(request, template, context)


def email(request):

	template = 'email.html'

	categories = Category.objects.all()
	context = {
		'categories': categories,
	}
	
	return render(request, template, context)

def donate(request):
	
	template = 'btc.html'

	categories = Category.objects.all()
	context = {
		'categories': categories,
	}

	return render(request, template, context)


def search(request):

   template = "search.html"
   
   movies = Movie.objects.all()
   categories = Category.objects.all()
   query = request.GET.get('q')
   if query is not None:
   		results = Movie.objects.filter(Q(title__icontains=query) | 
   								      Q(year__icontains=query)  |
   								      Q(short_title__icontains=query)
   								       ).order_by('-imdb').exclude(title=None)
   		
   	
   		query.encode("utf-8")
   		logging.info(query)

   context = {
		'movies': movies,
		'results': results,
		'categories': categories,
   }
   
   return render(request, "search.html", context)


def changelanguage(request, language_code):
   language_code = language_code
   translation.activate(language_code)
   request.session[translation.LANGUAGE_SESSION_KEY] = language_code
   return redirect('index')





