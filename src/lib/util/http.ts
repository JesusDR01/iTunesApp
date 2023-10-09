import { AxiosRequestConfig } from "axios"
import { httpInstance } from "./http.instance"
import { i18n } from "next-i18next"

const getRequest = async <T>(url: string, params: AxiosRequestConfig) => {
  try {
    return await httpInstance.get<T>(url, {
      params,
      headers: { "Accept-Language": i18n?.language },
    })
  } catch (e: any) {
    throw e.response?.data
  }
}

const postRequest = async <T, K>(
  url: string,
  data: K,
  config?: AxiosRequestConfig
) => {
  try {
    return await httpInstance.post<T>(url, data, config)
  } catch (e: any) {
    throw e.response?.data
  }
}

const putRequest = async (url: string, data: any) => {
  try {
    return await httpInstance.put(url, data)
  } catch (e: any) {
    throw e.response?.data
  }
}

const deleteRequest = async (url: string) => {
  try {
    return await httpInstance({ method: "DELETE", url })
  } catch (e: any) {
    throw e.response?.data
  }
}

export { getRequest, postRequest, putRequest, deleteRequest }
