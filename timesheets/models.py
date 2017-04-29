"""
Models auto-generated file with some changes 
"""

from django.db import models


class Users(models.Model):
    id = models.AutoField(primary_key=True)
    sugar_id = models.CharField(max_length=40, blank=True, null=True)
    sugar_uname = models.CharField(unique=True, max_length=45)
    intetics_uname = models.CharField(unique=True, max_length=45, blank=True, null=True)
    location = models.CharField(max_length=1, blank=True, null=True)
    dissmissed = models.CharField(max_length=1, blank=True, null=True)
    team = models.CharField(max_length=45, blank=True, null=True)

    def get_timesheets_count(self):
        return Timesheets.objects.filter(userid=self).count()


    class Meta:
        managed = False
        db_table = 'users'


class Timesheets(models.Model):
    key = models.AutoField(primary_key=True)
    userid = models.ForeignKey(Users, related_name='timesheets')
    userid.db_column='userid' # need to set this explicitly to avoid Django magic
    time_spent = models.FloatField()
    description = models.TextField(blank=True, null=True)
    activity_date = models.DateField()
    id = models.CharField(unique=True, max_length=60)
    created_by = models.CharField(max_length=60, blank=True, null=True)
    name = models.CharField(max_length=512, blank=True, null=True)
    source = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'timesheets'
