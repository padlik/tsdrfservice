# Create your views here.
from rest_framework import generics
from rest_framework import filters
from .models import Users
from .serializers import UserSerializer


class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = Users.objects.filter(dissmissed='N')
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, filters.DjangoFilterBackend,)
    filter_fields = ('team', 'location')
    search_fields = ('sugar_uname', 'intetics_uname')
    ordering_fields = ('sugar_uname', 'intetics_uname', 'location', 'team')
    ordering = ('sugar_uname')
