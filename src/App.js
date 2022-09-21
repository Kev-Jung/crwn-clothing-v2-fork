import Home from "./routes/Home/home.component";
import Navigation from "./routes/Navigation/navigation.components";
import { Routes, Route } from "react-router-dom";
import SignIn from "./routes/Sign-in/sign-in.component";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Home />}/>
        <Route path='sign-in' element={<SignIn />}/>
      </Route>
    </Routes>
  )
};

export default App;
