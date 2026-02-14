import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm ParkGenie. How can I help you find parking today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const location = useLocation();

    // Hide chatbot on the /find page where Smart Sort FAB exists
    if (location.pathname === '/find') {
        return null;
    }

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { text: input, sender: 'user' };
        setMessages([...messages, userMsg]);
        setInput('');

        // Simulate AI Response
        setTimeout(() => {
            let botResponse = "I'm still learning, but I can help you find parking spots near you!";
            const lowerInput = input.toLowerCase();

            if (lowerInput.includes('price') || lowerInput.includes('cost')) {
                botResponse = "Our parking rates generally range from $2 to $10 per hour depending on the location and amenities.";
            } else if (lowerInput.includes('location') || lowerInput.includes('find')) {
                botResponse = "You can use the search bar on the home page to find parking by city, address, or pincode.";
            } else if (lowerInput.includes('refund') || lowerInput.includes('cancel')) {
                botResponse = "You can cancel your booking from the 'My Bookings' section. Refunds are processed within 24 hours.";
            }

            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition animate-bounce"
                >
                    <MessageCircle className="text-white" size={28} />
                </button>
            )}

            {isOpen && (
                <div className="bg-black/80 backdrop-blur-xl border border-white/20 w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                        <h3 className="font-bold text-white flex items-center gap-2">✨ ParkGenie AI</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white/10 text-gray-100 rounded-bl-none'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-white/10 flex gap-2">
                        <input
                            type="text"
                            className="flex-1 bg-black/20 text-white text-sm rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Ask anything..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button onClick={handleSend} className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition">
                            <Send size={16} className="text-white" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIChatbot;
