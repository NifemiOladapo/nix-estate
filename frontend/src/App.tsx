import { Route, Routes } from "react-router-dom";

import Profile from "./pages/Profile.js";
import Signup from "./pages/SignUp.js";
import SignIn from "./pages/SignIn.js";
import Home from "./pages/Home.js";
import About from "./pages/About.js";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;
