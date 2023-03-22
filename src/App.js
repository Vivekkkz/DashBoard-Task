import logo from "./logo.svg";
import "./App.css";
import DashboardComponent from "./Dashboard/Task";
import Header from "./Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./UserList";
import ViewComponent from "./Dashboard/View";
// import UserPage from "./userPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<UserList />}></Route>
          <Route path="/dashboard/:id" element={<DashboardComponent />}></Route>
          <Route path="/view/:id" element={<ViewComponent />}></Route>
        </Routes>
      </Router>
      {/*  */}
    </div>
  );
}

export default App;
