import api from "./api";
import qs from "qs";

export const addUser = async (body) => {
  const formData = qs.stringify(body);

  return await api.post(`/api/v1/users`, body);
};

// export const fetchUsers = async (token) => {
//   return await api.get(`/api/v1/users`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

export const fetchUsers = async () => {
  return await api.get(`/api/v1/users`);
};
