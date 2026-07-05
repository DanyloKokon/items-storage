import { BrowserRouter, Route, Routes } from "react-router";
import Home from './Pages/Home';
import SingUp from "./Pages/Login-sing";
import Login from "./Pages/Login";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/items-storage" element={<Home/>}/>
        <Route path="/items-storage/account/singup" element={<SingUp/>}/>
        <Route path="/items-storage/account/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
