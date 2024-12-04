import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';

import App from './App.jsx'
import axios from 'axios'


axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;
axios.defaults.proxy = true;

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
