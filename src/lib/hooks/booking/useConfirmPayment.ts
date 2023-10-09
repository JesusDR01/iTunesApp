import { useMutation } from "@tanstack/react-query"

import {
  confirmPaymentIntentPayload,
  postConfirmPaymentIntent,
} from "@lib/services/api/booking"

function useConfirmPaymentIntent() {
  return useMutation((newData: confirmPaymentIntentPayload) =>
    postConfirmPaymentIntent(newData)
  )
}

export default useConfirmPaymentIntent
