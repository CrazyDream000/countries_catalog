import {Link} from 'react-router-dom'

function Nav() {
    return (
      <div className=' '>
        <div className="w-full px-4 sm:px-10 py-4 flex flex-row justify-between bg-slate-800 text-white">
            <div className='logo text-xl font-bold'>Countries Catalog</div>
            <div className='menu-bar text-lg flex gap-4'>
                <Link className='transition delay-[40] hover:text-yellow-300' to='/'>Home</Link>
                <Link className='transition delay-[40] hover:text-yellow-300' to='/all'>Catalog</Link>
            </div>
        </div>
      </div>
    );
  }
  
  export default Nav;





