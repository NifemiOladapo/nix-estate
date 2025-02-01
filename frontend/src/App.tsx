import { Route, Routes } from "react-router-dom";

import Profile from "./pages/Profile.js";
import Signup from "./pages/SignUp.js";
import SignIn from "./pages/SignIn.js";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Header from "./components/Header.js";
import PrivateRoute from "./components/PrivateRoute.js";
import CreateListing from "./pages/CreateListing.js";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
