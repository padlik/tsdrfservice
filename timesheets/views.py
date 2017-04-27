# Create your views here.
from rest_framework import generics
from rest_framework import filters
from .models import Users
from .serializers import UserSerializer


class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = Users.objects.all()
    filter_backends = (filters.SearchFilter,)
    search_fields = ('sugar_uname', 'intetics_uname')
