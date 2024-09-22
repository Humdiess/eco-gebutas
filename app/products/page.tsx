'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ShoppingCart, Sun, Leaf } from 'lucide-react'

export default function ProductPage() {
  const [selectedVariant, setSelectedVariant] = useState('standard')

    const products: { [key: string]: { name: string; price: number; description: string; } } = {
      standard: {
        name: 'ECO Gebutas Standard',
        price: 199.99,
        description: 'Our eco-friendly roofing tile made from sustainable sugarcane and recycled paper.',
      },
      solar: {
        name: 'ECO Gebutas Solar',
        price: 299.99,
        description: 'Our premium eco-friendly roofing tile with integrated solar panels for energy generation.',
      },
    };

const selectedProduct = products[selectedVariant];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white px-16">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold text-gray-900">ECO Gebutas</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
            <li><Link href="/#about" className="text-gray-600 hover:text-gray-900">About</Link></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-8">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
            <span className="text-gray-500">Product Image Placeholder</span>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h1>
            <p className="text-2xl font-semibold text-green-600 mb-6">${selectedProduct.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-6">{selectedProduct.description}</p>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Select Variant:</label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedVariant('standard')}
                  className={`px-4 py-2 rounded-full ${
                    selectedVariant === 'standard'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setSelectedVariant('solar')}
                  className={`px-4 py-2 rounded-full ${
                    selectedVariant === 'solar'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Solar
                </button>
              </div>
            </div>

            <button className="w-full bg-green-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Product Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Made from sustainable sugarcane and recycled paper</li>
                <li>Durable and weather-resistant</li>
                <li>Easy installation</li>
                <li>Reduces carbon footprint</li>
                {selectedVariant === 'solar' && (
                  <>
                    <li>Integrated solar panels</li>
                    <li>Generates clean electricity</li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Specifications</h3>
              <ul className="text-gray-600 space-y-2">
                <li><span className="font-semibold">Dimensions:</span> 30cm x 60cm</li>
                <li><span className="font-semibold">Weight:</span> 2.5 kg per tile</li>
                <li><span className="font-semibold">Material:</span> Sugarcane fiber, recycled paper</li>
                {selectedVariant === 'solar' && (
                  <li><span className="font-semibold">Solar Capacity:</span> 25W per tile</li>
                )}
              </ul>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}