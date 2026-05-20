from pgvector.django import CosineDistance
from .slm_service import generate_embedding_slm


# -------------------------------
# AI Semantic Search (SLM)
# -------------------------------
def semantic_search_slm(query):

    from .models import Blog, AIInteraction

    query_embedding = generate_embedding_slm(query)

    results = Blog.objects.annotate(
        distance=CosineDistance("embedding", query_embedding)
    ).order_by("distance")[:5]

    output = [
        {
            "title": b.title,
            "content": b.content
        }
        for b in results
    ]

    AIInteraction.objects.create(
        prompt="Semantic search",
        input=query,
        output=output
    )

    return output


# -------------------------------
# PostgreSQL Keyword Search
# -------------------------------
def keyword_search(query):

    from .models import Blog

    results = Blog.objects.filter(
        content__icontains=query
    )[:5]

    return [
        {
            "title": b.title,
            "content": b.content
        }
        for b in results
    ]


# -------------------------------
# Hybrid Search (IMPORTANT ⭐)
# -------------------------------
def hybrid_search(query):

    semantic_results = semantic_search_slm(query)
    keyword_results = keyword_search(query)

    combined = semantic_results + keyword_results

    # remove duplicates
    unique = {item["title"]: item for item in combined}

    return list(unique.values())