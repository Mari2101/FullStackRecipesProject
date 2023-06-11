import axios from "axios";

const baseUrl = "http://localhost:3006/api/auth";

const register = (username: string, email: string, password: string) => {
  return axios.post(baseUrl + "/signup", { username, email, password });
};

const login = (email: string, password: string) => {
  return axios.post(baseUrl + "/signin", { email, password }).then((res) => {
    const token = res.data.accessToken;
    const email = res.data.email;
    const username = res.data.username;
    const role = res.data.roles[0];
    const id = res.data.id;
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ email, username, token, id, role })
      );
    }
    return res.data;
  });
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export { register, login, logout };

const authService = { register, login, logout };
export default authService;
