'use client'

import React from 'react'
import Link from 'next/link'
import Pagebanner from '../../components/common/Pagebanner'

const locations = [
  {
    name: 'CANADA',
    img: 'https://cluckcluckschicken.com/admin/images/US.jpg',
    url: '/canada-locations', // Updated route
  },
  {
    name: 'UNITED STATES',
    img: 'https://cluckcluckschicken.com/admin/images/Canada.jpg',
    url: '/usa-locations', // Updated route
  },
]

export default function LocationFile() {
  return (
<>
<Pagebanner title='Locations'/>
    <div className="w-full px-4 sm:px-16 lg:px-32 flex flex-col sm:flex-row gap-8 justify-center items-center p-8">
      {locations.map(loc => (
        <Link
          key={loc.name}
          href={loc.url} // <-- Link ke liye "to"
          className="relative w-full sm:w-[600px] h-[250px] sm:h-[350px] rounded-3xl overflow-hidden shadow-lg flex items-center justify-center"
          style={{
            backgroundImage: `url(${loc.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textDecoration: 'none',
          }}
        >
          <span
            className="text-white font-bold text-3xl sm:text-5xl drop-shadow-lg tracking-[-0.06em] text-center"
            style={{
               fontFamily: '"MDNichrome", "Arial Black", "Helvetica Black", sans-serif',
                    textShadow: '4px 4px 0px rgba(137, 66, 6, 0.43)'
              
              
              
              }}
          >
            {loc.name}
          </span>
        </Link>
      ))}
    </div>

    </>
  )
}
