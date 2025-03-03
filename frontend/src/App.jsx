import React, { useState } from 'react';
import { Search, Database, Loader2, ExternalLink, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import axios from 'axios';

function App() {
    const [urls, setUrls] = useState(['', '', '']);
    const [query, setQuery] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isQuerying, setIsQuerying] = useState(false);
    const [processingStatus, setProcessingStatus] = useState('');
    const [answer, setAnswer] = useState('');
    const [sources, setSources] = useState([]);
    const [isProcessed, setIsProcessed] = useState(false);
    const [error, setError] = useState('');

    const handleUrlChange = (index, value) => {
        const newUrls = [...urls];
        newUrls[index] = value;
        setUrls(newUrls);
    };

    const processUrls = async () => {
        const validUrls = urls.filter(url => url.trim() !== '');
        if (validUrls.length === 0) {
            setError('Please enter at least one URL');
            setTimeout(() => setError(''), 3000);
            return;
        }

        setError('');
        setIsProcessing(true);
        setProcessingStatus('Gathering Your Data, Hang Tight...');

        try {
            const response = await axios.post('http://localhost:5000/process-urls', { urls: validUrls });
            setIsProcessed(true);
            setProcessingStatus('URLs processed successfully!');
        } catch (error) {
            console.error('Error processing URLs:', error);
            setProcessingStatus('Error processing URLs. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const askQuestion = async () => {
        if (!query.trim()) {
            setError('Please enter a question');
            setTimeout(() => setError(''), 3000);
            return;
        }

        if (!isProcessed) {
            setError('Please process URLs first');
            setTimeout(() => setError(''), 3000);
            return;
        }

        setError('');
        setIsQuerying(true);

        try {
            const response = await axios.post('http://localhost:5000/ask', { question: query });
            setAnswer(response.data.answer);
            setSources(response.data.sources || []);
        } catch (error) {
            console.error('Error asking question:', error);
            setAnswer('Error getting answer. Please try again.');
            setSources([]);
        } finally {
            setIsQuerying(false);
        }
    };

    const resetApplication = () => {
        setUrls(['', '', '']);
        setQuery('');
        setProcessingStatus('');
        setAnswer('');
        setSources([]);
        setIsProcessed(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {error && (
                <div className="fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg z-50 animate-fade-in-down flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    {error}
                </div>
            )}
            
            <div className="container mx-auto px-4 py-12">
                <header className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-25"></div>
                            <div className="relative bg-white bg-opacity-90 rounded-lg p-5 flex items-center justify-center">
                                <Database className="h-8 w-8 text-indigo-600 mr-3" />
                                <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">FinInsight</h1>
                            </div>
                        </div>
                    </div>
                    <p className="text-xl text-gray-600 font-light">Where Data Meets Intelligence</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
                                <h2 className="text-xl font-semibold text-white flex items-center">
                                    <Database className="mr-2 h-5 w-5" />
                                    Data Sources
                                </h2>
                            </div>
                            
                            <div className="p-6">
                                <div className="space-y-5">
                                    {urls.map((url, index) => (
                                        <div key={index} className="transition-all duration-200">
                                            <label htmlFor={`url-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                                URL {index + 1}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    id={`url-${index}`}
                                                    type="url"
                                                    value={url}
                                                    onChange={(e) => handleUrlChange(index, e.target.value)}
                                                    placeholder="https://example.com"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                                />
                                                {url && (
                                                    <div className="absolute right-2 top-2 text-green-500">
                                                        <CheckCircle2 className="h-4 w-4" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={processUrls}
                                    disabled={isProcessing}
                                    className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center disabled:opacity-70 disabled:transform-none disabled:hover:translate-y-0"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                            Processing...
                                        </>
                                    ) : (
                                        'Process URLs'
                                    )}
                                </button>

                                {processingStatus && (
                                    <div className={`mt-4 text-sm text-center p-2 rounded ${isProcessed ? 'text-green-700 bg-green-50' : 'text-indigo-700 bg-indigo-50'}`}>
                                        {processingStatus}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-white flex items-center">
                                    <Search className="mr-2 h-5 w-5" />
                                    Query Engine
                                </h2>
                            </div>
                            
                            <div className="p-6">
                                <div className="mb-8">
                                    <label htmlFor="question" className="block text-lg font-medium text-gray-700 mb-3">
                                        Ask a question about the processed content:
                                    </label>
                                    <div className="flex shadow-sm rounded-md overflow-hidden">
                                        <input
                                            id="question"
                                            type="text"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="What insights can you provide from these articles?"
                                            className="flex-grow px-4 py-3 border-t border-b border-l border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                            disabled={!isProcessed || isQuerying}
                                            onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
                                        />
                                        <button
                                            onClick={askQuestion}
                                            disabled={!isProcessed || isQuerying}
                                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-r-md transition duration-300 ease-in-out flex items-center justify-center disabled:opacity-70"
                                        >
                                            {isQuerying ? (
                                                <Loader2 className="animate-spin h-5 w-5" />
                                            ) : (
                                                <Search className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {answer && (
                                    <div className="mt-8 animate-fade-in">
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                                                <div className="h-1 w-6 bg-indigo-600 rounded mr-2"></div>
                                                Answer
                                            </h3>
                                        </div>
                                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 text-gray-800 shadow-inner border border-indigo-100">
                                            {answer.split('\n').map((paragraph, i) => (
                                                <p key={i} className={i > 0 ? 'mt-4' : ''}>{paragraph}</p>
                                            ))}
                                        </div>

                                        {sources.length > 0 && (
                                            <div className="mt-8">
                                                <div className="flex justify-between items-center mb-3">
                                                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                                                        <div className="h-1 w-6 bg-purple-600 rounded mr-2"></div>
                                                        Sources
                                                    </h3>
                                                    <button 
                                                        onClick={resetApplication}
                                                        className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200 bg-indigo-50 hover:bg-indigo-100 rounded-md px-3 py-1.5"
                                                    >
                                                        <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                                                        Reset All
                                                    </button>
                                                </div>
                                                <ul className="space-y-3 bg-white rounded-lg p-4 border border-gray-200">
                                                    {sources.map((source, index) => (
                                                        <li key={index} className="flex items-start group">
                                                            <div className="bg-indigo-100 p-2 rounded-full mr-3 group-hover:bg-indigo-200 transition-colors duration-200">
                                                                <ExternalLink className="h-4 w-4 text-indigo-600" />
                                                            </div>
                                                            <span className="text-gray-700 pt-1">{source}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {!isProcessed && !answer && (
                                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
                                        <Database className="h-16 w-16 mb-4 text-indigo-300" />
                                        <p className="text-lg">Process URLs to start asking questions</p>
                                        <p className="text-sm mt-2 text-gray-400 max-w-md text-center">Add financial article URLs in the sidebar and process them to build your knowledge base</p>
                                    </div>
                                )}
                                {isProcessed && !answer && (
                                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
                                        <Search className="h-16 w-16 mb-4 text-indigo-300" />
                                        <p className="text-lg">Enter a question to get insights</p>
                                        <p className="text-sm mt-2 text-gray-400 max-w-md text-center">Your data is ready! Ask specific questions about the financial content you've processed</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                <footer className="mt-16 text-center text-gray-500 text-sm">
                    <p>© Made By 2ushar_03</p>
                    <p>© 2025 FinInsight. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}

export default App;