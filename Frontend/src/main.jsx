import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';

import Navbar from "./components/navbar";
import Index from "./pages/index";
import About from "./pages/about";
import Features from "./pages/features";
import Contact from "./pages/contact";
import Investors from "./pages/investors";  // Import Investors page
import Chat from "./pages/chat";       // Import Chat Page
import CoFounder from "./pages/cofounder";  // Import Co-founder Page
import Login from "./pages/login";


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/investors" element={<Investors />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/cofounder" element={<CoFounder />} />
                <Route path="/login" element={<Login />} /> 
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)

 
