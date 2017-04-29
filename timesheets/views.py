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
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, filters.DjangoFilterBackend,)
    filter_fields = ('team', 'location')
    search_fields = ('sugar_uname', 'intetics_uname')
    ordering_fields = ('sugar_uname', 'intetics_uname', 'location', 'team')
    ordering = ('sugar_uname')

    def get_queryset(self):
        date_from = self.request.query_params.get('date_from', None)
        date_to = self.request.query_params.get('date_to', None)
        q = """
           SELECT  sum_t FROM 
          (SELECT userid, SUM(time_spent) sum_t FROM
           timesheets JOIN users ON users.id = timesheets.userid
           
        """
        if date_from is not None:
            q = q + " WHERE timesheets.activity_date >= '{}' ".format(date_from)
        if date_to is not None:
            if q.find("WHERE") != -1:
                q = q + " AND "
            else:
                q = q + "WHERE "
            q = q + " timesheets.activity_date <= '{}' ".format(date_to)
        q = q + ' GROUP BY timesheets.userid ) AS ts_sum '
        q = q + ' WHERE users.id = ts_sum.userid'
        users = Users.objects.filter(dissmissed='N').extra(select={"timesheets_sum": q})
        return users


class TimesheetsFilter(django_filters.FilterSet):
    date_from = django_filters.DateFilter(name="activity_date", lookup_expr='gte')
    date_to = django_filters.DateFilter(name="activity_date", lookup_expr='lte')

    class Meta:
        model = Timesheets
        fields = ['date_from', 'date_to']


class TimesheetsView(generics.ListAPIView):
    serializer_class = TimesheetsSerializer
    filter_class = TimesheetsFilter
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, filters.DjangoFilterBackend,)
    filter_fields = ('source',)
    search_fields = ('name', 'description')
    ordering_fields = ('activity_date', 'name', 'source',)
    ordering = ('activity_date')

    def get_queryset(self):
        user = self.kwargs.get('created_by', None)
        if user is not None:
            return Timesheets.objects.filter(userid__sugar_uname=user)
        return Timesheets.objects.all()
