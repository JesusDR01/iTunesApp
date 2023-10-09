import { useMutation } from "@tanstack/react-query"

import { postEnquiry } from "@lib/services/api/enquiry"
import { EnquiryCredentials } from "@modules/home/components/landing/Contact/components/Form"

function useEnquiry() {
  return useMutation((newData: EnquiryCredentials) => postEnquiry(newData))
}

export default useEnquiry
