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

// 登入
export const apiUserLogin = data => baseRequest.post('/user/login', data)
// 註冊
export const apiUserSignup = data => baseRequest.post('/user/signup', data)
// 取得會員資料
export const apiGetUserInfo = () => userRequest.get(`/user/profile`)

// 取得今月營養日記
export const apiGetDiarys = query => userRequest.get(`/diarys?entry_date=${query}`)
// 新增一則營養日記
export const apiCreateOneDiary = data => userRequest.post(`/diary/${data.oodId}`, data.paramData)

// 取得食品列表
export const apiGetAllfFood = query => userRequest.get(`/foods?search=${query.search}&page=${query.page}`)

// 取得自訂食品列表
export const apiGetAllCustomFood = query => userRequest.get(`/customFoods?search=${query.search}&page=${query.page}`)
