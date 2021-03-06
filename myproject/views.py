from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render
from django.template.loader import render_to_string
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from django.conf import settings

def get_language(request):
	if request.get_full_path().endswith("/es"):
		return "Spanish"
	else:
		return "English"

class HomePage(View):
	def get(self, request):
		context = {}
		context["language"] = get_language(request)
		context["active_navbar_item"] = "home"
		return render(request, 'index.html', context)

class ProjectsPage(View):
	def get(self, request):
		context = {}
		context["language"] = get_language(request)
		context["active_navbar_item"] = "projects"
		return render(request, 'projects.html', context)

class PhotographyPage(View):
	def get(self, request):
		context = {}
		context["active_navbar_item"] = "photography"
		context["language"] = get_language(request)
		return render(request, 'photography.html', context)

class OnTheWebPage(View):
	def get(self, request):
		context = {}
		context["language"] = get_language(request)
		context["active_navbar_item"] = "web"
		return render(request, 'web.html', context)

class AboutPage(View):
	def get(self, request):
		context = {}
		context["language"] = get_language(request)
		context["active_navbar_item"] = "about"
		return render(request, 'site.html', context)

class MusicPage(View):
	def get(self, request):
		context = {
			'songs': [
				{'title':'Blemish', 'lyrics':'' },
				{'title':'Tuning', 'lyrics':'' },
				{'title':'The Why Did I Decide to Play Blues at 1 AM Blues', 'lyrics':'' },
				{'title':'Outro', 'lyrics':'' },
				{'title':'Dear Someday', 'lyrics': render_to_string('dear-someday.html') },
				{'title': "Philosopher's Song", 'lyrics': render_to_string('philosophers-song.html')}
			]
		}
		for index, song in enumerate(context['songs']):
			song['id'] = index
		return render(request, 'music.html', context)

class TypewriterDemo(View):
	def get(self, request):
		return render(request, 'typewriter-demo.html')

class BlogPost(View):
	def get(self, request):
		return render(request, 'blogpost.html')
