# <h1>FinInsight</h1>

<p>FinInsight is an AI-powered research tool designed to assist banking professionals in efficiently analyzing and extracting insights from URLs containing relevant banking data. It helps streamline the process of gathering, processing, and understanding financial trends and information by leveraging advanced AI technologies such as LangChain, Hugging Face, Faiss, and Retrieval-Augmented Generation (RAG).</p>

<h2>Features</h2>
<ul>
  <li><strong>Efficient URL Data Extraction:</strong> Input multiple URLs from financial news websites, and the tool extracts the relevant text data from these articles.</li>
  <li><strong>Data Chunking and Vector Embeddings:</strong> FinInsight splits the extracted data into manageable chunks and generates vector embeddings using advanced LLMs to capture the essence of the information.</li>
  <li><strong>Fast Retrieval with Faiss:</strong> Vector embeddings are stored in Faiss, ensuring quick and accurate retrieval of relevant data during query processing.</li>
  <li><strong>Retrieval-Augmented Generation (RAG):</strong> The tool uses RAG to generate contextually relevant and precise answers to user queries based on the processed data.</li>
  <li><strong>Concise Insights with Data Sources:</strong> Once a query is made, FinInsight provides concise, accurate answers along with the sources of the data, enabling users to make well-informed decisions.</li>
</ul>

<h2>Technologies Used</h2>
<ul>
  <li><strong>LangChain:</strong> An open-source framework that integrates large language models (LLMs) into applications, enabling more efficient data processing and analysis.</li>
  <li><strong>Hugging Face:</strong> A platform that provides powerful pre-trained models for various NLP tasks, including text embeddings, question answering, and summarization.</li>
  <li><strong>Faiss:</strong> An open-source library for similarity search and clustering of vectors, used for fast and efficient retrieval of data.</li>
  <li><strong>RAG (Retrieval-Augmented Generation):</strong> A technique that combines information retrieval and generative models to generate more accurate and contextually relevant responses.</li>
</ul>

<h2>Frontend & Backend</h2>
<ul>
  <li><strong>Frontend:</strong> Built with React.js and styled using <strong>TailwindCSS</strong> to provide a user-friendly interface that allows easy interaction with the system.</li>
  <li><strong>Backend:</strong> Developed using Flask to handle requests, process the data, and deliver the insights in a seamless manner.</li>
</ul>

<h2>Running the Project</h2>

<h3>Frontend</h3>
<p>To run the frontend, make sure you have the necessary dependencies installed, then run:</p>
<pre><code>npm run dev</code></pre>

<h3>Backend</h3>
<p>To run the backend, ensure you have Flask installed and run the following command:</p>
<pre><code>python main.py</code></pre>

<h2>How It Works</h2>
<ul>
  <li><strong>Input URLs:</strong> The user provides URLs containing relevant financial data, such as news articles, financial reports, or market trends.</li>
  <li><strong>Text Extraction:</strong> The tool extracts the relevant text data from each provided URL.</li>
  <li><strong>Text Chunking & Embedding Generation:</strong> The extracted text is split into chunks and processed by a large language model (LLM), generating vector embeddings of the content.</li>
  <li><strong>Data Storage:</strong> These embeddings are stored in Faiss, allowing for quick and efficient similarity search during the query phase.</li>
  <li><strong>Query Handling:</strong> When the user asks a question (e.g., "How have interest rates changed over the past 6 months?"), the system uses RAG to retrieve the most relevant data and generate an accurate answer.</li>
  <li><strong>Result Display:</strong> The generated answer, along with the sources of the data, is presented to the user, aiding in informed decision-making.</li>
</ul>

<h2>Use Cases</h2>
<ul>
  <li><strong>Market Trend Analysis:</strong> Quickly understand market trends, interest rate fluctuations, and other financial metrics from a variety of sources.</li>
  <li><strong>Competitive Research:</strong> Analyze financial articles or reports to stay updated on competitor activities and strategies.</li>
  <li><strong>Decision Support:</strong> Leverage the insights to make data-driven decisions in the banking and finance sectors.</li>
</ul>

<h2>Installation</h2>

<h3>Prerequisites</h3>
<p>Ensure you have the following installed:</p>
<ul>
  <li><strong>Node.js</strong> and <strong>npm</strong> (for frontend)</li>
  <li><strong>Python</strong> (for backend)</li>
  <li><strong>Flask</strong> (for backend)</li>
</ul>

<h3>Frontend Installation</h3>
<ol>
  <li>Navigate to the frontend directory:</li>
  <pre><code>cd frontend</code></pre>
  <li>Install dependencies:</li>
  <pre><code>npm install</code></pre>
  <li>Run the frontend:</li>
  <pre><code>npm run dev</code></pre>
</ol>

<h3>Backend Installation</h3>
<ol>
  <li>Navigate to the backend directory:</li>
  <pre><code>cd backend</code></pre>
  <li>Install dependencies:</li>
  <pre><code>pip install -r requirements.txt</code></pre>
  <li>Run the backend:</li>
  <pre><code>python main.py</code></pre>
</ol>

<h2>Contributing</h2>
<p>We welcome contributions to improve FinInsight! If you have suggestions, bug fixes, or new features, feel free to submit a pull request. Please follow these steps:</p>
<ol>
  <li>Fork the repository.</li>
  <li>Create a new branch (<code>git checkout -b feature-branch</code>).</li>
  <li>Make your changes and commit (<code>git commit -am 'Add new feature'</code>).</li>
  <li>Push to the branch (<code>git push origin feature-branch</code>).</li>
  <li>Create a pull request.</li>
</ol>

<p>With <strong>FinInsight</strong>, banking professionals can now analyze multiple data sources efficiently and make smarter, data-driven decisions.</p>
