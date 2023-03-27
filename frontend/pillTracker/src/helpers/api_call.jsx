
const callBackend = async () => {
  const base_url = process.env.REACT_APP_BASE_URL

  const BASE_URL = `http://${base_url}/nih_api`;

  const response = fetch(`${BASE_URL}`);

  return response;
};


export default callBackend;