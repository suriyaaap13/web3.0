import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import logo from '../../images/logo.png';
import { useState } from 'react';




const Navbar = () => {

  const [toggleMenu, setToggleMenu] = useState(false);

  const NavbarItem = ({title, classProps}) => {
    return (
      <li className={`mx-4 cursor-pointer ${classProps}`}>
        {title}
      </li>
    )
  }

  const arr = ['Market', 'Exchange', 'Tutorials', 'Wallets'];

  const renderedNavItems = arr.map((element, index)=>{
    return <NavbarItem key={ element+index } title = {element} />
  })

  return (
    <nav className='w-full flex md:justify-center justify-between items-center p-4'>
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
        <img src={logo} alt="logo" className='w-32 cursor-pointer'/>
      </div>
      <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial '>
        {renderedNavItems}
        <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
          Login
        </li>
      </ul>
      <div className='flex relative'>
        {toggleMenu ? <AiOutlineClose fontSize={28} className = 'text-white md:hidden cursor-pointer' onClick={()=>setToggleMenu(!toggleMenu)}/> : <HiMenuAlt4 fontSize={28} className = 'text-white md:hidden cursor-pointer' onClick={()=>setToggleMenu(!toggleMenu)}/>}
        {toggleMenu && (
          <ul className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in text-white'>
            <li className='text-xl w-full my-2'>
              <AiOutlineClose fontSize={28} className = 'text-white md:hidden cursor-pointer mb-6' onClick={()=>setToggleMenu(!toggleMenu)}/>
            </li>
            {arr.map((element, index)=>{
                return <NavbarItem key={ element+index } title = {element} classProps = 'my-4 text-lg' />
              })}
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar;