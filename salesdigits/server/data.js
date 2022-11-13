import axios from 'axios';

class Database {
  login({queryKey}) {
    const [_, username, password] = queryKey;

    return axios.post('/auth/login/', {username: username, password});
  }

  register(data) {
    console.log('Resigerrrying');
    return axios.post('/auth/salesdigit/register/', data);
  }

  finish2d(data) {
    return axios.post('/sd/api/finishtwodigit/', data);
  }

  getfinish2d({queryKey}) {
    const [_, date] = queryKey;
    console.log(date);

    return axios.get('/sd/api/finishtwodigit/', {
      params: {
        datetime: date,
      },
    });
  }


  getHistory2d() {
  
    return axios.get('/sd/api/historytwodigit/');
  }

  sales2d(data) {
    return axios.post('/sd/api/salestwodigit/', data);
  }

  getsold2d(data) {
    return axios.get('/sd/api/salestwodigit/');
  }


 // 3D requests --------------------------------------------------------------------------------------



  finish3d(data) {
    return axios.post('/sd/api/finishthreedigit/', data);
  }

  getfinish3d({queryKey}) {
    const [_, date] = queryKey;
    console.log(date);

    return axios.get('/sd/api/finishthreedigit/', {
      params: {
        datetime: date,
      },
    });
  }


  getHistory3d() {
  
    return axios.get('/sd/api/historythreedigit/');
  }

  sales3d(data) {
    return axios.post('/sd/api/salesthreedigit/', data);
  }

  getsold3d(data) {
    return axios.get('/sd/api/salesthreedigit/');
  }





  getProfile(){
    return axios.get('/api/profile/');
  }

}

export default new Database();
