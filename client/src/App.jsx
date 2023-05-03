import { useRef, createRef, useEffect, useState } from "react";
import axios from "axios";
import { addUser, fetchUsers } from "./services/user";
import { getRefreshToken } from "./services/auth";
import api from "./services/api";

const App = () => {
  const [formData, setData] = useState({});
  const handleFormData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      debugger;
      e.preventDefault();
      let { status, data } = await addUser(formData);
      if (status === 201) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      console.log(status, data);
    } catch (error) {}
  };

  const getUsers = async () => {
    try {
      let { status, data } = await fetchUsers();
      if (status === 401) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label for="username">Name:</label>
        <input
          onChange={handleFormData}
          value={formData?.name}
          required
          type="text"
          id="name"
          name="name"
        />
        <br />
        <label for="username">Email:</label>
        <input
          onChange={handleFormData}
          value={formData?.email}
          required
          type="email"
          id="email"
          name="email"
        />
        <br />
        <label for="password">Password:</label>
        <input
          onChange={handleFormData}
          value={formData?.password}
          required
          type="password"
          id="password"
          name="password"
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <button onClick={() => getUsers()}>get user</button>
    </div>
  );
};

export default App;
