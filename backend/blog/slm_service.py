from sentence_transformers import SentenceTransformer

# global variable
_model = None


def get_model():
    global _model

    if _model is None:
        _model = SentenceTransformer(
            "sentence-transformers/all-MiniLM-L6-v2"
        )

    return _model


def generate_embedding_slm(text):

    model = get_model()

    embedding = model.encode(text).tolist()

    # lazy import → avoids circular import
    from .models import AIInteraction

    AIInteraction.objects.create(
        prompt="Generate embedding",
        input=text,
        output=embedding
    )

    return embedding