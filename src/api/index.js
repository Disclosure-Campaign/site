import axios from 'axios';

const api = {
  requestData: async params => {
    var result;

    try {
      var response = await axios.get(`/${params.route}`, {params});
      console.log(response.data);

      result = response.data;
    } catch (error) {
      console.error('There was a problem with the request:', error);

      result = error
    }

    return result;
  }
}

export default api;