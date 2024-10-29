import os
import streamlit as st
import pickle
import time
import requests
from langchain.chains import RetrievalQAWithSourcesChain
from langchain.chains.qa_with_sources.loading import load_qa_with_sources_chain
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.document_loaders import UnstructuredURLLoader

from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()

st.title("FinInsight")
st.subheader("Where Data Meets Intelligence")
st.sidebar.title("Enter URLs")

urls=[]

for i in range(3):
    url=st.sidebar.text_input(f"URL{i+1}")
    urls.append(url)

process_url_clicked=st.sidebar.button("Process URLs")
file_path="faiss_store_vector_index.pkl"

main_placefolder=st.empty()

if process_url_clicked:
    loader=UnstructuredURLLoader(urls=urls)
    main_placefolder.text("Gathering Your Data, Hang Tight...")
    data=loader.load()
    text_splitter=RecursiveCharacterTextSplitter(
        separators=['\n\n','\n','.',','],
        chunk_size=1000
    )
    main_placefolder.text("Analyzing Text for Deeper Insights...")
    docs=text_splitter.split_documents(data)
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectorindexdoc = FAISS.from_documents(docs, embeddings)
    main_placefolder.text("Embarking on Vector Embedding, Please Hold...")
    time.sleep(2)

    with open(file_path,'wb') as f:
        pickle.dump(vectorindexdoc, f)

query=main_placefolder.text_input("Question: ")
if query:
    if os.path.exists(file_path):
        with open(file_path, "rb") as f:
            vectorStore=pickle.load(f)
            llm=ChatGroq(temperature=0,groq_api_key=os.getenv("GROQ_API_KEY"),model_name="llama-3.1-70b-versatile")
            chain = RetrievalQAWithSourcesChain.from_llm(llm=llm, retriever=vectorStore.as_retriever())
            result = chain({"question":query},return_only_outputs=True)
            st.subheader("Answer")
            st.subheader(result["answer"])

            sources = result.get("sources", "")
            if sources:
                st.subheader("Sources:")
                sources_list = sources.split("\n")
                for source in sources_list:
                    st.write(source)

