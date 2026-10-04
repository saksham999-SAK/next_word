import os
import pickle
import numpy as np
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences

app = FastAPI(
    title="NextWord AI Backend",
    description="FastAPI service for Next Word Prediction using trained LSTM model",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent

# File paths
TOKENIZER_PATH = BASE_DIR / "tokenizer.pkl"
MAX_LEN_PATH = BASE_DIR / "max_len.pkl"
MODEL_PATH_PRIMARY = BASE_DIR / "lstm_model.h5"
MODEL_PATH_SECONDARY = BASE_DIR / "lstm" / "model.h5"

# Global state variables
tokenizer = None
max_len = 745
model = None
pad_maxlen = 745  # Will be set from model.input_shape[1]


def load_artifacts():
    global tokenizer, max_len, model, pad_maxlen

    # 1. Load tokenizer
    if not TOKENIZER_PATH.exists():
        raise FileNotFoundError(f"Tokenizer not found at {TOKENIZER_PATH}")
    with open(TOKENIZER_PATH, "rb") as f:
        tokenizer = pickle.load(f)
    print(f"[LOADED] Tokenizer with {len(tokenizer.word_index)} vocabulary items.")

    # 2. Load max_len
    if not MAX_LEN_PATH.exists():
        raise FileNotFoundError(f"Max len file not found at {MAX_LEN_PATH}")
    with open(MAX_LEN_PATH, "rb") as f:
        raw_max_len = pickle.load(f)
    if isinstance(raw_max_len, (list, tuple, np.ndarray)):
        max_len = int(raw_max_len[0])
    else:
        max_len = int(raw_max_len)
    print(f"[LOADED] max_len = {max_len}")

    # 3. Load model
    model_file = None
    if MODEL_PATH_PRIMARY.exists():
        model_file = MODEL_PATH_PRIMARY
    elif MODEL_PATH_SECONDARY.exists():
        model_file = MODEL_PATH_SECONDARY
    else:
        raise FileNotFoundError(
            f"Model file not found at {MODEL_PATH_PRIMARY} or {MODEL_PATH_SECONDARY}"
        )

    print(f"[LOADING] LSTM model from {model_file}...")
    model = tf.keras.models.load_model(model_file)
    print("[LOADED] LSTM Model successfully.")

    # 4. Derive pad_maxlen directly from model's expected input shape
    # Confirmed: model input shape is (1, 745), so we pad sequences to 745
    try:
        input_shape = model.input_shape  # e.g. (1, 745)
        print(f"[MODEL] Input shape: {input_shape}")
        if isinstance(input_shape, (list, tuple)) and len(input_shape) >= 2 and input_shape[1] is not None:
            pad_maxlen = int(input_shape[1])
        else:
            pad_maxlen = max_len
    except Exception as e:
        print(f"[WARN] Could not derive input shape from model: {e}")
        pad_maxlen = max_len

    print(f"[PREPROCESSING CONFIG] pad_maxlen = {pad_maxlen}, padding = 'pre'")


@app.on_event("startup")
def startup_event():
    load_artifacts()


class PredictRequest(BaseModel):
    text: str


class PredictResponse(BaseModel):
    input: str
    prediction: str


@app.get("/health")
def health_check():
    return {
        "status": "online",
        "model_loaded": model is not None,
        "tokenizer_vocab_size": len(tokenizer.word_index) if tokenizer else 0,
        "max_len": max_len,
        "pad_maxlen": pad_maxlen
    }


@app.post("/predict", response_model=PredictResponse)
def predict_next_word(req: PredictRequest):
    if not req.text or not req.text.strip():
        raise HTTPException(status_code=400, detail="Input text cannot be empty.")

    if model is None or tokenizer is None:
        raise HTTPException(status_code=500, detail="Model artifacts are not properly loaded.")

    input_text = req.text.strip()

    try:
        # 1. Tokenize using original tokenizer
        token_list = tokenizer.texts_to_sequences([input_text])[0]

        if not token_list:
            # All input words were out-of-vocabulary
            return PredictResponse(input=input_text, prediction="")

        # 2. Pad sequence to model's expected input length with pre-padding
        padded = pad_sequences(
            [token_list],
            maxlen=pad_maxlen,
            padding="pre"
        )

        # 3. Run model inference
        probabilities = model.predict(padded, verbose=0)
        predicted_idx = int(np.argmax(probabilities, axis=-1)[0])

        # 4. Decode predicted token index back to word string
        predicted_word = tokenizer.index_word.get(predicted_idx, "")

        return PredictResponse(input=input_text, prediction=predicted_word)

    except Exception as e:
        print(f"[ERROR] Inference error: {e}")
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
