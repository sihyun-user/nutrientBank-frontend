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

userRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 登入
export const apiUserLogin = payload => baseRequest.post('/user/login', payload)
// 註冊
export const apiUserSignup = payload => baseRequest.post('/user/signup', payload)
// 取得會員資料
export const apiGetUserInfo = () => userRequest.get(`/user/profile`)

// 取得今月營養日記
export const apiGetDiarys = payload => userRequest.get(`/diarys?entry_date=${payload}`)
// 新增一則營養日記
export const apiCreateOneDiary = payload => userRequest.post(`/diary/${payload.oodId}`, payload.paramData)

// 取得食品列表
export const apiGetAllfFood = payload => userRequest.get(`/foods?search=${payload.search}&page=${payload.page}`)

// 取得自訂食品列表
export const apiGetAllCustomFood = payload => userRequest.get(`/customFoods?search=${payload.search}&page=${payload.page}`)

// 取得食品書籤列表
export const apiGetAllLikes = () => userRequest.get(`/likes`)
// 新增一筆食品書籤
export const apiAddFoodLike = payload => userRequest.get(`/like/${payload.foodId}?type=${payload.foodType}`)
// 取消一筆食品書籤
export const apiCancelFoodLike = payload => userRequest.get(`/unlike/${payload.foodId}?type=${payload.foodType}`)