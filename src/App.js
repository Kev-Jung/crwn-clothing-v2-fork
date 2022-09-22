import Home from "./routes/Home/home.component";
import Navigation from "./routes/Navigation/navigation.components";
import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/Authentication/authentication.component";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Home />}/>
        <Route path='auth' element={<Authentication />}/>
      </Route>
    </Routes>
  )
};

export default App;
