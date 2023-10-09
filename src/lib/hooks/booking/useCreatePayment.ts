import { useMutation } from "@tanstack/react-query"

import {
  createPaymentIntentPayload,
  postCreatePaymentIntent,
} from "@lib/services/api/booking"

function useCreatePaymentIntent() {
  return useMutation((newData: createPaymentIntentPayload) =>
    postCreatePaymentIntent(newData)
  )
}

export default useCreatePaymentIntent
