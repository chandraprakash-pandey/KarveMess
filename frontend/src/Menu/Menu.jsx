import React, { useEffect, useState } from 'react';
import { ChefHat, UtensilsCrossed, Sparkles } from 'lucide-react';

function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch("http://localhost:8000/menu");
                const data = await response.json();
                setMenuItems(data);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-orange-600 font-medium">Loading delicious items...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <UtensilsCrossed className="w-12 h-12 text-orange-600 mr-3" />
                        <h1 className="text-5xl font-bold text-gray-800">Our Menu</h1>
                        <Sparkles className="w-12 h-12 text-orange-600 ml-3" />
                    </div>
                    <p className="text-gray-600 text-lg">Crafted with love by our talented chefs</p>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {menuItems.map((f, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-orange-100 hover:scale-105"
                        >
                            {/* Chef Header */}
                            <div className="bg-linear-to-r from-orange-500 to-red-500 p-6 text-white">
                                <div className="flex items-center">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
                                        <ChefHat className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium opacity-90">Prepared by</p>
                                        <h3 className="text-2xl font-bold">{f.chefId.fullName}</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="p-6">
                                <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                                    Specialties
                                </h4>
                                <ul className="space-y-3">
                                    {Object.entries(f.item).map(([name, price]) => (
                                        <li 
                                            key={name}
                                            className="flex justify-between items-center p-3 rounded-lg hover:bg-orange-50 transition-colors duration-200 group"
                                        >
                                            <span className="text-gray-700 font-medium group-hover:text-orange-600 transition-colors">
                                                {name}
                                            </span>
                                            <span className="text-orange-600 font-bold text-lg">
                                                ₹{price}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Decorative Bottom */}
                            <div className="h-2 bg-linear-to-r from-orange-400 via-red-400 to-orange-400"></div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {menuItems.length === 0 && (
                    <div className="text-center py-20">
                        <UtensilsCrossed className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-xl">No menu items available at the moment</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Menu;