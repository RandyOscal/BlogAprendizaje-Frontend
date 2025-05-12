import React from 'react'
import Escudo from "../assets/Escudo.png"
 
export const Navbar = () => {
return (
    <nav className='bg-blue-800 text-white py-2 px-5'>
        <div className='flex justify-between items-center min-w-full'>
            <img src={Escudo} alt="Escudo" className='w-14 h-auto ml-20'/>
            <span className='ml-auto'>
                <h4 className='text-lg font-bold'>Blog de Aprendizaje</h4>
            </span>
        </div>
    </nav>
)

}
