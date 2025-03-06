from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.chains import RetrievalQAWithSourcesChain
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.document_loaders import UnstructuredURLLoader
from langchain_groq import ChatGroq
import pickle
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
vector_store = None

@app.route('/process-urls', methods=['POST'])
def process_urls():
    global vector_store

    data = request.json
    urls = data['urls']

    if not urls:
        return jsonify({"error": "No URLs provided"}), 400

    try:
        loader = UnstructuredURLLoader(urls=urls)
        data = loader.load()

        text_splitter = RecursiveCharacterTextSplitter(
            separators=['\n\n', '\n', '.', ','],
            chunk_size=1000
        )
        docs = text_splitter.split_documents(data)

        embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        vector_store = FAISS.from_documents(docs, embeddings)

        return jsonify({"message": "URLs processed successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/ask', methods=['POST'])
def ask_question():
    global vector_store

    data = request.json
    question = data['question']

    if not question:
        return jsonify({"error": "No question provided"}), 400

    if not vector_store:
        return jsonify({"error": "URLs have not been processed yet"}), 400

    try:
        llm = ChatGroq(
            temperature=0,
            groq_api_key=os.getenv("GROQ_API_KEY"),
            model_name="llama-3.3-70b-versatile"
        )
        chain = RetrievalQAWithSourcesChain.from_llm(
            llm=llm,
            retriever=vector_store.as_retriever()
        )

        result = chain({"question": question}, return_only_outputs=True)
        answer = result.get("answer", "")
        sources = result.get("sources", "")

        return jsonify({
            "answer": answer,
            "sources": sources.split("\n") if sources else []
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(port=port)
