import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Home, LogIn, UserPlus, LogOut, User, Menu, X, Utensils, Crown, Sparkles, Star } from 'lucide-react';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [subs, setSubs] = useState(false);
    const today = new Date();
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    const dayName = days[today.getDay()];

    console.log(dayName);
    

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
                setSubs(res.data.subscribed);

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

            const hasReloaded = sessionStorage.getItem("hasReloaded");
            if (hasReloaded) {
                sessionStorage.setItem("hasReloaded", "flase");
                window.location.reload();
            }

            sessionStorage.removeItem("hasReloaded");

        } catch (err) {
            console.error(`Error: ${err}`);
        }
    };

    const handleSubscribe = () => {
        navigate("/subscription");
        setIsOpen(false);
    };

    // Premium user nav link styling
    const premiumNavLinkClass = ({ isActive }) =>
        `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive
            ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg scale-105'
            : 'text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600'
        }`;

    // Standard user nav link styling
    const navLinkClass = ({ isActive }) =>
        `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
            : 'text-gray-300 hover:text-white hover:bg-gray-800'
        }`;

    const premiumMobileNavLinkClass = ({ isActive }) =>
        `flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActive
            ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white'
            : 'text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600'
        }`;

    const mobileNavLinkClass = ({ isActive }) =>
        `flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActive
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            : 'text-gray-300 hover:text-white hover:bg-gray-800'
        }`;

    const activeNavClass = subs ? premiumNavLinkClass : navLinkClass;
    const activeMobileNavClass = subs ? premiumMobileNavLinkClass : mobileNavLinkClass;

    return (
        <nav className={`${subs
                ? 'bg-linear-to-r from-purple-900 via-indigo-900 to-purple-900 border-b-2 border-yellow-400/30'
                : 'bg-linear-to-r from-gray-900 via-gray-800 to-gray-900'
            } shadow-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center space-x-2 group">
                        <div className={`${subs
                                ? 'bg-linear-to-br from-yellow-400 to-amber-500'
                                : 'bg-linear-to-br from-blue-500 to-purple-600'
                            } p-2 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            <Utensils className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <h1 className={`text-2xl font-bold ${subs
                                    ? 'bg-linear-to-r from-yellow-400 to-amber-500'
                                    : 'bg-linear-to-r from-blue-400 to-purple-500'
                                } bg-clip-text text-transparent`}>
                                KarveMess
                            </h1>
                            {subs && (
                                <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
                            )}
                        </div>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {!loading && (
                            <>
                                {!user ? (
                                    <>
                                        <NavLink to="/" className={activeNavClass}>
                                            <Home className="w-4 h-4" />
                                            <span>Home</span>
                                        </NavLink>
                                        <NavLink to="/Menu" className={activeNavClass}>
                                            <Utensils className="w-4 h-4" />
                                            <span>Menu</span>
                                        </NavLink>
                                        <NavLink to="/Login" className={activeNavClass}>
                                            <LogIn className="w-4 h-4" />
                                            <span>Login</span>
                                        </NavLink>
                                        <NavLink to="/Signup" className={activeNavClass}>
                                            <UserPlus className="w-4 h-4" />
                                            <span>Sign Up</span>
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <NavLink to="/Menu" className={activeNavClass}>
                                            <Utensils className="w-4 h-4" />
                                            <span>Menu</span>
                                        </NavLink>
                                        <NavLink to={`/foodform?day=${dayName}`} className={activeNavClass}>
                                            <Utensils className="w-4 h-4" />
                                            <span>Add Menu</span>
                                        </NavLink>

                                        {/* Subscription Button - Only show if not subscribed */}
                                        {!subs && (
                                            <button
                                                onClick={handleSubscribe}
                                                className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                                            >
                                                <Crown className="w-4 h-4" />
                                                <span>Go Premium</span>
                                                <Sparkles className="w-4 h-4" />
                                            </button>
                                        )}

                                        <div className={`flex items-center space-x-3 ml-4 pl-4 ${subs ? 'border-l border-yellow-400/30' : 'border-l border-gray-700'
                                            }`}>
                                            <NavLink to='/user' className={`flex items-center space-x-2 px-3 py-2 ${subs
                                                    ? 'bg-linear-to-r from-purple-800 to-indigo-800 border border-yellow-400/30'
                                                    : 'bg-gray-800'
                                                } rounded-lg transition-all duration-300 hover:scale-105`}>
                                                <div className={`w-8 h-8 ${subs
                                                        ? 'bg-linear-to-br from-yellow-400 to-amber-500 ring-2 ring-yellow-400/50'
                                                        : 'bg-linear-to-br from-blue-500 to-purple-600'
                                                    } rounded-full flex items-center justify-center`}>
                                                    {subs ? (
                                                        <Crown className="w-4 h-4 text-white" />
                                                    ) : (
                                                        <User className="w-4 h-4 text-white" />
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <span className={`${subs ? 'text-white' : 'text-white'} font-medium`}>
                                                        {user.fullName}
                                                    </span>
                                                    {subs && (
                                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                    )}
                                                </div>
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
                            className={`p-2 rounded-lg text-white ${subs ? 'hover:bg-purple-800' : 'hover:bg-gray-800'
                                } focus:outline-none focus:ring-2 ${subs ? 'focus:ring-yellow-400' : 'focus:ring-blue-500'
                                } transition-all duration-300`}
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
                                            className={activeMobileNavClass}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Home className="w-5 h-5" />
                                            <span>Home</span>
                                        </NavLink>
                                        <NavLink
                                            to="/Menu"
                                            className={activeMobileNavClass}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Utensils className="w-5 h-5" />
                                            <span>Menu</span>
                                        </NavLink>
                                        <NavLink
                                            to="/Login"
                                            className={activeMobileNavClass}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <LogIn className="w-5 h-5" />
                                            <span>Login</span>
                                        </NavLink>
                                        <NavLink
                                            to="/Signup"
                                            className={activeMobileNavClass}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <UserPlus className="w-5 h-5" />
                                            <span>Sign Up</span>
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <div className={`flex items-center space-x-2 px-4 py-3 ${subs
                                                ? 'bg-linear-to-r from-purple-800 to-indigo-800 border border-yellow-400/30'
                                                : 'bg-gray-800'
                                            } rounded-lg mb-3`}>
                                            <div className={`w-10 h-10 ${subs
                                                    ? 'bg-linear-to-br from-yellow-400 to-amber-500 ring-2 ring-yellow-400/50'
                                                    : 'bg-linear-to-br from-blue-500 to-purple-600'
                                                } rounded-full flex items-center justify-center`}>
                                                {subs ? (
                                                    <Crown className="w-5 h-5 text-white" />
                                                ) : (
                                                    <User className="w-5 h-5 text-white" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-1">
                                                    <p className="text-white font-medium">{user.fullName}</p>
                                                    {subs && (
                                                        <>
                                                            <Crown className="w-4 h-4 text-yellow-400" />
                                                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                        </>
                                                    )}
                                                </div>
                                                <p className={`${subs ? 'text-purple-200' : 'text-gray-400'} text-sm`}>
                                                    {subs ? 'Premium Member' : user.email}
                                                </p>
                                            </div>
                                        </div>
                                        <NavLink
                                            to="/Menu"
                                            className={activeMobileNavClass}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Utensils className="w-5 h-5" />
                                            <span>Menu</span>
                                        </NavLink>
                                        <NavLink
                                            to="/foodform"
                                            className={activeMobileNavClass}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Utensils className="w-5 h-5" />
                                            <span>Add Menu</span>
                                        </NavLink>

                                        {/* Mobile Subscription Button - Only show if not subscribed */}
                                        {!subs && (
                                            <button
                                                onClick={handleSubscribe}
                                                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-linear-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white rounded-lg font-medium transition-all duration-300 shadow-lg"
                                            >
                                                <Crown className="w-5 h-5" />
                                                <span>Upgrade to Premium</span>
                                                <Sparkles className="w-5 h-5" />
                                            </button>
                                        )}

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