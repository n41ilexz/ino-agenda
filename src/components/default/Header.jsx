import { Outlet, Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../api/firebase"; // ajustează calea dacă este diferită

function NavItem({ children }) {
  return (
    <div className="bg-white rounded px-4 py-1 min-h-[2.5rem] flex items-center transition-all duration-300 ease-in-out hover:bg-[#e0d4ff]">
      {children}
    </div>
  );
}

function Header({ isUserSigned }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // după logout, revine la homepage
    } catch (error) {
      console.error("Eroare la delogare:", error);
    }
  };

  return (
    <div>
      <header className="font-['Inter'] flex items-center p-2 justify-between w-full bg-[#6845AA]">
        <h1 className="text-xl font-bold text-white">InoAgenda</h1>
        <nav className="flex space-x-6 font-medium">
          <NavItem>
            <Link to="/" className="text-[#442063] hover:text-[#6845AA]">
              Acasă
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/admin" className="text-[#442063] hover:text-[#6845AA]">
              Admin
            </Link>
          </NavItem>
          <NavItem>
            {isUserSigned ? (
              <button
                onClick={handleLogout}
                className="text-[#442063] hover:text-[#6845AA]"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-[#442063] hover:text-[#6845AA]">
                Login
              </Link>
            )}
          </NavItem>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default Header;
