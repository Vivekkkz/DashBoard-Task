import React, { useEffect, useState } from "react";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function DashboardComponent() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [Todo, setTodos] = useState([]);
  let tempPosts = [];
  let tempComments = [];
  let tempTodo = 0;

  let getPosts = async () => {
    return await axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
      .then((response) => {
        tempPosts = response.data;
        setPosts(tempPosts);
        getComments();
      })
      .catch((error) => console.error(error));
  };

  let getComments = async () => {
    await axios
      .get(`https://jsonplaceholder.typicode.com/comments`)
      .then((response) => {
        var result = response.data;
        console.log("Test ", posts);
        let id_filter = posts.map((post) => post.id);
        console.log("POST IDS ", id_filter);

        tempComments = result.filter((comment) => {
          return id_filter.indexOf(comment.postId) !== -1;
        });

        console.log("FILTERED COMMNTS ", tempComments);
        setComments(tempComments);
      })
      .catch((error) => console.error(error));
  };

  const getTodo = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
      .then((response) => setTodos(response.data));
  };
  const navigatetoView = (id) => {
    navigate(`/view/${id}`);
  };
  useEffect(() => {
    getPosts();
    getTodo();
  }, []);

  return (
    <div className="container">
      <h2 style={{ marginTop: "20px" }}>Dashboard</h2>
      <div className="row mt-4 justify-content-between">
        <div className="col-2  ">
          <div className="row text-center" style={{ marginRight: "50px" }}>
            {" "}
          </div>
        </div>

        <div className="col-2">
          <div
            className="card card-top"
            style={{ backgroundColor: "#072E5C", color: "white" }}
          >
            <h4>POSTS</h4>
            <MdIcons.MdAddBox
              style={{ fontSize: "35px" }}
              className="iconAlign"
            />
            <h1 style={{ fontSize: "60px" }} className="numAlign">
              {posts?.length}
            </h1>
          </div>
        </div>
        <div className="col-2">
          <div
            className="card card-top "
            style={{ backgroundColor: "#115E9B", color: "white" }}
          >
            <h4>COMMENTS</h4>
            <FaIcons.FaCommentDots
              style={{ fontSize: "30px" }}
              className="iconAlign"
            />
            <h1 style={{ fontSize: "60px" }} className="numAlign">
              {/* {comments?.length} */}
              50
            </h1>
          </div>
        </div>
        <div className="col-2">
          <div
            className="card card-top"
            style={{ backgroundColor: "#55C6E6", color: "white" }}
          >
            <h4>TODOS</h4>
            <SiIcons.SiTodoist
              style={{ fontSize: "30px" }}
              className="iconAlign"
            />
            <h1 style={{ fontSize: "60px" }} className="numAlign">
              {Todo?.length}
            </h1>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
      <div className="row mt-5 posts">
        <h1 className="text-center">Posts</h1>
        {posts?.map((post, index) => (
          <div key={index} className="card post-card justify-content-center">
            <div className="row align-items-center">
              <div className="col-1">
                <span>
                  {" "}
                  <FaIcons.FaUserCircle
                    style={{ fontSize: "60px" }}
                    className="ms-4"
                  />{" "}
                </span>
              </div>
              <div className="col-9 mt-4">
                <span className="" key={post.id}>
                  <h5>{post.title}</h5>
                  <p>{post.body}</p>
                </span>
              </div>
              <div className="col-1">
                <button
                  className="btn btn-warning"
                  onClick={() => navigatetoView(post.id)}
                >
                  View
                </button>
              </div>
              <div className="col-1 p-0">
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardComponent;
