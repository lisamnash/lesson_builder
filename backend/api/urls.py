from django.urls import path
from .views import TopicsView, LessonPreviewView

urlpatterns = [
    path('topics/', TopicsView.as_view(), name='topics'),
    path('lessons/preview/', LessonPreviewView.as_view(), name='lesson-preview'),
] 