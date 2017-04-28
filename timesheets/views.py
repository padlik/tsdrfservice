# Create your views here.
from rest_framework import generics
from rest_framework import filters
from .models import Users
from .models import Timesheets
from .serializers import UserSerializer
from .serializers import TimesheetsSerializer


class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = Users.objects.filter(dissmissed='N')
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, filters.DjangoFilterBackend,)
    filter_fields = ('team', 'location')
    search_fields = ('sugar_uname', 'intetics_uname')
    ordering_fields = ('sugar_uname', 'intetics_uname', 'location', 'team')
    ordering = ('sugar_uname')


class TimesheetsView(generics.ListAPIView):
    serializer_class = TimesheetsSerializer
    queryset = Timesheets.objects.all()
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, filters.DjangoFilterBackend,)
    filter_fields = ('source',)
    search_fields = ('name', 'description')
    ordering_fields = ('activity_date', 'name', 'source',)
    ordering = ('activity_date')

    def get_queryset(self):
        user = self.kwargs['created_by']
        return Timesheets.objects.filter(userid__sugar_uname=user)
