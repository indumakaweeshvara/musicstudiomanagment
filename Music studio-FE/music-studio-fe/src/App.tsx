import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
                {/* Simple Navbar */}
                <nav className="bg-black/30 backdrop-blur-md border-b border-purple-500/20 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            MrIndu Studio
                        </h1>
                        <div className="flex gap-6">
                            <Link to="/" className="hover:text-purple-400 transition">Home</Link>
                            <Link to="/music" className="hover:text-purple-400 transition">Music</Link>
                            <Link to="/contact" className="hover:text-purple-400 transition">Contact</Link>
                        </div>
                    </div>
                </nav>

                {/* Routes */}
                <Routes>
                    <Route path="/" element={
                        <div className="container mx-auto px-4 py-20 text-center">
                            <h1 className="text-6xl font-bold mb-6">Welcome to MrIndu Studio</h1>
                            <p className="text-xl text-gray-300 mb-8">Professional Music Production & Recording</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                                <div className="bg-purple-900/30 p-8 rounded-xl border border-purple-500/20 hover:scale-105 transition">
                                    <h3 className="text-2xl font-bold mb-4">🎵 Music Production</h3>
                                    <p>High-quality music production services</p>
                                </div>
                                <div className="bg-purple-900/30 p-8 rounded-xl border border-purple-500/20 hover:scale-105 transition">
                                    <h3 className="text-2xl font-bold mb-4">🎙️ Recording</h3>
                                    <p>Professional recording studio</p>
                                </div>
                                <div className="bg-purple-900/30 p-8 rounded-xl border border-purple-500/20 hover:scale-105 transition">
                                    <h3 className="text-2xl font-bold mb-4">🎧 Mixing</h3>
                                    <p>Expert mixing and mastering</p>
                                </div>
                            </div>
                        </div>
                    } />
                    <Route path="/music" element={
                        <div className="container mx-auto px-4 py-20">
                            <h1 className="text-4xl font-bold mb-8">Music Portfolio</h1>
                            <p className="text-gray-300">Music content will be loaded here</p>
                        </div>
                    } />
                    <Route path="/contact" element={
                        <div className="container mx-auto px-4 py-20">
                            <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
                            <p className="text-gray-300">Contact form will be here</p>
                        </div>
                    } />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
