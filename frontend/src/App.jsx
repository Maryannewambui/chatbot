import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './components/Chat';
import Home from './components/Home';

function App() {
    return (
        <BrowserRouter>
        <Routes>
        <Route index element={<Home />} />
        <Route path='/chat' element={<Chat />} />

        </Routes>
        </BrowserRouter>
    );
}

export default App;
