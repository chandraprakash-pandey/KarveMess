import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Calendar, Check, Crown, Sparkles, Zap } from 'lucide-react';

function Subs() {
    const [User, setUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/user", { withCredentials: true })
            .then(res => setUser(res.data))
            .catch(err => {
                if (err.response?.status === 401) {
                    window.location.href = "/Login";
                }
            });
    }, []);

    const checkoutHandler = async () => {
        const amount = 10;
        const { data: keyData } = await axios.get("http://localhost:8000/api/getKey")
        const { key } = keyData;

        const { data: orderData } = await axios.post("http://localhost:8000/api/payment/process", {
            amount
        })

        const { order } = orderData;
        console.log(order);

        const options = {
            key, // Replace with your Razorpay key_id
            amount,
            currency: 'INR',
            name: 'Chandraprakash Pandey',
            description: 'Razorpay Integration Tutorial',
            order_id: order.id,
            callback_url: 'http://localhost:8000/api/paymentVerification', // Your success URL
            prefill: {
                name: 'Chandraprakash Pandey',
                email: 'pandey.kumar@example.com',
                contact: '9999999999'
            },
            theme: {
                color: '#F37254'
            },
        };

        const rzp = new Razorpay(options);
        rzp.open();
    }

    const features = [
        "Set weekly menu in advance",
        "Plan all dishes at once",
        "Schedule specific dishes for each day",
        "Save time with bulk menu management",
        "Edit anytime during the week",
        "Priority support"
    ];

    return (
        <div className='min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-red-50 py-16 px-4'>
            <div className='container mx-auto max-w-6xl'>
                {/* Header */}
                <div className='text-center mb-12'>
                    <div className='inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-4'>
                        <Sparkles className='w-4 h-4 text-orange-600' />
                        <span className='text-sm font-semibold text-orange-700'>Premium Feature</span>
                    </div>
                    <h1 className='text-5xl font-bold text-gray-900 mb-4'>
                        Upgrade Your Mess Management
                    </h1>
                    <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                        Plan your entire week's menu at once and save valuable time
                    </p>
                </div>

                {/* Subscription Card */}
                <div className='max-w-md mx-auto'>
                    <div className='bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-orange-200 relative'>
                        {/* Premium Badge */}
                        <div className='absolute top-6 right-6'>
                            <div className='bg-linear-to-r from-orange-500 to-red-600 p-2 rounded-full'>
                                <Crown className='w-6 h-6 text-white' />
                            </div>
                        </div>

                        <div className='p-8'>
                            {/* Plan Header */}
                            <div className='mb-8'>
                                <h2 className='text-3xl font-bold text-gray-900 mb-2'>Weekly Pro Plan</h2>
                                <p className='text-gray-600'>Perfect for efficient mess management</p>
                            </div>

                            {/* Pricing */}
                            <div className='mb-8 bg-linear-to-br from-orange-50 to-red-50 p-6 rounded-2xl'>
                                <div className='flex items-baseline gap-2'>
                                    <span className='text-5xl font-bold text-gray-900'>₹10</span>
                                    <span className='text-gray-600'>/week</span>
                                </div>
                                <p className='text-sm text-gray-600 mt-2'>Billed weekly • Cancel anytime</p>
                            </div>

                            {/* Features List */}
                            <div className='mb-8'>
                                <h3 className='font-bold text-lg text-gray-900 mb-4 flex items-center gap-2'>
                                    <Zap className='w-5 h-5 text-orange-600' />
                                    What's Included
                                </h3>
                                <ul className='space-y-3'>
                                    {features.map((feature, idx) => (
                                        <li key={idx} className='flex items-start gap-3'>
                                            <div className='bg-green-100 rounded-full p-1 mt-0.5'>
                                                <Check className='w-4 h-4 text-green-600' />
                                            </div>
                                            <span className='text-gray-700'>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Key Benefit Box */}
                            <div className='mb-8 bg-linear-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200'>
                                <div className='flex items-start gap-3'>
                                    <Calendar className='w-6 h-6 text-blue-600 mt-1' />
                                    <div>
                                        <h4 className='font-bold text-gray-900 mb-2'>Weekly Menu Planning</h4>
                                        <p className='text-sm text-gray-700 leading-relaxed'>
                                            Set your entire week's menu on Monday and forget about daily updates.
                                            Schedule breakfast, lunch, and dinner for all 7 days in one go.
                                            Make changes anytime with our flexible editing tools.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Subscribe Button */}
                            <button
                                onClick={() => checkoutHandler()}
                                className='w-full bg-linear-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2'
                            >
                                <Crown className='w-5 h-5' />
                                Subscribe Now
                            </button>

                            <p className='text-center text-xs text-gray-500 mt-4'>
                                Secure payment • Cancel anytime • No hidden fees
                            </p>
                        </div>
                    </div>

                    {/* Trust Badge */}
                    <div className='text-center mt-8 text-gray-600'>
                        <p className='text-sm'>
                            Trusted by 100+ mess owners • 4.9★ rating
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Subs;