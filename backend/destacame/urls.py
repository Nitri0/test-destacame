"""destacame URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
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
from django.conf.urls import include
from api import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^chofer/(?P<pk>[0-9]+)/$', views.ChoferDetail.as_view()),
    url(r'^chofer/', views.Chofer.as_view()),
    url(r'^bus/(?P<pk>[0-9]+)/$', views.BusDetail.as_view()),
    url(r'^bus/', views.Bus.as_view()),
    url(r'^boleta/(?P<pk>[0-9]+)/$', views.BoletaDetail.as_view()),
    url(r'^boleta/', views.Boleta.as_view()),
    url(r'^asiento/', views.Asiento.as_view()),
    url(r'^trayecto/(?P<pk>[0-9]+)/$', views.TrayectoDetail.as_view()),
    url(r'^trayecto/', views.Trayecto.as_view()),
    url(r'^horario/(?P<pk>[0-9]+)/$', views.HorarioDetail.as_view()),
    url(r'^horario/', views.Horario.as_view()),
    url(r'^viaje/(?P<pk>[0-9]+)/$', views.Viaje.as_view()),
    url(r'^viaje/', views.Viaje.as_view()),
    url(r'^api-auth/', include('rest_framework.urls'))
]