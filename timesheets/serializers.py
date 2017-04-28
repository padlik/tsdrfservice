from .models import Users
from .models import Timesheets
from rest_framework import serializers


class TimesheetsSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='userid.sugar_uname')

    class Meta:
        model = Timesheets
        fields = ('activity_date',  'time_spent', 'name', 'source', 'description', 'created_by')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ('id', 'sugar_id', 'sugar_uname', 'intetics_uname', 'location', 'dissmissed', 'team', )
