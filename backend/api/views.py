from django.http import HttpResponse
from django.views.generic import TemplateView
from django.shortcuts import render
from rest_framework import generics, permissions
from . import models
from . import serializers


class Chofer(generics.ListCreateAPIView):
    queryset = models.Chofer.objects.all()
    serializer_class = serializers.ChoferSerializer

class ChoferDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chofer.objects.all()
    serializer_class = serializers.ChoferSerializer
    


class Bus(generics.ListCreateAPIView):
    queryset = models.Bus.objects.all()
    serializer_class = serializers.BusSerializer

class BusDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Bus.objects.all()
    serializer_class = serializers.BusSerializer



class Asiento(generics.ListAPIView):
    queryset = models.Asiento.objects.all()
    serializer_class = serializers.AsientoSerializer



class Viaje(generics.ListCreateAPIView):
    queryset = models.Viaje.objects.all()
    serializer_class = serializers.ViajeSerializer
    
    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        capacidad_vendida = int(self.request.query_params.get("capacidad_vendida", 0))
        cantidad_asientos = int(10 -  capacidad_vendida/10)
        viajes = models.Viaje.objects.filter(puestos_disponibles__lte = cantidad_asientos)
        for i in viajes:
            i.matricula = i.get_matricula()
            print(i.get_matricula())
        return  viajes

class ViajeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Viaje.objects.all()
    serializer_class = serializers.ViajeSerializer



class Trayecto(generics.ListCreateAPIView):
    queryset = models.Trayecto.objects.all()
    serializer_class = serializers.TrayectoSerializer

    def get_queryset(self):
        queryset = models.Trayecto.objects.all()

        viajes = models.Viaje.objects.all()
        promedio_trayectos = {}
        if len(viajes):
            for i in viajes:
                total_vendidos = 10 - i.puestos_disponibles
                cantidad_viajes = 1
                promedio = 10 - i.puestos_disponibles
                if promedio_trayectos.get(i.trayecto.id, False):
                    total_vendidos = 10 - i.puestos_disponibles + promedio_trayectos.get(i.trayecto.id, {}).get('total_vendidos',0)
                    cantidad_viajes = promedio_trayectos.get(i.trayecto.id,{}).get('cantidad_viajes',0) + 1
                    print( total_vendidos, cantidad_viajes)
                promedio_trayectos[i.trayecto.id] = {
                    "total_vendidos": total_vendidos,
                    "cantidad_viajes": cantidad_viajes,
                    "promedio" : total_vendidos/cantidad_viajes
                }
                print(promedio_trayectos)
            print(promedio_trayectos)
        for i in queryset:
            i.promedio_pasajeros = promedio_trayectos.get(i.id,{}).get("promedio", "Sin datos")
            i.cantidad_viajes = promedio_trayectos.get(i.id,{}).get("cantidad_viajes", "Sin datos")
        return queryset

class TrayectoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Trayecto.objects.all()
    serializer_class = serializers.TrayectoSerializer



class Horario(generics.ListCreateAPIView):
    queryset = models.Horario.objects.all()
    serializer_class = serializers.HorarioSerializer

class HorarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Horario.objects.all()
    serializer_class = serializers.HorarioSerializer



class Boleta(generics.ListCreateAPIView):
    queryset = models.Boleta.objects.all()
    serializer_class = serializers.BoletaSerializer

class BoletaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Boleta.objects.all()
    serializer_class = serializers.BoletaSerializer