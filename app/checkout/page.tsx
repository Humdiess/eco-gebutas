'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CreditCard, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Stripe } from '@/components/stripe'
import { StripeCheckout } from '@/components/ui/stripe'

const products = [
  {
    id: 1,
    name: 'ECO Gebutas Standard',
    price: 18000,
    image: '/img/gebutas-standart.jpg'
  },
  {
    id: 2,
    name: 'ECO Gebutas Solar',
    price: 80000,
    image: '/img/gebutas-solar.jpg'
  },
]

export default function Checkout() {
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([])
  const [total, setTotal] = useState(0)
  const [showPayment, setShowPayment] = useState(false)

  useEffect(() => {
    // In a real application, you would fetch the cart from an API or local storage
    setCart([
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
    ])
  }, [])

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => {
      const product = products.find(p => p.id === item.id)
      return sum + (product ? product.price * item.quantity : 0)
    }, 0)
    setTotal(newTotal)
  }, [cart])

  return (
    <Stripe>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
        <Link href="/products" passHref>
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Kembali ke Produk
          </Button>
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
                <CardDescription>Periksa kembali pesanan Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  {cart.map((item) => {
                    const product = products.find(p => p.id === item.id)
                    if (!product) return null
                    return (
                      <div key={item.id} className="flex items-center space-x-4 mb-4">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-500">Jumlah: {item.quantity}</p>
                          <p className="text-sm font-medium">Rp {(product.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    )
                  })}
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex justify-between">
                <CardTitle>Total</CardTitle>
                <CardTitle>Rp {total.toLocaleString()}</CardTitle>
              </CardFooter>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Informasi Pengiriman</CardTitle>
                <CardDescription>Masukkan detail pengiriman Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Input id="address" placeholder="Jl. Contoh No. 123" />
                </div>
                <Button className="w-full" onClick={() => setShowPayment(true)}>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Lanjut ke Pembayaran
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <AnimatePresence>
          {showPayment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Pembayaran</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowPayment(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <Separator className="my-4" />
                <StripeCheckout
                  amount={total}
                  clientSecret={process.env.STRIPE_CLIENT_SECRET}
                  onSuccess={() => {
                    alert('Pembayaran berhasil!')
                    setShowPayment(false)
                  }}
                  onError={() => alert('Terjadi kesalahan saat memproses pembayaran.')}
                >
                </StripeCheckout>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Stripe>
  )
}