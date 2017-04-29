# Create your views here.
import django_filters
from rest_framework import filters
from rest_framework import generics

from .models import Timesheets
from .models import Users
from .serializers import TimesheetsSerializer
from .serializers import UserSerializer


class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = Users.objects.filter(dissmissed='N')
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, filters.DjangoFilterBackend,)
    filter_fields = ('team', 'location')
    search_fields = ('sugar_uname', 'intetics_uname')
    ordering_fields = ('sugar_uname', 'intetics_uname', 'location', 'team')
    ordering = ('sugar_uname')


class TimesheetsFilter(django_filters.FilterSet):
    date_from = django_filters.DateFilter(name="activity_date", lookup_expr='gte')
    date_to = django_filters.DateFilter(name="activity_date", lookup_expr='lte')

    class Meta:
        model = Timesheets
        fields = ['date_from', 'date_to']


class TimesheetsView(generics.ListAPIView):
    serializer_class = TimesheetsSerializer
    queryset = Timesheets.objects.all()
    filter_class = TimesheetsFilter
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, filters.DjangoFilterBackend,)
    filter_fields = ('source',)
    search_fields = ('name', 'description')
    ordering_fields = ('activity_date', 'name', 'source',)
    ordering = ('activity_date')

    def get_queryset(self):
        user = self.kwargs['created_by']
        return Timesheets.objects.filter(userid__sugar_uname=user)
