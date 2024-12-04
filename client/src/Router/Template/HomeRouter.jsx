


import { Outlet } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';

const HomeRouter = () => {
   return (
      <div>

         <header>
            <Navbar />
         </header>

         <main>
            <Outlet />
         </main>
         
      </div>
   );
}

export default HomeRouter;
