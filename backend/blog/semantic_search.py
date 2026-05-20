from sentence_transformers import SentenceTransformer
from django.db import connection

model = SentenceTransformer("all-MiniLM-L6-v2")

def semantic_search(query):
    query_embedding = model.encode(query).tolist()

    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT id, title, content
            FROM blog_blog
            ORDER BY embedding <-> %s
            LIMIT 5;
        """, [query_embedding])

        results = cursor.fetchall()

    return results