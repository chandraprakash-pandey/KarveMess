import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus, Trash2, UtensilsCrossed, DollarSign, Save, ArrowLeft, Crown, Sparkles, Star, Zap, Search } from "lucide-react";
import Days from "./Days";

function FoodForm() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [foods, setFoods] = useState([{ name: "", price: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subs, setSubs] = useState(false);
  const [loading, setLoading] = useState(true);
  const {search, pathname} = useLocation();
  const params = new URLSearchParams(search);
  const day = params.get("day");

  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const todayDay_index = new Date();
  const todayDay = days[todayDay_index.getDay()];
  

  console.log("day", day);
  
  useEffect(() => {
    axios.get("http://localhost:8000/user", { withCredentials: true })
      .then(res => {
        setUser(res.data);
        if(res.data.subscribed){
          setSubs(true);
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
      day,
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

  if (loading) {
    return (
      <div className={`min-h-screen ${subs ? 'bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50'} flex items-center justify-center`}>
        <div className={`animate-spin rounded-full h-16 w-16 border-t-4 ${subs ? 'border-yellow-400' : 'border-orange-500'}`}></div>
      </div>
    );
  }

  // Premium/Subscribed UI
  if (subs) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 px-4">
        <Days/>
        <div className="max-w-3xl mx-auto py-8">
          {/* Premium Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3 rounded-full shadow-2xl">
              <Crown className="w-5 h-5 text-white mr-2" />
              <span className="text-white font-bold">Premium Menu Creator</span>
              <Sparkles className="w-5 h-5 text-white ml-2 animate-pulse" />
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-gradient-to-br from-purple-800 to-indigo-900 shadow-2xl rounded-3xl overflow-hidden border-2 border-yellow-400/30 relative">
            {/* Animated background effect */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
            
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 p-8 text-white relative z-10">
              <div className="flex items-center justify-center mb-3">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm ring-4 ring-white/30 shadow-xl">
                  <UtensilsCrossed className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-center mb-2 flex items-center justify-center">
                Add Premium Menu Items
                <Star className="w-6 h-6 ml-2 fill-white animate-pulse" />
              </h2>
              <p className="text-center text-yellow-100">Create your exclusive menu offerings</p>
            </div>

            {/* Form Content */}
            <div className="p-8 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Food Items List */}
                <div className="space-y-4">
                  {foods.map((food, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-white/10 to-purple-900/50 backdrop-blur-sm rounded-xl p-4 border-2 border-yellow-400/40 hover:border-yellow-400 transition-all duration-200 hover:scale-102 shadow-lg"
                    >
                      <div className="flex items-center gap-3">
                        {/* Item Number Badge */}
                        <div className="shrink-0 w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                          {index + 1}
                        </div>

                        {/* Food Name Input */}
                        <div className="flex-1">
                          <div className="relative">
                            <UtensilsCrossed className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
                            <input
                              type="text"
                              name="name"
                              placeholder="Food Item Name (e.g., Paneer Butter Masala)"
                              value={food.name}
                              onChange={(e) => handleChange(index, e)}
                              className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-white placeholder-purple-200"
                              required
                            />
                          </div>
                        </div>

                        {/* Price Input */}
                        <div className="w-32">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 font-semibold">
                              ₹
                            </span>
                            <input
                              type="number"
                              name="price"
                              placeholder="Price"
                              value={food.price}
                              onChange={(e) => handleChange(index, e)}
                              className="w-full pl-8 pr-3 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-white placeholder-purple-200"
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
                              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
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
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  Add Another Premium Item
                  <Zap className="w-4 h-4" />
                </button>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-xl ${
                      isSubmitting
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:from-yellow-500 hover:to-amber-600 hover:shadow-2xl hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                        Saving Premium Menu...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Premium Menu Items
                        <Crown className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Info Text */}
                <p className="text-center text-sm text-purple-200 mt-4 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                  Premium members get priority listing and enhanced visibility!
                </p>
              </form>
            </div>
          </div>

          {/* Premium Tips Card */}
          <div className="mt-6 bg-gradient-to-br from-purple-800 to-indigo-900 rounded-2xl p-6 shadow-2xl border-2 border-yellow-400/30">
            <h3 className="font-bold text-white mb-3 flex items-center">
              <Crown className="w-5 h-5 text-yellow-400 mr-2" />
              Premium Features
            </h3>
            <ul className="space-y-2 text-sm text-purple-200">
              <li className="flex items-start">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-2 mt-0.5" />
                <span>Your menu appears at the top of search results</span>
              </li>
              <li className="flex items-start">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-2 mt-0.5" />
                <span>Get detailed analytics on customer preferences</span>
              </li>
              <li className="flex items-start">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-2 mt-0.5" />
                <span>Unlimited menu items with no restrictions</span>
              </li>
              <li className="flex items-start">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-2 mt-0.5" />
                <span>Premium badge displayed on all your listings</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  
  if(day != todayDay){
    navigate(`/foodform?day=${todayDay}`);
  }
  // Standard/Free UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Main Card */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
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
                    className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border-2 border-orange-200 hover:border-orange-300 transition-all duration-200"
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
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Add Another Item
              </button>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
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
          
          {/* Upgrade CTA */}
          <div className="mt-4 pt-4 border-t border-orange-100">
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800 flex items-center">
                    <Crown className="w-4 h-4 text-yellow-500 mr-2" />
                    Want more visibility?
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Upgrade to Premium for priority listing</p>
                </div>
                <button
                  onClick={() => navigate("/subscription")}
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodForm;