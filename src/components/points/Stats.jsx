import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../../api/firebase.js";
import "../StatsDash.css";

function Stats() {
  const [membersList, setMembersList] = useState([]);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const data = await getDocs(collection(db, 'members'));
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));

        // Sortează după puncte (descrescător) și ia primele 15
        const sortedData = filteredData
          .sort((a, b) => b.points - a.points) // Ordine descrescătoare!
          .slice(0, 15);

        setMembersList(sortedData);
      } catch (err) {
        console.error(err);
      }
    };

    getMembers();
  }, []); // <- Array gol pentru a rula o singură dată

  return (
    <div className="container">
      <h2 className="title">Top 15 membri</h2>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Nume</th>
              <th>Puncte</th>
              <th>Ore</th>
            </tr>
          </thead>
          <tbody>
            {membersList.map((membru, i) => (
              <tr key={membru.id}> {/* Folosește `id` în loc de index pentru key! */}
                <td>{membru.name}</td>
                <td>{membru.points}</td>
                <td>{membru.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Stats;
