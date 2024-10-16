import axios from 'axios';
import _ from 'lodash';

const api = {
  requestData: async params => {
    var result;

    try {
      var response = await axios.get(`/${params.route}`, {params});

      if (_.get(response, 'data')) {
        result = response.data;
      } else {
        result = null;
      }
    } catch (error) {
      console.error('There was a problem with the request:', error);

      result = null;
    }

    return result;
  }
}

export default api;