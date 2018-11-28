from django.conf.urls import url
from .views import MyFileView

urlpatterns = [
    url(r'^upload/$', MyFileView.as_view(), name='file-upload'),
]
