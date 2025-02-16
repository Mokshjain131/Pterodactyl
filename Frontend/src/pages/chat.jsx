import React, { useState } from 'react'
import '../styles/chat.css'
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Chat() {
    const [searchQuery, setSearchQuery] = useState('')
    const [messages, setMessages] = useState([])
    const [businessIdea, setBusinessIdea] = useState('')
    const [businessStage, setBusinessStage] = useState('')
    const [currentChallenges, setCurrentChallenges] = useState('')
    const [goals, setGoals] = useState('')
    const [currentOperations, setCurrentOperations] = useState('')
    const [growthTargets, setGrowthTargets] = useState('')
    const [resources, setResources] = useState('')

    async function fetchLinks() {
        // Add user query immediately
        setMessages(prev => [
            ...prev,
            { type: 'user', content: searchQuery }
        ])

        const response = await fetch('http://localhost:8000/ai/', {
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
        if (data.success) {
            const cleanedResponse = data.response.replace(/\*/g, ''); // Remove all '*' characters
            setMessages(prev => [
                ...prev,
                { type: 'assistant', content: cleanedResponse } // Only display the cleaned response
            ])
        } else {
            setMessages(prev => [
                ...prev,
                { type: 'assistant', content: "An error occurred while fetching the response." }
            ])
        }
        setSearchQuery('') // Clear input after sending
    }

    async function validateIdea() {
        setMessages(prev => [
            ...prev,
            { type: 'user', content: `Validate Idea: ${businessIdea}` }
        ])

        const response = await fetch('http://localhost:8000/validate_idea/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idea: businessIdea,
                market: searchQuery, // Assuming market is taken from searchQuery
                target_audience: 'General' // Placeholder, adjust as needed
            })
        })
        const data = await response.json()
        const cleanedAnalysis = data.analysis.replace(/\*/g, ''); // Remove all '*' characters
        setMessages(prev => [
            ...prev,
            { type: 'assistant', content: cleanedAnalysis }
        ])
        setBusinessIdea('') // Clear input after sending
    }

    async function getStrategicAdvice() {
        setMessages(prev => [
            ...prev,
            { type: 'user', content: `Strategic Advice for Idea: ${businessIdea}` }
        ])

        const response = await fetch('http://localhost:8000/strategic_advice/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                business_stage: 'N/A', // Placeholder, adjust as needed
                current_challenges: 'N/A', // Placeholder, adjust as needed
                goals: 'N/A', // Placeholder, adjust as needed
                business_idea: businessIdea
            })
        })
        const data = await response.json()
        const cleanedAdvice = data.advice.replace(/\*/g, ''); // Remove all '*' characters
        setMessages(prev => [
            ...prev,
            { type: 'assistant', content: cleanedAdvice }
        ])
        setBusinessIdea('') // Clear input after sending
    }

    async function getScalingAdvice() {
        setMessages(prev => [
            ...prev,
            { type: 'user', content: `Scaling Advice for Idea: ${businessIdea}` }
        ])

        const response = await fetch('http://localhost:8000/scaling/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                current_operations: 'N/A', // Placeholder, adjust as needed
                growth_targets: 'N/A', // Placeholder, adjust as needed
                resources: 'N/A', // Placeholder, adjust as needed
                business_idea: businessIdea
            })
        })
        const data = await response.json()
        const cleanedScalingPlan = data.scaling_plan.replace(/\*/g, ''); // Remove all '*' characters
        setMessages(prev => [
            ...prev,
            { type: 'assistant', content: cleanedScalingPlan }
        ])
        setBusinessIdea('') // Clear input after sending
    }

    return (
        <div className="chat-container">
            <Navbar />
            <div className="chat-content">
                {/* Chat messages display field */}
                <div className="messages-container">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.type}`}>
                            <div className="message-content">
                                {message.type === 'user' ? (
                                    message.content
                                ) : (
                                    <pre>
                                        {typeof message.content === 'string' ? message.content : JSON.stringify(message.content, null, 2)}
                                    </pre>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* General Purpose Input */}
                <h2>General Purpose</h2>
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

                {/* Business Idea input and buttons */}
                <h2>Business Idea Input</h2>
                <div className="input-container">
                    <input
                        type="text"
                        value={businessIdea}
                        onChange={(e) => setBusinessIdea(e.target.value)}
                        placeholder="Enter your business idea..."
                    />
                    <button
                        onClick={validateIdea}
                        disabled={!businessIdea.trim()}
                    >
                        Validate Idea
                    </button>
                    <button
                        onClick={getStrategicAdvice}
                        disabled={!businessIdea.trim()}
                    >
                        Get Strategic Advice
                    </button>
                    <button
                        onClick={getScalingAdvice}
                        disabled={!businessIdea.trim()}
                    >
                        Get Scaling Advice
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Chat




