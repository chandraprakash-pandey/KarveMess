import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Home, LogIn, UserPlus, LogOut, User, Menu, X, Utensils } from 'lucide-react';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:8000/user", { 
                    withCredentials: true 
                });
                setUser(res.data);
            } catch (err) {
                if (err.response?.status === 401) {
                    setUser(null);
                } else {
                    console.error("Unexpected error:", err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:8000/logout", { 
                withCredentials: true 
            });
            setUser(null);
            navigate("/login");
            setIsOpen(false);
            sessionStorage.removeItem("hasReloaded");
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            isActive
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
        }`;

    const mobileNavLinkClass = ({ isActive }) =>
        `flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
            isActive
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
        }`;

    return (
        <nav className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center space-x-2 group">
                        <div className="bg-linear-to-br from-blue-500 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                            <Utensils className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            KarveMess
                        </h1>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {!loading && (
                            <>
                                {!user ? (
                                    <>
                                        <NavLink to="/" className={navLinkClass}>
                                            <Home className="w-4 h-4" />
                                            <span>Home</span>
                                        </NavLink>
                                        <NavLink to="/Menu" className={navLinkClass}>
                                            <Home className="w-4 h-4" />
                                            <span>Menu</span>
                                        </NavLink>
                                        <NavLink to="/Login" className={navLinkClass}>
                                            <LogIn className="w-4 h-4" />
                                            <span>Login</span>
                                        </NavLink>
                                        <NavLink to="/Signup" className={navLinkClass}>
                                            <UserPlus className="w-4 h-4" />
                                            <span>Sign Up</span>
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <NavLink to="/Menu" className={navLinkClass}>
                                            <Home className="w-4 h-4" />
                                            <span>Menu</span>
                                        </NavLink>
                                        <NavLink to="/foodform" className={navLinkClass}>
                                            <Utensils className="w-4 h-4" />
                                            <span>Add Menu</span>
                                        </NavLink>
                                        <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-700">
                                            <NavLink to='/user' className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg">
                                                <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                    <User className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-white font-medium">
                                                    {user.fullName}
                                                </span>
                                            </NavLink>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-lg text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden pb-4 space-y-2 animate-fadeIn">
                        {!loading && (
                            <>
                                {!user ? (
                                    <>
                                        <NavLink
                                            to="/"
                                            className={mobileNavLinkClass}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Home className="w-5 h-5" />
                                            <span>Home</span>
                                        </NavLink>
                                        
                                        <NavLink
                                            to="/Login"
                                            className={mobileNavLinkClass}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <LogIn className="w-5 h-5" />
                                            <span>Login</span>
                                        </NavLink>
                                        <NavLink
                                            to="/Signup"
                                            className={mobileNavLinkClass}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <UserPlus className="w-5 h-5" />
                                            <span>Sign Up</span>
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center space-x-2 px-4 py-3 bg-gray-800 rounded-lg mb-3">
                                            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <User className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{user.fullName}</p>
                                                <p className="text-gray-400 text-sm">{user.email}</p>
                                            </div>
                                        </div>
                                        <NavLink
                                            to="/"
                                            className={mobileNavLinkClass}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Home className="w-5 h-5" />
                                            <span>Home</span>
                                        </NavLink>
                                        <NavLink
                                            to="/foodform"
                                            className={mobileNavLinkClass}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Utensils className="w-5 h-5" />
                                            <span>Food Menu</span>
                                        </NavLink>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center space-x-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            <span>Logout</span>
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Header;