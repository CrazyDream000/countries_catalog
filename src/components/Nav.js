import {Link} from 'react-router-dom'

function Nav() {
    return (
        <div className="fixed w-full px-4 sm:px-10 py-4 flex flex-row justify-between bg-slate-800 text-white z-[200]">
            <div className='logo text-md md:text-xl font-bold'>Countries Catalog</div>
            <div className='menu-bar  text-md md:text-lg flex gap-4'>
                <Link className='transition delay-[40] hover:text-yellow-300' to='/'>Home</Link>
                <Link className='transition delay-[40] hover:text-yellow-300' to='/all'>Catalog</Link>
            </div>
        </div>
    );
  }
  
  export default Nav;





