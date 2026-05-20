from sentence_transformers import SentenceTransformer
from blog.models import AIInteraction

model = SentenceTransformer("all-MiniLM-L6-v2")

PROMPT = "Generate semantic embedding for blog understanding"

def generate_embedding(text):

    embedding = model.encode(text).tolist()

    AIInteraction.objects.create(
        prompt=PROMPT,
        input=text,
        output="Embedding generated"
    )

    return embedding