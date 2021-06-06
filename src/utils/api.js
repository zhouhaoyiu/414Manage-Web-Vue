// import axios from 'axios'
// import { Message } from 'element-ui'

// axios.interceptors.response.use(success => {
//   if (success.status && success.status === 200) {
//     if (success.data.code === 500) {
//       Message.error({ message: success.data.message })
//     }
//   }
// }, error => {
//   if (error.response.code === 404) {
//     Message.error({ message: '服务器被吃了' })
//   } else if (error.response.code === 403) {
//     Message.error({ message: '权限不足' })
//   }
// }
// )

// export const postRequest = (url, params) => {
//   return axios({
//     method: 'POST',
//     url: `{url}`
//   })
// }
