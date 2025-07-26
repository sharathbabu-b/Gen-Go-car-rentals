import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux'; // assuming auth info is in Redux

const socket = io('http://localhost:3500'); // replace with your backend URL

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  // Get user info from Redux (or props/context)
  const user = useSelector((state) => state.user?.user); // e.g., { _id, name, role }

  useEffect(() => {
    socket.on('chat-message', (msgData) => {
      setMessages((prev) => [...prev, msgData]);
    });

    return () => socket.off('chat-message');
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const msgData = {
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        userId: user?._id,
        username: user?.name,
        userType: user?.role, // e.g., 'renter', 'owner', 'admin'
      };
      socket.emit('chat-message', msgData);
      setMessages((prev) => [...prev, msgData]);
      setMessage('');
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-md mx-auto border rounded-lg shadow-lg bg-white flex flex-col h-[500px]">
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.userId === user?._id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                msg.userId === user?._id
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-black rounded-bl-none'
              }`}
            >
              <div className="font-bold">{msg.username} <span className="text-xs text-gray-500">({msg.userType})</span></div>
              <div>{msg.text}</div>
              <div className="text-xs text-right mt-1 opacity-70">{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-md"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
