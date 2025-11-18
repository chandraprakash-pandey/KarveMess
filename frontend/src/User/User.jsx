import React, { useEffect, useState } from 'react'
import axios from "axios"
import { NavLink } from "react-router-dom"
import { User, Mail, MapPin, Home, ChefHat, Edit3, Package, Crown, Star, Sparkles } from 'lucide-react'

function UserDashboard() {
    const [user, setUser] = useState({});
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subs, setSubs] = useState(false);

    useEffect(() => {
        const hasReloaded = sessionStorage.getItem("hasReloaded");
        if (!hasReloaded) {
          sessionStorage.setItem("hasReloaded", "true");
          window.location.reload();
        }
      }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/user", { withCredentials: true })
            .then(res => {
                setUser(res.data);
                console.log(res.data.subscribed);
                
                if(res.data.subscribed){
                    setSubs(true);
                    console.log("hi");
                    
                }
                setLoading(false);
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    window.location.href = "/Login";
                }
                setLoading(false);
            });
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8000/myItems", { withCredentials: true })
            .then(res => setFoodItems(res.data))
            .catch(err => {
                if (err.response?.status === 401) {
                    window.location.href = "/Login";
                }
            });
    }, []);
    

    if (loading) {
        return (
            <div className={`min-h-screen ${subs ? 'bg-linear-to-br from-purple-900 via-indigo-900 to-blue-900' : 'bg-linear-to-br from-orange-50 to-amber-50'} flex items-center justify-center`}>
                <div className={`animate-spin rounded-full h-16 w-16 border-t-4 ${subs ? 'border-yellow-400' : 'border-orange-500'}`}></div>
            </div>
        );
    }

    // Premium/Subscribed UI
    if (subs) {
        return (
            <div className="min-h-screen bg-linear-to-br from-purple-900 via-indigo-900 to-blue-900 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Premium Header */}
                    <div className="mb-8 relative">
                        <div className="absolute top-0 right-0">
                            <div className="flex items-center bg-linear-to-r from-yellow-400 to-amber-500 px-4 py-2 rounded-full shadow-lg">
                                <Crown className="w-5 h-5 text-white mr-2" />
                                <span className="text-white font-bold">Premium Member</span>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                            Dashboard
                            <Sparkles className="w-8 h-8 text-yellow-400 ml-3 animate-pulse" />
                        </h1>
                        <p className="text-purple-200">Welcome to your premium experience</p>
                    </div>

                    {/* Premium User Profile Card */}
                    <div className="bg-linear-to-br from-purple-800 to-indigo-900 rounded-2xl shadow-2xl p-8 mb-8 border-2 border-yellow-400/30 relative overflow-hidden">
                        {/* Animated background effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
                        
                        <div className="flex items-center mb-6 relative z-10">
                            <div className="w-16 h-16 bg-linear-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-yellow-400/30">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <div className="ml-4">
                                <div className="flex items-center">
                                    <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
                                    <Crown className="w-6 h-6 text-yellow-400 ml-2" />
                                </div>
                                <div className="flex items-center mt-1">
                                    <p className="text-purple-200">Premium Mess Owner</p>
                                    <div className="flex ml-2">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                            <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                                <Mail className="w-5 h-5 text-yellow-400 mr-3" />
                                <div>
                                    <p className="text-xs text-purple-200 font-medium">Email</p>
                                    <p className="text-white font-medium">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                                <Home className="w-5 h-5 text-yellow-400 mr-3" />
                                <div>
                                    <p className="text-xs text-purple-200 font-medium">Mess Name</p>
                                    <p className="text-white font-medium">{user.messName}</p>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 md:col-span-2">
                                <MapPin className="w-5 h-5 text-yellow-400 mr-3" />
                                <div>
                                    <p className="text-xs text-purple-200 font-medium">Address</p>
                                    <p className="text-white font-medium">{user.messAddress}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Premium Food Items Section */}
                    <div className="bg-linear-to-br from-purple-800 to-indigo-900 rounded-2xl shadow-2xl p-8 border-2 border-yellow-400/30">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <Package className="w-6 h-6 text-yellow-400 mr-3" />
                                <h2 className="text-2xl font-bold text-white">Your Premium Menu</h2>
                            </div>
                            <span className="bg-linear-to-r from-yellow-400 to-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                {foodItems.length} {foodItems.length === 1 ? 'Item' : 'Items'}
                            </span>
                        </div>

                        {foodItems.length === 0 ? (
                            <div className="text-center py-12">
                                <ChefHat className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                                <p className="text-white text-lg">No food items yet</p>
                                <p className="text-purple-200 text-sm">Add your first menu item to get started</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {foodItems.map((foodItem) => (
                                    <div 
                                        key={foodItem._id} 
                                        className="bg-linear-to-br from-white/10 to-purple-900/50 backdrop-blur-sm border-2 border-yellow-400/40 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:border-yellow-400 hover:scale-105"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-linear-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center shadow-lg">
                                                    <ChefHat className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-xs text-purple-200 font-medium">Chef ID</p>
                                                    <p className="text-sm text-white font-semibold">{foodItem.chefId}</p>
                                                </div>
                                            </div>
                                            <NavLink 
                                                to={`/${foodItem._id}`}
                                                className="flex items-center bg-linear-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg"
                                            >
                                                <Edit3 className="w-4 h-4 mr-2" />
                                                Edit
                                            </NavLink>
                                        </div>

                                        <div className="space-y-2">
                                            {Object.entries(foodItem.item).map(([name, price]) => (
                                                <div 
                                                    key={name}
                                                    className="flex items-center justify-between bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20"
                                                >
                                                    <span className="text-white font-medium">{name}</span>
                                                    <span className="text-yellow-400 font-bold">₹{price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Standard/Free UI
    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 to-amber-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
                </div>

                {/* User Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-orange-100">
                    <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <div className="ml-4">
                            <h2 className="text-2xl font-bold text-gray-800">{user.fullName}</h2>
                            <p className="text-gray-500">Mess Owner</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center p-4 bg-orange-50 rounded-xl">
                            <Mail className="w-5 h-5 text-orange-500 mr-3" />
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Email</p>
                                <p className="text-gray-800 font-medium">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-amber-50 rounded-xl">
                            <Home className="w-5 h-5 text-amber-600 mr-3" />
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Mess Name</p>
                                <p className="text-gray-800 font-medium">{user.messName}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-orange-50 rounded-xl md:col-span-2">
                            <MapPin className="w-5 h-5 text-orange-500 mr-3" />
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Address</p>
                                <p className="text-gray-800 font-medium">{user.messAddress}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Food Items Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <Package className="w-6 h-6 text-orange-500 mr-3" />
                            <h2 className="text-2xl font-bold text-gray-800">Your Food Items</h2>
                        </div>
                        <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-semibold">
                            {foodItems.length} {foodItems.length === 1 ? 'Item' : 'Items'}
                        </span>
                    </div>

                    {foodItems.length === 0 ? (
                        <div className="text-center py-12">
                            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No food items yet</p>
                            <p className="text-gray-400 text-sm">Add your first menu item to get started</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {foodItems.map((foodItem) => (
                                <div 
                                    key={foodItem._id} 
                                    className="bg-linear-to-br from-white to-orange-50 border-2 border-orange-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-orange-300"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                                                <ChefHat className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-xs text-gray-500 font-medium">Chef ID</p>
                                                <p className="text-sm text-gray-700 font-semibold">{foodItem.chefId}</p>
                                            </div>
                                        </div>
                                        <NavLink 
                                            to={`/${foodItem._id}`}
                                            className="flex items-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                        >
                                            <Edit3 className="w-4 h-4 mr-2" />
                                            Edit
                                        </NavLink>
                                    </div>

                                    <div className="space-y-2">
                                        {Object.entries(foodItem.item).map(([name, price]) => (
                                            <div 
                                                key={name}
                                                className="flex items-center justify-between bg-white p-3 rounded-lg border border-orange-100"
                                            >
                                                <span className="text-gray-700 font-medium">{name}</span>
                                                <span className="text-orange-600 font-bold">₹{price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserDashboard