import axios from 'axios'

const baseRequest = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API}`
});

const userRequest = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API}`,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjBjNmVmOTk2Y2Y3ZjUxNWI0NjRiYyIsImlhdCI6MTY2NzQ1ODU3OSwiZXhwIjoxNjY4MDYzMzc5fQ.3eCjq8LSuxqzWXsK38EZwzGni-WUS13pXU8uGuq5ing`
  }
});

export const apiUserLogin = data => userRequest.get('/diarys', data);
