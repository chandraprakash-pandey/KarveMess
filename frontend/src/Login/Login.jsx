import React, { useState,useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, LogIn, Eye, EyeOff } from "lucide-react";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    

    
    useEffect(() => {
        axios.get("http://localhost:8000/user", { withCredentials: true })
            .then(res => {
              window.location.href = "/User";
            })
    }, [])

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const res = await axios.post("http://localhost:8000/login", {
                email: formData.email,
                password: formData.password,
            }, {
                withCredentials: true,
            });

            console.log("Login successful:", res.data);
            navigate("/user");
        } catch (error) {
            console.error("Error logging in:", error);
            setErrors({ 
                submit: error.response?.data?.message || "Login failed. Please check your credentials." 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-red-50 py-12 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                            <LogIn className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                        <p className="text-gray-600 mt-2">Login to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-11 pr-4 py-3 border ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none`}
                                    placeholder="john@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-11 pr-12 py-3 border ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none`}
                                    placeholder="••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Error Message */}
                        {errors.submit && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {errors.submit}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                        >
                            {isLoading ? (
                                <span>Logging in...</span>
                            ) : (
                                <>
                                    <span>Log In</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Don't have an account?{" "}
                            <button
                                onClick={() => navigate("/signup")}
                                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                    <p className="text-gray-500 text-xs">
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;