import { useState } from 'react'
import '../styles/chat.css'
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Chat() {
    const [searchQuery, setSearchQuery] = useState('')
    const [messages, setMessages] = useState([])

    async function fetchLinks() {
        // Add user query immediately
        setMessages(prev => [
            ...prev,
            { type: 'user', content: searchQuery }
        ])

        const response = await fetch('http://localhost:8000/search/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: searchQuery,
                k: 2
            })
        })
        const data = await response.json()
        // Add only the response to messages
        setMessages(prev => [
            ...prev,
            { type: 'assistant', content: data }
        ])
        setSearchQuery('') // Clear input after sending
    }

    return (
        <div className="chat-container">
            <Navbar />
            <div className="chat-content">
                {/* Chat messages */}
                <div className="messages-container">
                    {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.type}`}
                    >
                        <div className="message-content">
                        {message.type === 'user' ? (
                            message.content
                        ) : (
                            <pre>
                            {JSON.stringify(message.content.response, null, 2)}
                            </pre>
                        )}
                        </div>
                    </div>
                    ))}
                </div>

                {/* Search input and button */}
                <div className="input-container">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && searchQuery.trim()) {
                                fetchLinks();
                            }
                        }}
                        placeholder="Search..."
                    />
                    <button
                        onClick={fetchLinks}
                        disabled={!searchQuery.trim()}
                    >
                        Search
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Chat




