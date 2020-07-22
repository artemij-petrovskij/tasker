const fetch = require('node-fetch')
const url = 'api/'

class TaskService {
  static getTasks = async () => {
    try {
      const res = await fetch(`${url}/getTasks`);

      let data = await res.json();
      return data
    } catch (err) {

      console.error(err);
    }
  }

  static insertTask = async (body) => {
    try {
      await fetch(`${url}/addTask`,
        {
          method: 'post',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
      console.error(err);
    }
  }

  static deleteTask = async (body) => {
    try {
      await fetch(`${url}/delTask`,
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



