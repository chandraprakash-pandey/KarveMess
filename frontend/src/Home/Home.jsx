import React from 'react';
import { UtensilsCrossed, Clock, Calendar, Users, ArrowRight, CheckCircle, Sparkles, Bell, Shield } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function Home() {
    const features = [
        { 
            icon: Clock, 
            title: 'Real-Time Updates', 
            desc: 'Get instant notifications when the daily menu is posted',
            color: 'from-blue-500 to-blue-600'
        },
        { 
            icon: Users, 
            title: 'Student Friendly', 
            desc: 'Access the menu from anywhere on campus or at home',
            color: 'from-purple-500 to-purple-600'
        },
        { 
            icon: Calendar, 
            title: 'Daily Fresh Menu', 
            desc: 'New menu posted every morning with detailed meal info',
            color: 'from-green-500 to-green-600'
        },
        { 
            icon: Shield, 
            title: 'Always Accurate', 
            desc: 'Direct updates from mess management ensure reliability',
            color: 'from-orange-500 to-orange-600'
        }
    ];

    const stats = [
        { number: '500+', label: 'Active Students' },
        { number: '3', label: 'Daily Meals' },
        { number: '100%', label: 'Updated Daily' }
    ];

    return (
        <div className='min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-red-50'>
            {/* Hero Section */}
            <div className='container mx-auto px-4 py-16 md:py-24'>
                <div className='text-center mb-20'>
                    <div className='flex justify-center mb-8 animate-bounce'>
                        <div className='bg-linear-to-br from-orange-500 to-red-600 p-6 rounded-2xl shadow-2xl'>
                            <UtensilsCrossed className='w-16 h-16 text-white' />
                        </div>
                    </div>
                    
                    <div className='mb-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md'>
                        <Sparkles className='w-4 h-4 text-orange-500' />
                        <span className='text-sm font-semibold text-gray-700'>Your Campus Dining Companion</span>
                    </div>
                    
                    <h1 className='text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight'>
                        Campus Mess
                        <span className='block bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent'>
                            Management
                        </span>
                    </h1>
                    
                    <p className='text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed'>
                        Never wonder what's for lunch again. Check today's menu instantly, plan your meals, and stay updated with real-time notifications.
                    </p>
                    
                    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                        <NavLink 
                            to="/Menu" 
                            className='bg-linear-to-r from-orange-500 to-red-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3 group'
                        >
                            View Today's Menu 
                            <ArrowRight className='w-6 h-6 group-hover:translate-x-1 transition-transform' />
                        </NavLink>
                        <NavLink 
                            to="/Signup" 
                            className='bg-white text-gray-800 px-10 py-4 rounded-xl font-bold text-lg border-2 border-gray-200 hover:border-orange-500 hover:shadow-xl hover:scale-105 transition-all'
                        >
                            Owner Login
                        </NavLink>
                    </div>
                </div>

                {/* Stats Section */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto'>
                    {stats.map((stat, idx) => (
                        <div key={idx} className='bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-shadow'>
                            <div className='text-5xl font-bold bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-2'>
                                {stat.number}
                            </div>
                            <div className='text-gray-600 font-medium'>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div className='mb-20'>
                    <div className='text-center mb-12'>
                        <h2 className='text-4xl font-bold text-gray-900 mb-4'>Why Students Love It</h2>
                        <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
                            Everything you need to stay informed about your daily meals
                        </p>
                    </div>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {features.map((feature, idx) => (
                            <div 
                                key={idx} 
                                className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group'
                            >
                                <div className={`bg-linear-to-br ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md`}>
                                    <feature.icon className='w-7 h-7 text-white' />
                                </div>
                                <h3 className='font-bold text-xl text-gray-900 mb-3'>{feature.title}</h3>
                                <p className='text-gray-600 leading-relaxed'>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className='bg-linear-to-r from-orange-500 to-red-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl'>
                    <Bell className='w-12 h-12 text-white mx-auto mb-6' />
                    <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
                        Never Miss A Meal Update
                    </h2>
                    <p className='text-xl text-orange-50 mb-8 max-w-2xl mx-auto'>
                        Get started today and join hundreds of students who check their mess menu online
                    </p>
                    <NavLink 
                        to="/Menu"
                        className='inline-block bg-white text-orange-600 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all'
                    >
                        Check Today's Menu
                    </NavLink>
                </div>

                {/* Footer Info */}
                <div className='text-center mt-16 text-gray-600'>
                    <p className='text-base mb-2'>Menu is updated daily by the mess management team</p>
                    <p className='text-base'>Have feedback or suggestions? Contact the mess office</p>
                </div>
            </div>
        </div>
    );
}

export default Home;