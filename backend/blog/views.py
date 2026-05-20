from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

from rest_framework.decorators import api_view
from rest_framework.response import Response

from pgvector.django import CosineDistance
from .utils import generate_embedding

from .models import Blog
from .serializers import BlogSerializer
from .ai import generate_embedding
from rest_framework.generics import RetrieveAPIView
from .models import Blog
from .serializers import BlogSerializer

class BlogDetailView(RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    
@api_view(["GET", "POST"])
def blog_list_create(request):
    if request.method == "GET":
        blogs = Blog.objects.all()
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = BlogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
# =====================================
# HOME CHECK
# =====================================
def home(request):
    return HttpResponse("Backend is running 🚀")


# =====================================
# CREATE BLOG
# Embedding auto-generated via SIGNAL
# =====================================
@csrf_exempt
def create_blog(request):

    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    title = data.get("title")
    content = data.get("content")

    if not title or not content:
        return JsonResponse({"error": "title and content required"}, status=400)

    try:
        embedding = generate_embedding(content)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

    blog = Blog.objects.create(
        title=title,
        content=content,
        embedding=embedding
    )

    return JsonResponse({
        "message": "Blog created successfully",
        "id": blog.id
    })

# =====================================
# GET ALL BLOGS (PostgreSQL Only)
# =====================================


@csrf_exempt
def get_blogs(request):

    if request.method != "GET":
        return JsonResponse({"error": "GET required"}, status=405)

    blogs = Blog.objects.all().order_by("-created_at")
    serializer = BlogSerializer(blogs, many=True)

    return JsonResponse(serializer.data, safe=False)

# =====================================
# SEMANTIC SEARCH (SLM + pgvector)
# =====================================

def semantic_search_logic(query):

    query_embedding = generate_embedding(query)

    blogs = (
        Blog.objects.annotate(
            distance=CosineDistance("embedding", query_embedding)
        )
        .filter(distance__lt=0.5)   #  similarity threshold
        .order_by("distance")[:5]
    )

    return BlogSerializer(blogs, many=True).data

@api_view(['GET', 'POST'])
def search_blog(request):

    # GET request
    if request.method == "GET":
        query = request.GET.get("query")

    # POST request (JSON body)
    else:
        query = request.data.get("query")

    if not query:
        return Response({"error": "Query missing"}, status=400)

    results = semantic_search_logic(query)

    return Response({
        "type": "SLM Semantic Search",
        "query": query,
        "results": results
    })

# =====================================
# POSTGRESQL KEYWORD SEARCH
# =====================================
@api_view(['POST'])
def keyword_search(request):

    query = request.data.get("query")

    if not query:
        return Response({"error": "Query missing"}, status=400)

    blogs = Blog.objects.filter(
        content__icontains=query
    )

    serializer = BlogSerializer(blogs, many=True)

    return Response({
        "type": "PostgreSQL Keyword Search",
        "results": serializer.data
    })


# =====================================
# HYBRID SEARCH (AI + DB)
# =====================================
@api_view(['POST'])
def hybrid_search(request):

    query = request.data.get("query")

    if not query:
        return Response({"error": "Query missing"}, status=400)

    semantic_results = semantic_search_logic(query)

    keyword_blogs = Blog.objects.filter(
        content__icontains=query
    )

    keyword_results = BlogSerializer(
        keyword_blogs, many=True
    ).data

    return Response({
        "query": query,
        "semantic_results": semantic_results,
        "keyword_results": keyword_results
    })