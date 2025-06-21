import Header from "./components/default/Header.jsx";
import Footer from "./components/default/Footer.jsx";
import Stats from "./components/points/Stats.jsx";
import StatsAdmin from "./components/points/PointsAdmin.jsx";
import { Auth } from "./components/auth/auth.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth} from "../api/firebase.js";
import { useEffect, useState } from "react";

function App() {
  const [isUserSigned, setIsUserSigned] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserSigned(!!user);
    });

    return () => unsubscribe();
  });

  return (
    <BrowserRouter>
      <div className="w-screen pr-2 pl-2 pt-2 pb-2">
        <Header isUserSigned={isUserSigned} />
        <Routes>
          <Route path="/" element={<Stats />} />
          <Route path="admin" element={<StatsAdmin />} />
          <Route path="login" element={<Auth />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}


export default App;
