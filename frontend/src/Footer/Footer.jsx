import React from 'react';
import { UtensilsCrossed, Mail, Linkedin, Github, Heart } from 'lucide-react';

function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { name: 'View Menu', path: '/menu' },
            { name: 'Owner Login', path: '/signup' },
            { name: 'Features', path: '#features' }
        ],
        support: [
            { name: 'Help Center', path: '#help' },
            { name: 'Contact Us', path: '#contact' },
            { name: 'FAQs', path: '#faq' }
        ],
        legal: [
            { name: 'Privacy Policy', path: '#privacy' },
            { name: 'Terms of Service', path: '#terms' },
            { name: 'Cookie Policy', path: '#cookies' }
        ]
    };

    return (
        <footer className='bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300'>
            <div className='container mx-auto px-4 py-12'>
                {/* Main Footer Content */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
                    {/* Brand Section */}
                    <div className='lg:col-span-1'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='bg-linear-to-br from-orange-500 to-red-600 p-3 rounded-xl'>
                                <UtensilsCrossed className='w-6 h-6 text-white' />
                            </div>
                            <span className='text-2xl font-bold text-white'>MessHub</span>
                        </div>
                        <p className='text-gray-400 mb-4 leading-relaxed'>
                            Your trusted campus mess management system. Stay updated with daily menus and never miss a meal.
                        </p>
                        <div className='flex gap-3'>
                            <a 
                                href='mailto:cp.o.pandey@gmail.com'
                                className='bg-gray-800 p-3 rounded-lg hover:bg-orange-600 transition-colors group'
                                aria-label='Email'
                            >
                                <Mail className='w-5 h-5 text-gray-400 group-hover:text-white' />
                            </a>
                            <a 
                                href='https://www.linkedin.com/in/chandraprakash-pandey/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-colors group'
                                aria-label='LinkedIn'
                            >
                                <Linkedin className='w-5 h-5 text-gray-400 group-hover:text-white' />
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className='text-white font-bold text-lg mb-4'>Product</h3>
                        <ul className='space-y-3'>
                            {footerLinks.product.map((link, idx) => (
                                <li key={idx}>
                                    <a 
                                        href={link.path}
                                        className='text-gray-400 hover:text-orange-500 transition-colors inline-flex items-center group'
                                    >
                                        <span className='group-hover:translate-x-1 transition-transform'>{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className='text-white font-bold text-lg mb-4'>Support</h3>
                        <ul className='space-y-3'>
                            {footerLinks.support.map((link, idx) => (
                                <li key={idx}>
                                    <a 
                                        href={link.path}
                                        className='text-gray-400 hover:text-orange-500 transition-colors inline-flex items-center group'
                                    >
                                        <span className='group-hover:translate-x-1 transition-transform'>{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className='text-white font-bold text-lg mb-4'>Legal</h3>
                        <ul className='space-y-3'>
                            {footerLinks.legal.map((link, idx) => (
                                <li key={idx}>
                                    <a 
                                        href={link.path}
                                        className='text-gray-400 hover:text-orange-500 transition-colors inline-flex items-center group'
                                    >
                                        <span className='group-hover:translate-x-1 transition-transform'>{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className='border-t border-gray-700 my-8'></div>

                {/* Bottom Footer */}
                <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                    <p className='text-gray-400 text-sm text-center md:text-left'>
                        © {currentYear} Mess Management System. All rights reserved.
                    </p>
                    <p className='text-gray-400 text-sm flex items-center gap-2'>
                        Made with <Heart className='w-4 h-4 text-red-500 fill-red-500' /> by 
                        <a 
                            href='https://www.linkedin.com/in/chandraprakash-pandey/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-orange-500 hover:text-orange-400 font-semibold transition-colors'
                        >
                            Chandraprakash Pandey
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;