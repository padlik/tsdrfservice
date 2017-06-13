from rest_framework import serializers

from .models import Timesheets
from .models import Users


class TimesheetsSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='userid.sugar_uname')

    class Meta:
        model = Timesheets
        fields = ('key', 'activity_date', 'time_spent', 'name', 'source', 'description', 'created_by')


class UserSerializer(serializers.ModelSerializer):
    timesheets_sum = serializers.IntegerField(read_only=True)

    class Meta:
        model = Users
        fields = ('id', 'sugar_id', 'sugar_uname', 'intetics_uname', 'full_name', 'location', 'dissmissed', 'team',
                  'timesheets_sum')
