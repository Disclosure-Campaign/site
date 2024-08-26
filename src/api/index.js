import axios from 'axios';

const api = {
    requestData: async params => {
        var result;

        try {
            var response = await axios.get('/request_standard_data', {params});
            console.log(response.data);

            result = response.data;
          } catch (error) {
            console.error('There was a problem with the request:', error);

            result = error
          }

        return result;
    },
    requestSearchableEntities: async params => {
      var result;

      try {
          var response = await axios.get('/get_searchable_entities', {params});
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