import React, { useState } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');

    const sendMessage = async () => {
        if (!userMessage) return;

        const newMessages = [...messages, { sender: 'You', text: userMessage }];
        setMessages(newMessages);

        try {
            const response = await fetch('http://127.0.0.1:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            setMessages([...newMessages, { sender: 'Bot', text: data.response }]);
            setUserMessage('');
        } catch (error) {
            console.error('Error:', error);
            setMessages([...newMessages, { sender: 'Bot', text: 'There was an error processing your request.' }]);
        }
    };

    return (
        <div>
            <h1>Chat with Danco Plastics</h1>
            <div id="chatbox">
                {messages.map((msg, index) => (
                    <div key={index}><strong>{msg.sender}:</strong> {msg.text}</div>
                ))}
            </div>
            <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message here..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
