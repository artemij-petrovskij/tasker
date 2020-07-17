const fetch = require('node-fetch')






const getTasks = async () => {
    try {
      const res = await fetch('http://localhost:3000/getTasks');
        
      let data = await res.json();
      return  data
    } catch (err) {
     // handle error for example
      console.error(err);
    }
  }

module.exports = getTasks



