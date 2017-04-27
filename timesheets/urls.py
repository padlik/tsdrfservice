# custom application URL
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^users/$', views.UserListView.as_view()),
]