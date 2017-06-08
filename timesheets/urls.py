# custom application URL
from django.conf.urls import url

from . import views

urlpatterns = [url(r'^users/$', views.UserListView.as_view()), url(r'^overall/$', views.OverallView.as_view()),
    url(r'^users/(?P<created_by>.+)/$', views.TimesheetsView.as_view())]
