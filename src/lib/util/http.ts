import { AxiosError, AxiosRequestConfig } from "axios"
import { httpInstance } from "./http.instance"
import { i18n } from "next-i18next"

const getRequest = async <T>(url: string, params: AxiosRequestConfig) => {
  try {
    return await httpInstance.get<T>(url, {
      params,
      headers: { "Accept-Language": i18n?.language },
    })
  } catch (e: unknown) {
    if (e instanceof AxiosError){
      throw e.response?.data
    }
    throw e
  }
}

const postRequest = async <T, K>(
  url: string,
  data: K,
  config?: AxiosRequestConfig
) => {
  try {
    return await httpInstance.post<T>(url, data, config)
  } catch (e: unknown) {
    if (e instanceof AxiosError){
      throw e.response?.data
    }
    throw e
  }
}

const putRequest = async <T, K>(url: string, data: K) => {
  try {
    return await httpInstance.put<T>(url, data)
  } catch (e: unknown) {
    if (e instanceof AxiosError){
      throw e.response?.data
    }
    throw e
  }
}

const deleteRequest = async (url: string) => {
  try {
    return await httpInstance({ method: "DELETE", url })
  } catch (e: unknown) {
    if (e instanceof AxiosError){
      throw e.response?.data
    }
    throw e
  }
}

export { getRequest, postRequest, putRequest, deleteRequest }
