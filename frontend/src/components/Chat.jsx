import React, { useState, useEffect, useRef } from 'react';
import hommy from '../assets/Hostel Logo.png';

const Chat = () => {
    const [messages, setMessages] = useState([
        { sender: 'Hommy', text: "Hello, I'm Hommy. How may I be of assistance?" }
    ]);
    const [userMessage, setUserMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!userMessage.trim()) return;

        const newMessages = [...messages, { sender: 'You', text: userMessage }];
        setMessages(newMessages);

        try {
            const response = await fetch('http://127.0.0.1:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage.trim() }),
            });

            if (!response.ok) {
                throw new Error('Server error');
            }

            const data = await response.json();
            setMessages([...newMessages, { sender: 'Hommy', text: data.response }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages([...newMessages, { sender: 'Hommy', text: 'There was an error processing your request.' }]);
        } finally {
            setUserMessage('');
        }
    };

    return (
        <div className="fixed bottom-5 left-5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium border rounded-full w-16 h-16 bg-orange-500 hover:bg-orange-600 text-white animate-bounce"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <span className="text-sm">Need Help?</span>
                )}
            </button>
            {isOpen && (
                <div className="bg-white shadow-lg rounded-lg w-80 h-96 flex flex-col">
                    {/* Header */}
                    <div className="bg-gray-200 p-4 flex items-center rounded-t-lg">
                        <img src={hommy} alt="Hommy" className="rounded-full w-10 h-10 mr-3" />
                        <span className="font-semibold text-lg">Hommy</span>
                    </div>
                    {/* Messages */}
                    <div className="flex-grow overflow-auto p-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`my-2 p-2 rounded-md ${msg.sender === 'You' ? 'bg-orange-100 self-end text-right' : 'bg-gray-100 self-start text-left'}`}>
                                <strong className="block">{msg.sender}</strong>
                                <span>{msg.text}</span>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    {/* Input */}
                    <form className="flex p-4 border-t border-gray-200" onSubmit={sendMessage}>
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Type your message here..."
                            className="flex-grow border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button type="submit" className="bg-orange-500 text-white p-2 rounded ml-2 hover:bg-orange-600">
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chat;
