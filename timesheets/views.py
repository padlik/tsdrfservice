# Create your views here.
import django_filters
from django.db.models import Sum
from django.views.generic import TemplateView
from rest_framework import filters
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Timesheets
from .models import Users
from .serializers import TimesheetsSerializer
from .serializers import UserSerializer


class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, filters.DjangoFilterBackend,)
    filter_fields = ('team', 'location')
    search_fields = ('sugar_uname', 'intetics_uname', 'full_name')
    ordering_fields = ('sugar_uname', 'intetics_uname', 'location', 'team', 'full_name')
    ordering = 'sugar_uname'

    def get_queryset(self):
        date_from = self.request.query_params.get('date_from', None)
        date_to = self.request.query_params.get('date_to', None)
        q = """
           SELECT  IFNULL(sum_t, 0) FROM 
          (SELECT userid, SUM(IFNULL(time_spent,0)) sum_t FROM
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
    ordering = 'activity_date'

    def get_queryset(self):
        user = self.kwargs.get('created_by', None)
        if user is not None:
            return Timesheets.objects.filter(userid__sugar_uname=user)
        return Timesheets.objects.all()


class OverallView(APIView):
    def get(self, request):
        result = {'users': Users.objects.all().count(),
                  'timesheets': Timesheets.objects.aggregate(Sum('time_spent')).get('time_spent__sum', 0), 'sources': {
                'sourceSI': Timesheets.objects.exclude(source__icontains='JIRA').aggregate(Sum('time_spent')).get(
                    'time_spent__sum', 0),
                'sourceJIRA': Timesheets.objects.filter(source__icontains='JIRA').aggregate(Sum('time_spent')).get(
                    'time_spent__sum', 0)}}
        return Response(result, status=status.HTTP_200_OK)


class IndexTemplateView(TemplateView):
    template_name = 'index.html'
