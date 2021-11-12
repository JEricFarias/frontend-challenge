import { Axios } from "axios";

const axios = new Axios({
  baseURL: "https://reqres.in/api",
});

const parseData = (res) => {
  if (res.status === 200) {
    const obj = JSON.parse(res.data);
    res.data = obj.data;
  }
  return res;
};

const find = async (id) => {
  const res = await axios.get(`/users/${id}`);
  return parseData(res);
};

const list = async () => {
  const res = await axios.get("/users", { params: { per_page: 99 } });
  return parseData(res);
};

const update = async (id, user) => {
  const res = await axios.put(`users/${id}`, user);
  if (res.status === 200) {
    res.data = JSON.parse(res.data);
  }
  return res;
};

const deleteuser = async (id) => {
  const res = await axios.delete(`/users/${id}`);
  return res;
};

const User = {
  find,
  list,
  update,
  delete: deleteuser,
};

export default User;
