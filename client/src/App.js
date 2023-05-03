import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import TopBar from "./components/topbar/TopBar";
import Register from "./pages/register/Register";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";


function App() {
  const {user} = useContext(Context);
  return (
      <Router>
        <TopBar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          {/* by default the value of the user is true if the user is alredy exist don't go to the register page go to the home page ....  */}
          <Route exact path="/register" element={user ? <Home/> : <Register />}></Route>
          <Route exact path="/login" element={user ? <Home/> : <Login />}></Route>
          <Route exact path="/write" element={user ? <Write/> : <Register />}></Route>
          <Route exact path="/settings" element={user ? <Settings/> : <Register />}></Route>
          <Route exact path="/post/:postId" element={<Single />}></Route>
        </Routes>
      </Router>
  );
}

export default App;
