import axios from 'axios'
import * as consts from '../Constants';

 export const fetchData = async (endpoint,username, password) => {
      try {
        const response = await axios.get(`${consts.API_url}/${endpoint}`, {
        params: {
            username: username, 
            password: password
        },
        headers: {
            'Access-Control-Allow-Origin' : '*'
        }
      });
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    };