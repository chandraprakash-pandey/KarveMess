import React from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'

function Days() {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const [searchParams] = useSearchParams()
    const currentDay = searchParams.get('day')
    
    return (
        <div className='w-full bg-[#4c218a] shadow-md shadow-2xs border-gray-200'>
            <div className='max-w-6xl mx-auto px-4'>
                <nav className='flex items-center justify-between gap-2 py-4 overflow-x-auto'>
                    {days.map(day => {
                        const isActive = currentDay === day.toLowerCase()
                        return (
                            <NavLink
                                key={day}
                                to={`?day=${day.toLowerCase()}`}
                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap
                                    ${isActive 
                                        ? 'bg-blue-600 text-white shadow-md' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                                    }`}
                            >
                                {day}
                            </NavLink>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}

export default Days