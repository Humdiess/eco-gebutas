'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Plus, Minus, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import Navbar from '@/components/navbar'

const products = [
  {
    id: 1,
    name: 'ECO Gebutas Standard',
    description: 'Genteng ramah lingkungan dari tebu dan kertas daur ulang',
    price: 150000,
    image: '/img/gebutas-standart.jpg'
  },
  {
    id: 2,
    name: 'ECO Gebutas Solar',
    description: 'Genteng ramah lingkungan dengan panel surya terintegrasi',
    price: 500000,
    image: '/img/gebutas-solar.jpg'
  },
  // Add more products as needed
]

export default function ProductShowcase() {
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([])

  const addToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { id: productId, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
      }
      return prevCart.filter(item => item.id !== productId)
    })
  }

  const getQuantity = (productId: number) => {
    const item = cart.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen p-8">
      <header className="mb-12 flex justify-between items-center">
        {/* back button */}
        <div className="left-nav flex items-center gap-4">
          <Link href="/" passHref>
            <Button variant="ghost" className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <ChevronLeft />
              </div>
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-green-800">ECO Gebutas Produk</h1>
        </div>
        <Link href="/checkout" passHref>
          <Button variant="outline" className="relative">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Keranjang
            {totalItems > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2">
                {totalItems}
              </Badge>
            )}
          </Button>
        </Link>
      </header>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
              <p className="mt-4 font-semibold text-lg">Rp {product.price.toLocaleString()}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => removeFromCart(product.id)}
                  disabled={getQuantity(product.id) === 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-semibold">{getQuantity(product.id)}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => addToCart(product.id)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={() => addToCart(product.id)}>
                Tambah ke Keranjang
              </Button>
            </CardFooter>
          </Card>
        ))}
      </motion.div>
    </div>
  )
}