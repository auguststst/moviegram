# -*- coding: utf-8 -*-
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse
from .models import Movie, Genre, Category, TelegramChannel
from django.core.paginator import Paginator, EmptyPage, InvalidPage, PageNotAnInteger
from django.views.decorators.cache import cache_control
from django.db.models import Q
from django.core.validators import URLValidator
from django.template.loader import render_to_string
from django.utils import translation
import logging
import locale

if locale.getpreferredencoding().upper() != 'UTF-8':
	locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')


logging.basicConfig(filename="/home/august/mg/logfile", level=logging.INFO)

class PageUrl:

	i = None
	time = 3600

@cache_control(max_age=PageUrl.time)
def index(request):

	PageUrl.i = None
	
	template = 'index_fast.html'

	movies = Movie.objects.filter(wall=True,draft=False).order_by('-id').exclude(title=None)[:6]
	genres = Genre.objects.all().order_by('name')
	categories = Category.objects.all()



	asd = get_object_or_404(Movie,id=Movie.Random('1'))
	
	if request.method == "GET":
		text = request.GET.get('search_text')
		if text is not None and text != "":
			search_text = request.GET.get('search_text')
			results = Movie.objects.filter(Q(title__icontains=text) | Q(short_title__icontains=text)).order_by('-id').exclude(title=None)
		else:
			results = []
	
	



	

	if request.is_ajax():
	    html = render_to_string(template_name="search_ajax_fast.html", context={ "results": results })
	    return JsonResponse({ 'seconds':html }, status=200)

	context = {
                "asd":asd,
		"movies": movies,
		"genres": genres,
		'categories': categories,
	}
	
	return render(request, template, context)

@cache_control(max_age=PageUrl.time)
def detail(request, pk):
	
	template = 'movie_fast.html'

	movie = get_object_or_404(Movie,pk=pk)
	genres = Genre.objects.all().order_by('name')
	categories = Category.objects.all()
	movies = Movie.objects.filter(telegram__exact=movie.telegram)

	asd = get_object_or_404(Movie,id=Movie.Random('1'))
	context = {
		"asd": asd,
		"movie":movie,
		"genres": genres,
		'categories': categories,
		"movies": movies,
	}
	return render(request, template, context)

@cache_control(max_age=PageUrl.time)
def genremovies(request, slug):

	template = 'categorymov_fast.html'
	
	genre = get_object_or_404(Genre, url__exact=slug)
	
	pag=""
	
	if PageUrl.i is not None:
	    pag = get_object_or_404(Category, url__exact=PageUrl.i)
	
	if pag:
	    movie_list = genre.movie_set.all().order_by('-year').filter(category__exact=pag,draft=False).exclude(title=None)
	else:
	    movie_list = genre.movie_set.all().order_by('-year').exclude(title=None).filter(draft=False)



	genres = Genre.objects.all().order_by('name')
	categories = Category.objects.all()

	movies = movie_list
	asd = get_object_or_404(Movie,id=Movie.Random('1'))

	context = {
		"asd": asd,
		"genres": genres,
		"movies": movies,
		"categories": categories,
		"genre": genre,
	}

	return render(request, template, context)

@cache_control(max_age=PageUrl.time)
def categorymovies(request, cat):
   
   template = 'categorymov_fast.html'

   PageUrl.i = cat

   
   genres = Genre.objects.all().order_by('name')
   categories = Category.objects.all()
   category = get_object_or_404(Category, url__exact=cat)
   movies = category.movie_set.all().order_by('-world_premiere').exclude(title=None).filter(draft=False)
   paginator = Paginator(movies, 6)
   
   page = request.GET.get('page')
   try:
       movies = paginator.page(page)
   except PageNotAnInteger:
       movies = paginator.page(1)
   except EmptyPage:
   	   movies = paginator.page(paginator.num_pages)
   
   if request.is_ajax():
       html = render_to_string(template_name="film_fast.html", context={"movies": movies })
       return JsonResponse({'posts_html':html, 'has_next':movies.has_next()}, status=200)
   
   asd = get_object_or_404(Movie,id=Movie.Random('1'))

   context = {
	  "asd": asd,
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

@cache_control(max_age=PageUrl.time)
def telegram(request):
	
	template = 'telegram_fast.html'
	categories = Category.objects.all()
	movies = Movie.objects.all()
	asd = get_object_or_404(Movie,id=Movie.Random('1'))
	context = {
		'asd': asd,
		'movies': movies,
		'categories': categories,
	}

	return render(request, template, context)

@cache_control(max_age=PageUrl.time)
def email(request):

	template = 'email_fast.html'
	movies = Movie.objects.all()
	categories = Category.objects.all()
	asd = get_object_or_404(Movie,id=Movie.Random('1'))

	context = {
		'asd': asd,
		'categories': categories,
		'movies': movies,
	}
	
	return render(request, template, context)

@cache_control(max_age=PageUrl.time)
def donate(request):
	
	template = 'btc_fast.html'
	movies = Movie.objects.all()
	categories = Category.objects.all()
	asd = get_object_or_404(Movie,id=Movie.Random('1'))
	context = {
		'asd':asd,
		'movies':movies,
		'categories': categories,
	}

	return render(request, template, context)

@cache_control(max_age=PageUrl.time)
def search(request):

   template = "search_fast.html"
   
   movies = Movie.objects.all()
   categories = Category.objects.all()
   query = request.GET.get('q')

   asd = get_object_or_404(Movie,id=Movie.Random('1'))

   if query is not None and query != "":
   		query.encode("utf-8")
   		logging.info(query)

   results = Movie.objects.filter(Q(title__icontains=query) | 
                                                                      Q(year__icontains=query)  |
                                                                      Q(short_title__icontains=query)
                                                                       ).order_by('-imdb').exclude(title=None)


   context = {
		'asd':asd,
		'movies': movies,
		'results': results,
		'categories': categories,
   }
   
   return render(request, template, context)


def changelanguage(request, language_code):
   language_code = language_code
   translation.activate(language_code)
   request.session[translation.LANGUAGE_SESSION_KEY] = language_code
   return redirect('index')





