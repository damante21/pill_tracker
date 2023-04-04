import axios from "axios";


const callBackend = async () => {

  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL;

  const BASE_URL = `http://${base_url}/api/nih_api/`;

  const userToken = "Token " + localStorage.getItem("token");

  // const response = fetch(`${BASE_URL}`);

  const response = await fetch(`${BASE_URL}`, {
    headers: {
      Authorization: userToken,
      "Content-Type": "application/json",
    },
  });

  return response;
};

export default callBackend;
