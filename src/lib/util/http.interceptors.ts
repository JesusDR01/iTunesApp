import { httpInstance } from "./http.instance"
const configureInitialInterceptors = () => {
  httpInstance.interceptors.request.use((conf) => {
    const updatedConf = conf

    return updatedConf
  })

  httpInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error)
    }
  )
}

export { configureInitialInterceptors }
