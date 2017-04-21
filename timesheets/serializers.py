from .models import Users
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'sugar_id', 'sugar_uname', 'intetics_uname', 'location', 'dissmissed', 'team')
