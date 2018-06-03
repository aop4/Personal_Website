"""myproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from myproject.views import *

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', HomePage.as_view()),
    url(r'^es$', HomePage.as_view()),
    url(r'^projects$', ProjectsPage.as_view()),
    url(r'^projects/es$', ProjectsPage.as_view()),
    url(r'^photography$', PhotographyPage.as_view()),
    url(r'^photography/es$', PhotographyPage.as_view()),
    url(r'^on-the-web$', OnTheWebPage.as_view()),
    url(r'^on-the-web/es$', OnTheWebPage.as_view()),
    url(r'^about$', AboutPage.as_view()),
    url(r'^about/es$', AboutPage.as_view()),
    url(r'^typewriter$', TypewriterDemo.as_view()),
]
