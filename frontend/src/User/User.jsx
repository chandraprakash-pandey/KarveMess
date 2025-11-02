import React, { useEffect, useState } from 'react'
import axios from "axios"
import { NavLink } from "react-router-dom"
import { User, Mail, MapPin, Home, ChefHat, Edit3, Package } from 'lucide-react'

function UserDashboard() {
    const [user, setUser] = useState({});
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);

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
            <div className="min-h-screen bg-linear-to-br from-orange-50 to-amber-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
            </div>
        );
    }

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