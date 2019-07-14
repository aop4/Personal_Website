# bootstrap code to get the app started in the GCP App Engine
from myproject.wsgi import application

# The App Engine will automatically run this file and seek an
# object called app. myproject.wsgi.application is a
# WSGI-compatible app instance
app = application
