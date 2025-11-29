import axios from 'axios'
import * as consts from '../Constants';

 export const fetchData = async (username, password) => {
      try {
        const endpoint = 'GetEmp';
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

  export const registerUser = async (username, email, password) => {
    try{
        const endpoint = 'RegisterEmployee';
        const url = consts.API_url + '/' +endpoint;
        
        const requestBody = {
            // Ensure these keys match what your backend API expects
            UserName: username, 
            EmailId: email,
            Password: password 
        };

        const response = await axios.post(url, requestBody);

        return response.data;
    } catch (error) {
        console.error('Error registering data:', error);
        throw error;
    }
    
  }