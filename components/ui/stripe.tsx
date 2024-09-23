'use client'

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface StripeCheckoutProps {
  amount: number
  clientSecret: string | undefined
  onSuccess: () => void
  onError: () => void
}

/**
 * Renders a Stripe checkout component, handling payment processing and error handling.
 *
 * @param {number} amount - The amount to be paid.
 * @param {string | undefined} clientSecret - The client secret for the Stripe payment.
 * @param {() => void} onSuccess - Callback function to be executed on successful payment.
 * @param {() => void} onError - Callback function to be executed on payment error.
 * @return {JSX.Element} The Stripe checkout component.
 */
export function StripeCheckout({ amount, clientSecret, onSuccess, onError }: StripeCheckoutProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  /**
   * Handles the submission of the payment form, processing the payment and handling any errors that may occur.
   *
   * @return {Promise<void>} A promise that resolves when the payment processing is complete.
   */
  const handleSubmit = async () => {
    setLoading(true)
    
    if (!stripe || !elements || !clientSecret) {
      onError()
      setLoading(false)
      return
    }

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      onError()
      setLoading(false)
      return
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement
      }
    })

    if (error) {
      onError()
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess()
    }

    setLoading(false)
  }

  return (
    <div>
      <CardElement options={{ hidePostalCode: true }} />
      <Button
        className="w-full mt-4"
        onClick={handleSubmit}
        disabled={!stripe || loading}
      >
        {loading ? 'Memproses...' : `Bayar Rp ${amount.toLocaleString()}`}
      </Button>
    </div>
  )
}
