import os
import json

with open("/etc/config.json") as config_file:
	config = json.load(config_file)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))



SECRET_KEY = config["SECRET_KEY"]

DEBUG = False

ALLOWED_HOSTS = ['194.58.92.196','www.themoviegram.com', 'themoviegram.com']


INSTALLED_APPS = [
    'modeltranslation',
    'movies',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sites',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sitemaps',
]

SITE_ID=1

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.locale.LocaleMiddleware',
]


ROOT_URLCONF = 'mg.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR,'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'mg.wsgi.application'



DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': config["NAME"],
        'USER': config["USER"],
        'PASSWORD': config["PASSWORD"],
        'HOST': '',
        'PORT': '',
    }
}

SILENCED_SYSTEM_CHECKS = ['mysql.E001']



AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]



LANGUAGE_CODE = ('ru')

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


gettext = lambda s: s

LANGUAGES = (
    ('ru', gettext('Russian')),
    ('fr', gettext('French')),
    ('en', gettext('English')),
    ('de', gettext('German')),
    ('ar', gettext('Arabic')),
)

LOCALE_PATHS = (
	os.path.join(BASE_DIR, 'locale'),
)


STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static/')



MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

