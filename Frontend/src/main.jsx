import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import Index from './pages/index';
import Chat from './pages/chat';
import Login from './pages/login';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
