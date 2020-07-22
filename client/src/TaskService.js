const fetch = require('node-fetch')

  class TaskService {
    static getTasks = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/getTasks');
      
        let data = await res.json();
        return data
      } catch (err) {
      
        console.error(err);
      }
    }
  
    static insertTask = async (body) => {
      try {
        await fetch('http://localhost:3000/api/addTask',
          {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
          });
      } catch (err) {
        console.error(err);
      }
    }
  }


module.exports = TaskService



