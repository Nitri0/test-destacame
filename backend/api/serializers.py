from rest_framework import serializers
from . import models

class ChoferSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chofer
        fields = "__all__"

class BusSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Bus
        fields = "__all__"

    def create(self, validated_data):
        bus = models.Bus.objects.create(**validated_data)
        for i in range(validated_data.get("max_asientos")-1):
            models.Asiento.objects.create(numero_asiento=i+1,bus=bus)
        return bus


class AsientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Asiento
        fields = "__all__"

class TrayectoSerializer(serializers.ModelSerializer):
    promedio_pasajeros = serializers.CharField(read_only=True)
    cantidad_viajes = serializers.CharField(read_only=True)

    class Meta:
        model = models.Trayecto
        fields = "__all__"

    

class HorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Horario
        exclude= ("dia",)

class ViajeSerializer(serializers.ModelSerializer):
    puestos_disponibles = serializers.CharField(read_only=True)
    matricula = serializers.CharField(read_only=True)
    
    class Meta:
        model = models.Viaje
        fields = "__all__"

    def create(self, validated_data):
        bus = validated_data.get("bus")
        validated_data["puestos_disponibles"] = bus.max_asientos
        viaje = models.Viaje.objects.create(**validated_data)
        return viaje

class BoletaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Boleta
        fields = ("id", "nombre_comprador", "documento_identidad", "numero_factura", "viaje")

    def create(self, validated_data):
        viaje = validated_data.get("viaje")
        if viaje.puestos_disponibles > 0:
            viaje.puestos_disponibles -= 1
            viaje.save()
            boleta = models.Boleta(**validated_data)
            boleta.enumeracion_asiento = viaje.bus.max_asientos - viaje.puestos_disponibles
            boleta.save()
            return boleta
        return False
    

# class PublicacionSerializer(serializers.ModelSerializer):
#     puestos_disponibles = serializers.CharField(read_only=True)
#     class Meta:
#         model = models.Publicacion
#         fields = ("id", "nombre_publicacion", "viaje", "fecha", "horario", "puestos_disponibles")

#     def create(self, validated_data):
#         bus = models.Bus.objects.get(viaje=validated_data.get("viaje"))
#         validated_data["puestos_disponibles"] = bus.max_asientos
#         disponibilidad = models.Publicacion.objects.create(**validated_data)
#         return disponibilidad