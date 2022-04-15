const handleRequest = async () => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const dataJson = await response.json();
    return dataJson;
  } catch (err) {
    return err;
  }
};

export default handleRequest;
