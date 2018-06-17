const axios = require("axios");

axios.get('https://graph.facebook.com/oauth/access_token?client_id=184423675597370&client_secret=1e9ac56f4eda0e9e5cdd23d98c83de42&grant_type=client_credentials')
  .then(function (response) {
    console.log(response.data.access_token);
  })
  .catch(function (error) {
    console.log(error);
  });