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

export function StripeCheckout({ amount, clientSecret, onSuccess, onError }: StripeCheckoutProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

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
