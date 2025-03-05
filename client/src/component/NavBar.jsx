import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdPerson } from "react-icons/io";
import { GiMiner } from "react-icons/gi";
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(state => state.user);
  const profile = useSelector(state => state.user.profile)
  //console.log(profile);
  return (
    <header className='mt-0 w-full h-auto p-2 bg-gray-600 flex items-center justify-between'>
      <nav className='flex w-full p-2 justify-between'>
        <div className='flex'>
        <ul className='flex items-center justify-start gap-2'>
          <li>
            <Link to="/">
              <GiMiner size={32} className='text-white hover:text-gray-700' />

            </Link>
          </li>
          <li className='hover:scale-105'>
            <Link to="/" className='text-white hover:scale-105'>Home</Link>
          </li>
        {
          user ?
          ( <li className='hover:scale-105'>
            <Link to="/todoform" className='text-white hover:scale-105'>Todos</Link>
          </li>): ("")
        }
        </ul>
        </div>
        <div className='flex items-center gap-2'>
          <Link to="/signup" className='text-white hover:scale-105'>Sign Up</Link>
          {
            !profile ?
            (<div className='w-10 h-10 rounded-full border-1 bg-white flex items-center justify-center cursor-pointer' >
             <IoMdPerson size={32} className='text-gray-400 hover:text-gray-700' />
          </div>):(
          <div className='w-10 h-10 rounded-full border-1 bg-white flex items-center justify-center cursor-pointer' >
             <img src={profile} alt="profile" className='rounded-full h-full w-full object-cover hover:shadow-md' />
          </div>)
          }
        </div>
      </nav>
    </header>
  )
}

export default NavBar
