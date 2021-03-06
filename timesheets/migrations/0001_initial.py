# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-21 16:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Timesheets',
            fields=[
                ('key', models.AutoField(primary_key=True, serialize=False)),
                ('time_spent', models.FloatField()),
                ('description', models.TextField(blank=True, null=True)),
                ('activity_date', models.DateField()),
                ('id', models.CharField(max_length=60, unique=True)),
                ('created_by', models.CharField(blank=True, max_length=60, null=True)),
                ('name', models.CharField(blank=True, max_length=512, null=True)),
                ('source', models.CharField(blank=True, max_length=10, null=True)),
            ],
            options={
                'db_table': 'timesheets',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('sugar_id', models.CharField(blank=True, max_length=40, null=True)),
                ('sugar_uname', models.CharField(max_length=45, unique=True)),
                ('intetics_uname', models.CharField(blank=True, max_length=45, null=True, unique=True)),
                ('location', models.CharField(blank=True, max_length=1, null=True)),
                ('dissmissed', models.CharField(blank=True, max_length=1, null=True)),
                ('team', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'users',
                'managed': False,
            },
        ),
    ]
