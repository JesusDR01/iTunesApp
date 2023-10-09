import { postRequest } from "@lib/util/http"
import { enquiryController } from "./consts"
import { EnquiryCredentials } from "@modules/home/components/landing/Contact/components/Form"

export type postEnquiryQuery = () => Promise<{
  ok: boolean
}>
export type postEnquiryResponse = Awaited<ReturnType<postEnquiryQuery>>

export const postEnquiry = async (enquiryPayload: EnquiryCredentials) =>
  postRequest<postEnquiryResponse, EnquiryCredentials>(
    `${enquiryController}`,
    enquiryPayload
  )
