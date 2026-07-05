import { BrowserRouter, Route, Routes } from "react-router";
import Home from './Pages/Home';
import SingUp from "./Pages/Login-sing";
import Login from "./Pages/Login";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/account/singup" element={<SingUp/>}/>
        <Route path="/account/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
