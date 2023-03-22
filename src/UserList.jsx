import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  // const [ userId, getUserId] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
    // getPostId();
  }, []);

  // const getPostId = ()=>{
  //   Axios.get("https://jsonplaceholder.typicode.com/comments")
  //   .then((response)=> getUserId(response.data))
  // }

  function navigateToDash(id) {
    navigate(`dashboard/${id}`);
  }

  return (
    <div className="container">
      <h3 className="text-center mt-3">Users List</h3>
      <div className=" row justify-content-center align-items-center">
        <div className="col-4">
          <div className="card">
            <table className="table table-bordered table-light table-striped">
              <thead className="text-center">
                <tr>
                  <th scope="col">SI.NO</th>
                  <th scope="col">User Name</th>
                  <th scope="col">View</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item) => (
                  <tr
                    style={{ cursor: "pointer", margin: "10px" }}
                    key={item.id}
                  >
                    <th scope="row" className="text-center">
                      {item.id}
                    </th>
                    <td>{item.name}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => navigateToDash(item.id, item.userId)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <ol>
            {users.map((user) => (
              <li style={{ cursor: "pointer", margin: "10px" }} key={user.id}>
                <span onClick={() => navigateToDash(user.id)}>{user.name}</span>
              </li>
            ))}
          </ol> */}
        </div>
      </div>
      {/* {users.name} */}
    </div>
  );
}

export default UserList;
