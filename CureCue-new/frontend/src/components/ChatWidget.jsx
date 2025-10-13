// In frontend/src/components/ChatWidget.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // The API call function for text, translated from your JS
  const getAIResponse = async (message) => {
    const url = 'https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQm81Qnd5eHIwYkVfbkEwcGJOX21LYmpSU2tpWnlTYmlNYW9IWGluZE5TWEFKc2sxUTdQWFZrQldMVVVmSDJyQ3pWMEdFbFBxbkVleF9VMTR5ZDgzQVpTbmVrZ3c9PQ==';
    try {
      const response = await axios.post(url, { prompt: message });
      return response.data.status === 'success' ? response.data.text : 'Oops, something went wrong.';
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return 'Oops, something went wrong.';
    }
  };

  // The API call function for images, translated from your JS
  const generateImage = async (prompt) => {
    const url = 'https://backend.buildpicoapps.com/aero/run/image-generation-api?pk=v1-Z0FBQUFBQm81QnhYQnhfTUhCSlVvMlV1dFg1WURLVTZBWmNtNHNTLVZKb0VnMk1tLTRTdVI1aXItNTl4alJvUDN5NXZVZUdCMnlpMG43MndlZnhqV3Q0UXVKMlRMQjEyYnc9PQ==';
    try {
      const response = await axios.post(url, { prompt });
      return response.data.status === 'success' ? response.data.imageUrl : null;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  const handleSend = async () => {
    const userMessage = currentMessage.trim();
    if (!userMessage) return;

    setMessages(prev => [...prev, { from: 'user', text: userMessage }]);
    setCurrentMessage('');
    setIsLoading(true);

    const aiResponse = await getAIResponse(userMessage);
    setMessages(prev => [...prev, { from: 'bot', text: aiResponse }]);
    setIsLoading(false);
  };

  const handleGenerateImage = async () => {
    const userMessage = currentMessage.trim();
    if (!userMessage) return;

    setMessages(prev => [...prev, { from: 'user', text: `Generate image of: "${userMessage}"` }]);
    setCurrentMessage('');
    setIsLoading(true);

    const imageUrl = await generateImage(userMessage);
    if (imageUrl) {
      setMessages(prev => [...prev, { from: 'bot', type: 'image', url: imageUrl }]);
    } else {
      setMessages(prev => [...prev, { from: 'bot', text: 'Image generation failed.' }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="bg-cyan-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl animate-bounce">
          💬
        </button>
      )}

      {isOpen && (
        <div className="w-96 bg-gray-800 rounded-lg shadow-2xl flex flex-col" style={{ fontFamily: "'Poppins', sans-serif" }}>
          <div className="bg-gray-900 p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="text-white font-bold">Your Empathetic AI Companion</h3>
            <button onClick={() => setIsOpen(false)} className="text-white text-2xl">&times;</button>
          </div>

          <div className="flex-1 h-96 overflow-y-scroll p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
                {msg.type === 'image' ? (
                  <img src={msg.url} alt="Generated Art" className="rounded-lg max-w-xs" />
                ) : (
                  <span className={`inline-block p-3 rounded-lg max-w-xs text-white ${msg.from === 'bot' ? 'bg-gray-700' : 'bg-blue-600'}`}>
                    {msg.text}
                  </span>
                )}
              </div>
            ))}
            {isLoading && <div className="spinner mt-2 mx-auto"></div>}
          </div>

          <div className="p-4 border-t border-gray-700">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <div className="flex gap-2 mt-2">
              <button onClick={handleSend} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Send</button>
              <button onClick={handleGenerateImage} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">Generate Image</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}