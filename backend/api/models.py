from django.db import models

class Chofer(models.Model):
    nombre_completo = models.TextField()
    documento_identidad = models.TextField()

    def __unicode__(self):
        return self.nombre_completo

class Bus(models.Model):
    matricula = models.TextField()
    max_asientos = models.IntegerField()
    chofer = models.ForeignKey(Chofer, on_delete=models.CASCADE)

    def __unicode__(self):
        return self.matricula

class Asiento(models.Model):
    numero_asiento = models.TextField()
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)

    def __unicode__(self):
        return self.numero_asiento

class Trayecto(models.Model):
    nombre_trayecto = models.TextField()
    origen = models.TextField()
    destino = models.TextField()

    def __unicode__(self):
        return self.nombre_trayecto

class Horario(models.Model):
    nombre_horario = models.TextField()
    hora_salida = models.TextField()
    hora_llegada = models.TextField()
    dia = models.TextField()

    def __unicode__(self):
        return self.nombre_horario


class Viaje(models.Model):
    nombre_viaje = models.TextField()
    trayecto = models.ForeignKey(Trayecto, on_delete=models.CASCADE)
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    fecha = models.DateField()
    horario = models.ForeignKey(Horario, on_delete=models.CASCADE)
    puestos_disponibles = models.IntegerField()
    
    def __unicode__(self):
        return self.nombre_viaje

    def get_matricula(self):
        return self.bus.matricula
    

class Boleta(models.Model):
    nombre_comprador = models.TextField()
    documento_identidad = models.TextField()
    numero_factura = models.TextField()
    viaje = models.ForeignKey(Viaje, on_delete=models.CASCADE)
    numero_asiento = models.TextField()

    def __unicode__(self):
        return self.nombre_comprador