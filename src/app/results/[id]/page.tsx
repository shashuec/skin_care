'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, Clock, Sun, Moon, ShoppingCart, ArrowRight, Star, Shield } from 'lucide-react'
import { ProductRecommendation } from '@/types'
import { redirectToShopifyCheckout, redirectToShopifyProduct, mockShopifyProducts } from '@/lib/shopify'

interface ResultsData {
  assessment_id: string
  recommendations: ProductRecommendation[]
  routine: {
    AM: any[]
    PM: any[]
  }
}

export default function ResultsPage() {
  const params = useParams()
  const [results, setResults] = useState<ResultsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('recommendations')

  useEffect(() => {
    // In a real app, this would fetch from API
    // For demo, we'll simulate the results
    const mockResults: ResultsData = {
      assessment_id: params.id as string,
      recommendations: [
        {
          product: {
            id: 'facewash-acne-oily',
            name: 'Salicylic Acid Face Wash',
            category: 'Face Wash',
            description: 'Perfect for oily, acne-prone skin',
            price: 899,
            image_url: '/products/salicylic-face-wash.jpg',
            active: true
          },
          priority: 1,
          reason: 'Recommended for oily skin with acne concerns',
          usage: {
            frequency: 'Twice daily',
            amount: 'Pea-sized amount',
            routine: ['AM', 'PM']
          }
        },
        {
          product: {
            id: 'serum-acne',
            name: 'Niacinamide 10% Serum',
            category: 'Serum',
            description: 'Reduces acne and controls oil',
            price: 1299,
            image_url: '/products/niacinamide-serum.jpg',
            active: true
          },
          priority: 2,
          reason: 'Targets acne and oil control',
          usage: {
            frequency: 'Once daily',
            amount: '2-3 drops',
            routine: ['PM']
          }
        },
        {
          product: {
            id: 'moisturizer-oily',
            name: 'Oil-Free Gel Moisturizer',
            category: 'Moisturizer',
            description: 'Lightweight hydration for oily skin',
            price: 999,
            image_url: '/products/gel-moisturizer.jpg',
            active: true
          },
          priority: 3,
          reason: 'Non-comedogenic for oily skin',
          usage: {
            frequency: 'Twice daily',
            amount: 'Pump or two',
            routine: ['AM', 'PM']
          }
        },
        {
          product: {
            id: 'sunscreen-daily',
            name: 'Broad Spectrum SPF 50',
            category: 'Sunscreen',
            description: 'Daily protection against UV rays',
            price: 1099,
            image_url: '/products/sunscreen-spf50.jpg',
            active: true
          },
          priority: 4,
          reason: 'Essential daily protection',
          usage: {
            frequency: 'Every morning',
            amount: 'Two finger lengths',
            routine: ['AM']
          }
        }
      ],
      routine: {
        AM: [
          {
            product_id: 'facewash-acne-oily',
            product_name: 'Salicylic Acid Face Wash',
            order: 1,
            frequency: 'Twice daily',
            amount: 'Pea-sized amount',
            instructions: 'Apply pea-sized amount of Salicylic Acid Face Wash'
          },
          {
            product_id: 'moisturizer-oily',
            product_name: 'Oil-Free Gel Moisturizer',
            order: 2,
            frequency: 'Twice daily',
            amount: 'Pump or two',
            instructions: 'Apply pump or two of Oil-Free Gel Moisturizer'
          },
          {
            product_id: 'sunscreen-daily',
            product_name: 'Broad Spectrum SPF 50',
            order: 3,
            frequency: 'Every morning',
            amount: 'Two finger lengths',
            instructions: 'Apply two finger lengths of Broad Spectrum SPF 50'
          }
        ],
        PM: [
          {
            product_id: 'facewash-acne-oily',
            product_name: 'Salicylic Acid Face Wash',
            order: 1,
            frequency: 'Twice daily',
            amount: 'Pea-sized amount',
            instructions: 'Apply pea-sized amount of Salicylic Acid Face Wash'
          },
          {
            product_id: 'serum-acne',
            product_name: 'Niacinamide 10% Serum',
            order: 2,
            frequency: 'Once daily',
            amount: '2-3 drops',
            instructions: 'Apply 2-3 drops of Niacinamide 10% Serum'
          },
          {
            product_id: 'moisturizer-oily',
            product_name: 'Oil-Free Gel Moisturizer',
            order: 3,
            frequency: 'Twice daily',
            amount: 'Pump or two',
            instructions: 'Apply pump or two of Oil-Free Gel Moisturizer'
          }
        ]
      }
    }

    setTimeout(() => {
      setResults(mockResults)
      setLoading(false)
    }, 1000)
  }, [params.id])

  const totalPrice = results?.recommendations.reduce((sum, rec) => sum + rec.product.price, 0) || 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Skin</h2>
          <p className="text-gray-600">Creating your personalized routine...</p>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Results Not Found</h2>
          <p className="text-gray-600 mb-4">We couldn't find your analysis results.</p>
          <Link href="/analysis" className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-full">
            Take Analysis Again
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-rose-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Aesthetics
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Analysis Complete</span>
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
            <Star className="w-5 h-5" />
            <span className="font-medium">Analysis Complete</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Personalized Skincare Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on your skin analysis, we've curated the perfect routine and products for your unique needs.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-sm border border-rose-100">
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === 'recommendations'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-rose-600'
              }`}
            >
              Product Recommendations
            </button>
            <button
              onClick={() => setActiveTab('routine')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === 'routine'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-rose-600'
              }`}
            >
              Daily Routine
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'recommendations' && (
          <div className="max-w-6xl mx-auto">
            {/* Summary */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-8 text-white mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">{results.recommendations.length}</div>
                  <div className="text-rose-100">Recommended Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">₹{totalPrice.toLocaleString()}</div>
                  <div className="text-rose-100">Total Value</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">4-6</div>
                  <div className="text-rose-100">Weeks to See Results</div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {results.recommendations.map((rec, index) => (
                <div key={rec.product.id} className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Sparkles className="w-10 h-10 text-rose-500" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="inline-block bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded-full mb-2">
                          {rec.product.category}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">{rec.product.name}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">₹{rec.product.price}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{rec.product.description}</p>
                    
                    <div className="bg-rose-50 rounded-lg p-3 mb-4">
                      <div className="text-sm text-rose-800 font-medium mb-1">Why this product?</div>
                      <div className="text-sm text-rose-700">{rec.reason}</div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div>
                        <Clock className="w-4 h-4 inline mr-1" />
                        {rec.usage.frequency}
                      </div>
                      <div className="text-right">
                        {rec.usage.amount}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        const shopifyProduct = mockShopifyProducts[rec.product.id]
                        if (shopifyProduct) {
                          redirectToShopifyProduct(shopifyProduct.handle)
                        }
                      }}
                      className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Buy All CTA */}
            <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Routine</h3>
              <p className="text-gray-600 mb-6">
                Get all recommended products together for the best results and maximum savings.
              </p>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="text-2xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</div>
                <div className="text-lg text-gray-500 line-through">₹{Math.round(totalPrice * 1.2).toLocaleString()}</div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Save 20%
                </div>
              </div>
              <button 
                onClick={() => {
                  const variantIds = results.recommendations
                    .map(rec => mockShopifyProducts[rec.product.id]?.variants[0]?.id)
                    .filter(Boolean)
                  if (variantIds.length > 0) {
                    redirectToShopifyCheckout(variantIds)
                  }
                }}
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all inline-flex items-center space-x-2"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Buy Complete Routine</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'routine' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Morning Routine */}
              <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 text-white">
                  <div className="flex items-center space-x-3">
                    <Sun className="w-8 h-8" />
                    <div>
                      <h3 className="text-2xl font-bold">Morning Routine</h3>
                      <p className="text-yellow-100">Start your day right</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {results.routine.AM.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-xl">
                        <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {step.order}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 mb-1">{step.product_name}</div>
                          <div className="text-sm text-gray-600 mb-2">{step.instructions}</div>
                          <div className="text-xs text-yellow-800 bg-yellow-100 px-2 py-1 rounded-full inline-block">
                            {step.frequency}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
                    <div className="flex items-center space-x-2 text-yellow-800">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">Estimated time: 5-7 minutes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evening Routine */}
              <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
                  <div className="flex items-center space-x-3">
                    <Moon className="w-8 h-8" />
                    <div>
                      <h3 className="text-2xl font-bold">Evening Routine</h3>
                      <p className="text-indigo-100">Repair and restore</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {results.routine.PM.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-xl">
                        <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {step.order}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 mb-1">{step.product_name}</div>
                          <div className="text-sm text-gray-600 mb-2">{step.instructions}</div>
                          <div className="text-xs text-indigo-800 bg-indigo-100 px-2 py-1 rounded-full inline-block">
                            {step.frequency}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-indigo-50 rounded-xl">
                    <div className="flex items-center space-x-2 text-indigo-800">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">Estimated time: 8-10 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-white rounded-2xl shadow-sm border border-rose-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Pro Tips for Best Results</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-rose-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium text-gray-900">Patch Test First</div>
                      <div className="text-sm text-gray-600">Always test new products on a small area before full application.</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-rose-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium text-gray-900">Be Consistent</div>
                      <div className="text-sm text-gray-600">Follow your routine daily for 4-6 weeks to see optimal results.</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-rose-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium text-gray-900">Less is More</div>
                      <div className="text-sm text-gray-600">Use the recommended amounts - more product doesn't mean better results.</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-rose-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium text-gray-900">Monitor Your Skin</div>
                      <div className="text-sm text-gray-600">Take weekly photos to track your progress and improvements.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-rose-100 mb-6">
              Get your personalized products delivered and start seeing results in weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-rose-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all inline-flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Shop Now</span>
              </button>
              <Link 
                href="/dashboard" 
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-rose-600 transition-all"
              >
                Save to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}