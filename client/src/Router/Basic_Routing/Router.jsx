
import { Route, Routes } from 'react-router-dom';
import HomeRouter from '../Template/HomeRouter';
import ChooseEmailTemplate from '../../views/Home/ChooseEmailTemplate';
import JobOpening from '../../UserCode/JobOpeningForward/JobOpening';
import ExcelImport from '../../UserCode/ExcelImport/ExcelImport';
import NotFound from '../../Components/NotFound/NotFound';


const Router = () => {
   return (
      <div>

         {/* Routes Templates  */}
         <Routes>
            <Route path="/" element={<HomeRouter />}> 
               <Route index element={<ChooseEmailTemplate />} />

               {/* Routes for each template  */}
               <Route path="/templates/referral" element={<ChooseEmailTemplate />} />
               <Route path="/templates/job-opening" element={<JobOpening />} />               
               <Route path="/templates/after-job-apply" element={<ChooseEmailTemplate />} />
               <Route path='/templates/load-excel' element={<ExcelImport />} />

               {/* Routes for each template  */}
               <Route path='*' element={<NotFound />} />
            </Route>
         </Routes>
         
      </div>
   );
}

export default Router;
