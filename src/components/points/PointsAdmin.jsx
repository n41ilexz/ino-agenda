import "../StatsDash.css";
import { db } from "../../../api/firebase.js";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import Select from "react-select";
import { auth } from "../../../api/firebase.js";

function StatsAdmin() {
  const [membersList, setMembersList] = useState([]);
  const [updatedPoints, setUpdatedPoints] = useState({});
  const [updatedLogs, setUpdatedLogs] = useState({});
  const [initialPoints, setInitialPoints] = useState({});

  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberPoints, setNewMemberPoints] = useState(0);
  const [newMemberPassword, setNewMemberPassword] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");

  const roles = [
    { value: "admin", label: "admin" },
    { value: "sef departament", label: "sef departament" },
    { value: "membru", label: "membru" },
    { value: "voluntar", label: "voluntar" },
  ];
  const [selectedRole, setSelectedRole] = useState([0]);

  const newMemberLogs = [
    `first log - created @ ${new Date().toLocaleDateString("ro-RO")}`,
  ];
  const [newMemberHours, setNewMemberHours] = useState(0);

  const membersRef = collection(db, "members");

  const getMembers = async () => {
    try {
      const data = await getDocs(membersRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMembersList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  const addMembers = async () => {
    try {
      getMembers();
      const nameExists = membersList.some(
        (membru) => membru.name.toLowerCase() === newMemberName.toLowerCase()
      );
      if (nameExists) {
        alert(`Nume deja folosit: ${newMemberName}`);
        return;
      }
      if (newMemberName === "") {
        alert("Membrul nu are nume!");
        return;
      }

      const userUID = await createUserWithEmailAndPassword(
        auth,
        newMemberEmail,
        newMemberPassword
      );
      const user = userUID.user;
      await signOut(auth);

      setDoc(doc(db, "members", user.uid), {
        points: newMemberPoints,
        name: newMemberName,
        hours: newMemberHours,
        logs: newMemberLogs,
        role: selectedRole.value,
        email: newMemberEmail,
      });

      setNewMemberHours(0);
      setNewMemberName("");
      setNewMemberPoints(0);
      setSelectedRole([0]);
      setNewMemberEmail("");
      setNewMemberPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMember = async (id) => {
    const memberDoc = doc(db, "members", id);
    await deleteDoc(memberDoc);
  };
  const updateMembers = async (id) => {
    const memberDoc = doc(db, "members", id);
    const newPoints = updatedPoints[id];
    const logMessage = updatedLogs[id];

    if (newPoints !== undefined) {
      try {
        await updateDoc(memberDoc, {
          logs: arrayUnion(
            `${new Date().toLocaleDateString("ro-RO")} - ${
              newPoints - initialPoints[id]
            } puncte - ${logMessage.trim()}`
          ),
          points: Number(newPoints),
        });
        getMembers();
      } catch (err) {
        console.error("Eroare la update:", err);
      }

      getMembers();
    }
  };

  useEffect(() => {
    getMembers();
  });

  return (
    <div className="container">
      <h2 className="title">Listă membri</h2>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Nume</th>
              <th>Puncte</th>
              <th>Ore</th>
              <th>Grad</th>
              <th>Editează Puncte</th>
              <th>Log motiv</th>
              <th>Salvează</th>
              <th>Șterge</th>
            </tr>
          </thead>
          <tbody>
            {membersList.map((membru) => (
              <tr key={membru.id}>
                <td>{membru.name}</td>
                <td>{membru.points}</td>
                <td>{membru.hours}</td>
                <td>{membru.role}</td>
                <td>
                  <input
                    type="number"
                    placeholder="puncte"
                    value={updatedPoints[membru.id] ?? membru.points}
                    onChange={(e) => {
                      setInitialPoints({
                        ...initialPoints,
                        [membru.id]: membru.points,
                      });
                      setUpdatedPoints({
                        ...updatedPoints,
                        [membru.id]: e.target.value,
                      });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="motiv"
                    value={updatedLogs[membru.id] ?? ""}
                    onChange={(e) =>
                      setUpdatedLogs({
                        ...updatedLogs,
                        [membru.id]: `${e.target.value}`,
                      })
                    }
                  />
                </td>
                <td>
                  <button onClick={() => updateMembers(membru.id)}>
                    Salvează
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteMember(membru.id)}>
                    Șterge
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="addMember">
        <h2 className="title">Adaugă membru:</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Nume</th>
              <th>Ore</th>
              <th>Puncte</th>
              <th className="w-[100%]">Rol</th>
              <th>Email</th>
              <th>Parolă</th>
              <th>Adaugă</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  className="w-[100%]"
                  type="text"
                  placeholder="nume"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                />
              </td>
              <td>
                <input
                  className="w-[100%]"
                  type="number"
                  placeholder="ore"
                  value={newMemberHours}
                  onChange={(e) => setNewMemberHours(e.target.value)}
                />
              </td>
              <td>
                <input
                  className="w-[100%]"
                  type="number"
                  placeholder="puncte"
                  value={newMemberPoints}
                  onChange={(e) => setNewMemberPoints(e.target.value)}
                />
              </td>
              <td>
                <Select
                  className="w-[100%]"
                  options={roles}
                  value={selectedRole}
                  onChange={setSelectedRole}
                  placeholder="Alege un rol"
                />
              </td>
              <td>
                <input
                  className="w-[100%]"
                  type="email"
                  placeholder="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                />
              </td>
              <td>
                <input
                  className="w-[100%]"
                  type="password"
                  placeholder="parolă"
                  value={newMemberPassword}
                  onChange={(e) => setNewMemberPassword(e.target.value)}
                />
              </td>
              <td>
                <button className="w-[100%]" onClick={() => addMembers()}>
                  Adaugă
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StatsAdmin;
