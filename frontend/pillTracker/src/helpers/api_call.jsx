
const callBackend = async () => {

  const BASE_URL = "http://127.0.0.1:8000/nih_api";

  const response = fetch(`${BASE_URL}`);

  return response;
};


export default callBackend;