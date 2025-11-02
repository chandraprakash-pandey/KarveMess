import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, UtensilsCrossed, DollarSign, Save, ArrowLeft } from "lucide-react";

function FoodForm() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [foods, setFoods] = useState([{ name: "", price: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/user", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(err => {
        if (err.response?.status === 401) {
          window.location.href = "/Login";
        }
      });
  }, [])

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
      chefId: user._id,
      item: itemsMap,
    };

    axios.post("http://localhost:8000/fooditems", payload, { withCredentials: true })
      .then(res => {
        console.log("Food saved:", res.data);
        setFoods([{ name: "", price: "" }]);
        navigate("/Menu");
      })
      .catch(err => {
        console.error(err);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-red-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">


        {/* Main Card */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-orange-500 to-red-500 p-8 text-white">
            <div className="flex items-center justify-center mb-3">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <UtensilsCrossed className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center mb-2">Add Menu Items</h2>
            <p className="text-center text-orange-100">Create your delicious menu offerings</p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Food Items List */}
              <div className="space-y-4">
                {foods.map((food, index) => (
                  <div
                    key={index}
                    className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4 border-2 border-orange-200 hover:border-orange-300 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      {/* Item Number Badge */}
                      <div className="shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
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
                            className="w-full pl-11 pr-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                            required
                          />
                        </div>
                      </div>

                      {/* Price Input */}
                      <div className="w-32">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                            ₹
                          </span>
                          <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={food.price}
                            onChange={(e) => handleChange(index, e)}
                            className="w-full pl-8 pr-3 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                            required
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        type="button"
                        onClick={() => removeFood(index)}
                        disabled={foods.length === 1}
                        className={`shrink-0 p-3 rounded-lg transition-all ${
                          foods.length === 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg'
                        }`}
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
                className="w-full bg-linear-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Add Another Item
              </button>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-linear-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                      Saving Menu...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Menu Items
                    </>
                  )}
                </button>
              </div>

              {/* Info Text */}
              <p className="text-center text-sm text-gray-500 mt-4">
                💡 Add all your menu items and prices. You can always edit them later!
              </p>
            </form>
          </div>
        </div>

        {/* Quick Tips Card */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
            <span className="text-orange-500 mr-2">💡</span>
            Quick Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Use descriptive names for your dishes to attract customers</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Set competitive prices based on your local market</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Add at least 5-10 items to give customers variety</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FoodForm;