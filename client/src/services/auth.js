import api from "./api";
import { url } from "./baseUrl";
import axios from "axios";

// export const getRefreshToken = async (body) => {
//   return await api.post(`/api/v1/refreshToken`, body);
// };

export const getRefreshToken = (data) => {
  return new Promise((resolve, reject) =>
    axios
      .post(`${url}/api/v1/refreshToken`, data)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  );
};
