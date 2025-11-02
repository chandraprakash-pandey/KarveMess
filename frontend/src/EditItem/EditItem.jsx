import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Trash2, UtensilsCrossed, Save, ArrowLeft, AlertTriangle } from "lucide-react";

function EditItem() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [foods, setFoods] = useState([{ name: "", price: "" }]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const itemId = useParams().foodItemId;

    useEffect(() => {
        axios.get("http://localhost:8000/user", { withCredentials: true })
            .then(res => setUser(res.data))
            .catch(err => {
                if (err.response?.status === 401) {
                    window.location.href = "/Login";
                }
            });
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8000/editItem/${itemId}`, { withCredentials: true })
            .then(res => {
                setFoods(Object.entries(res.data.item).map(([name, price]) => ({ name, price })));
            })
            .catch(err => {
                console.error(err);
            });
    }, [itemId]);

    const addFood = () => {
        setFoods([...foods, { name: "", price: "" }]);
    };

    const removeFood = (index) => {
        if (foods.length > 1) {
            setFoods(foods.filter((_, i) => i !== index));
        }
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedFoods = [...foods];
        updatedFoods[index][name] = value;
        setFoods(updatedFoods);
    };

    const deleteItem = () => {
        axios.delete(`http://localhost:8000/editItem/${itemId}`, { withCredentials: true })
            .then(res => {
                console.log("Item deleted successfully");
                navigate("/Menu");
            })
            .catch(err => {
                console.error(err);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const itemsMap = {};
        foods.forEach(food => {
            if (food.name.trim() !== "") {
                itemsMap[food.name] = Number(food.price);
            }
        });

        const payload = {
            item: itemsMap,
        };

        console.log(payload);
        

        axios.patch(`http://localhost:8000/editItem/${itemId}`, payload, { withCredentials: true })
            .then(res => {
                console.log(payload);
                navigate("/Menu");
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-red-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}

                {/* Main Card */}
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-linear-to-r from-orange-500 to-red-500 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
                        
                        <div className="relative">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                                    <UtensilsCrossed className="w-8 h-8" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-center mb-2">Edit Menu Items</h2>
                            <p className="text-center text-orange-100">Update your delicious menu offerings</p>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Food Items List */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Menu Items</h3>
                                {foods.map((food, index) => (
                                    <div
                                        key={index}
                                        className="bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-5 border-2 border-orange-200 hover:border-orange-300 hover:shadow-md transition-all duration-200"
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Item Number Badge */}
                                            <div className="shrink-0 w-10 h-10 bg-linear-to-br from-orange-500 to-red-500 text-white rounded-xl flex items-center justify-center font-bold shadow-md">
                                                {index + 1}
                                            </div>

                                            {/* Food Name Input */}
                                            <div className="flex-1">
                                                <div className="relative">
                                                    <UtensilsCrossed className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        placeholder="Food Item Name (e.g., Paneer Butter Masala)"
                                                        value={food.name}
                                                        onChange={(e) => handleChange(index, e)}
                                                        className="w-full pl-11 pr-4 py-3 bg-white border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all outline-none"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Price Input */}
                                            <div className="w-36">
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold text-lg">
                                                        ₹
                                                    </span>
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        placeholder="Price"
                                                        value={food.price}
                                                        onChange={(e) => handleChange(index, e)}
                                                        className="w-full pl-9 pr-4 py-3 bg-white border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all outline-none"
                                                        required
                                                        min="0"
                                                        step="0.01"
                                                    />
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                type="button"
                                                onClick={() => removeFood(index)}
                                                disabled={foods.length === 1}
                                                className={`shrink-0 p-3 rounded-xl transition-all ${
                                                    foods.length === 1
                                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                        : 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg active:scale-95'
                                                }`}
                                                title={foods.length === 1 ? "At least one item required" : "Remove item"}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add More Button */}
                            <button
                                type="button"
                                onClick={addFood}
                                className="w-full bg-linear-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-98"
                            >
                                <Plus className="w-5 h-5" />
                                Add Another Item
                            </button>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                {/* Save Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full bg-linear-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 md:col-span-2 ${
                                        isSubmitting
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl active:scale-98'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                                            Saving Changes...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Info Text */}
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                                <p className="text-sm text-blue-800 text-center">
                                    💡 <strong>Tip:</strong> Make sure all prices are accurate. Changes will be reflected immediately on your menu.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Delete Section */}
                <div className="mt-8 bg-white shadow-lg rounded-2xl p-6 border-2 border-red-200">
                    <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Danger Zone</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Permanently delete this item from your menu. This action cannot be undone.
                            </p>
                            
                            {!showDeleteConfirm ? (
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
                                >
                                    <Trash2 className="w-5 h-5" />
                                    Delete Item
                                </button>
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-sm font-semibold text-red-600">
                                        Are you sure? This action cannot be undone!
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={deleteItem}
                                            className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg active:scale-95"
                                        >
                                            Yes, Delete
                                        </button>
                                        <button
                                            onClick={() => setShowDeleteConfirm(false)}
                                            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-400 transition-all active:scale-95"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditItem;