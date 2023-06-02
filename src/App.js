import { BrowserRouter, Link, Route, Routes,  } from 'react-router-dom';

import FormUser from "./FormUser";
import Home from "./Home";
import FormEdit from './FormEdit';
import UploadForm from './UploadForm';


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/add" element={<FormUser/>} />
        <Route path="/edit/:id" element={<FormEdit/>} />
        <Route path="/upload" element={<UploadForm/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
