import "../StatsDash.css";  // poți folosi același CSS
import {db} from "../../../api/firebase.js"
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from "react";
function Stats() {

  const [membersList, setMembersList] = useState([]);

  const membersRef = collection(db, 'members')

  const getMembers = async ()=> {
    try{
      const data = await getDocs(membersRef);
      const filteredData = data.docs.map((doc) => (
        {
          ...doc.data(),
          id: doc.id
        }))
      
        setMembersList(filteredData);
    } catch (err){
      console.log(err)
    }
  }

  membersList.sort((a,b) => a-b)
  membersList.slice(0,10);
  useEffect(() => {
    getMembers(), []
  })
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
            {
              membersList.map((membru, i) => (
              <tr key={i}>
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
