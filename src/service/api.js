import axios from 'axios'

const baseRequest = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API}`
})
const userRequest = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export const apiUserLogin = data => baseRequest.post('/user/login', data)
export const apiUserSignup = data => baseRequest.post('/user/signup', data)

export const apiGetDiarys = data => userRequest.get(`/diarys?entry_date=${data}`)
