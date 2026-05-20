from django.urls import path
from . import views
from .views import BlogDetailView, blog_list_create

urlpatterns = [
    path("", views.home),

    path("create/", views.create_blog),
    path("blogs/", views.blog_list_create),

    # ✅ NEW SEARCH APIs
    path("search/semantic/", views.search_blog),
    path("search/keyword/", views.keyword_search),
    path("search/hybrid/", views.hybrid_search),
    path("blogs/<int:pk>/", BlogDetailView.as_view()),
]