import * as FaIcons from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// const [description, setDescription] = useState([]);
// const [email, seEmail] = useState([]);

function ViewComponent() {
  let { id } = useParams();
  const [tittle, setTittle] = useState([]);
  const [tittlename, setTittlename] = useState("");
  const [description, setDescription] = useState("");
  // const [email, seEmail] = useState([]);

  let getUser = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => {
        setTittle(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  };

  let getName = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        setTittlename(response.data.title);
        setDescription(response.data.body);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getName();
    getUser();
  }, []);

  return (
    <div className="container">
      <div className="mt-5">
        <h1>Posts</h1>
        <div className="card card-view">
          <div className="viewdesign mb-2 ms-2">
            <b>Tittle :</b>
            {tittlename}
          </div>
          <div className="viewdesign mb-2 ms-2">
            <b>Description:</b> {description}
          </div>
        </div>
        <h1 className="heading">Comments</h1>
        {tittle.map((item) => (
          <div className="card mb-3">
            <div className="card-body d-flex ">
              <div>
                <FaIcons.FaCommentDots
                  style={{ fontSize: "30px" }}
                  className="iconAlign2"
                />
              </div>
              <div>
                <div className="viewdesign1 mb-2 ms-2">
                  <b>{item.name}</b>
                </div>
                <div className="viewdesign2 mb-2 ms-2">{item.email}</div>
                <div className="viewdesign3 mb-2 ms-2">{item.body}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewComponent;
