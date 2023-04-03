
const callBackend = async () => {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL

  const BASE_URL = `http://${base_url}/api/nih_api`;

  const response = fetch(`${BASE_URL}`);

  return response;
};


export default callBackend;