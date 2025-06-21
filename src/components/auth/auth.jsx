import { auth } from "../../../api/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return <Navigate to="/" replace />;
    } catch (err) {
      console.error(err);
    }
    
  };
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="table-wrapper">
        <h2 className="title">Autentificare</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Parolă</th>
              <th>Login</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="email"
                  placeholder="Email..."
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="password"
                  placeholder="Password..."
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
              <td>
                <button onClick={logIn}>Login</button>
              </td>
              <td>
                <button onClick={logout}>Logout</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
