import { useStore } from '@/store'

const isShowConsole = import.meta.env.VITE_APP_ISSHOWCONSOLE

export const checkConsole = (text, response) => {
  if (isShowConsole === 'true') {
    console.log(text, response)
  } else {
    return false
  }
}


export const appError = (error, errorText) => {
  const store = useStore()
  if (!error.response) {
    return checkConsole(`${errorText}`, error)
  }
  const message = error.response.data.message
  store.$patch({ isLoading: false, errorMsg: `${errorText}，${message}` })
  checkConsole(`${errorText}`, error.response)
}