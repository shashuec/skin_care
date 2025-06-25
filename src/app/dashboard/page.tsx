'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, Calendar, ShoppingCart, User, Settings, TrendingUp, Clock, Star } from 'lucide-react'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data - in real app, this would come from API
  const assessments = [
    {
      id: '1',
      date: '2024-01-15',
      type: 'Skin Analysis',
      status: 'completed',
      recommendations: 4,
      routine: 'AM/PM'
    },
    {
      id: '2',
      date: '2024-01-01',
      type: 'Follow-up Analysis',
      status: 'completed',
      recommendations: 3,
      routine: 'AM/PM'
    }
  ]

  const currentRoutine = {
    AM: [
      { name: 'Salicylic Acid Face Wash', time: '1 min' },
      { name: 'Oil-Free Gel Moisturizer', time: '30 seconds' },
      { name: 'Broad Spectrum SPF 50', time: '1 min' }
    ],
    PM: [
      { name: 'Salicylic Acid Face Wash', time: '1 min' },
      { name: 'Niacinamide 10% Serum', time: '30 seconds' },
      { name: 'Oil-Free Gel Moisturizer', time: '30 seconds' }
    ]
  }

  const recentProducts = [
    { name: 'Salicylic Acid Face Wash', status: 'In Use', lastOrdered: '2 weeks ago' },
    { name: 'Niacinamide 10% Serum', status: 'Running Low', lastOrdered: '1 month ago' },
    { name: 'Oil-Free Gel Moisturizer', status: 'In Use', lastOrdered: '3 weeks ago' },
    { name: 'Broad Spectrum SPF 50', status: 'Need to Reorder', lastOrdered: '1 month ago' }
  ]

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
              <Link 
                href="/analysis" 
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
              >
                New Analysis
              </Link>
              <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-rose-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-rose-600" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-1">Welcome Back!</h3>
                  <p className="text-sm text-gray-600">Your skin journey continues</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                      : 'text-gray-600 hover:bg-rose-50 hover:text-rose-600'
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Overview</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('routine')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'routine'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                      : 'text-gray-600 hover:bg-rose-50 hover:text-rose-600'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  <span>My Routine</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'products'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                      : 'text-gray-600 hover:bg-rose-50 hover:text-rose-600'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>My Products</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('history')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'history'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                      : 'text-gray-600 hover:bg-rose-50 hover:text-rose-600'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  <span>History</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                      : 'text-gray-600 hover:bg-rose-50 hover:text-rose-600'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-8 text-white">
                  <h1 className="text-3xl font-bold mb-2">Your Skin Journey</h1>
                  <p className="text-rose-100 mb-6">Track your progress and maintain your routine for beautiful, healthy skin.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/20 rounded-2xl p-4">
                      <div className="text-2xl font-bold mb-1">15</div>
                      <div className="text-rose-100 text-sm">Days Active</div>
                    </div>
                    <div className="bg-white/20 rounded-2xl p-4">
                      <div className="text-2xl font-bold mb-1">92%</div>
                      <div className="text-rose-100 text-sm">Routine Consistency</div>
                    </div>
                    <div className="bg-white/20 rounded-2xl p-4">
                      <div className="text-2xl font-bold mb-1">4</div>
                      <div className="text-rose-100 text-sm">Products in Use</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link href="/analysis" className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                      <Star className="w-6 h-6 text-rose-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Take New Analysis</h3>
                    <p className="text-gray-600 text-sm">Update your skin profile and get fresh recommendations.</p>
                  </Link>
                  
                  <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                      <ShoppingCart className="w-6 h-6 text-rose-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Reorder Products</h3>
                    <p className="text-gray-600 text-sm">Quickly reorder your favorite skincare products.</p>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                      <Calendar className="w-6 h-6 text-rose-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
                    <p className="text-gray-600 text-sm">See how your skin has improved over time.</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Completed evening routine</div>
                        <div className="text-sm text-gray-600">2 hours ago</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Ordered Niacinamide Serum</div>
                        <div className="text-sm text-gray-600">Yesterday</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-rose-50 rounded-xl">
                      <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Completed skin analysis</div>
                        <div className="text-sm text-gray-600">3 days ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'routine' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-gray-900">My Daily Routine</h1>
                  <Link href="/routine-builder" className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all">
                    Customize Routine
                  </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Morning Routine */}
                  <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 text-white">
                      <h3 className="text-xl font-bold">Morning Routine</h3>
                      <p className="text-yellow-100">Total time: ~3 minutes</p>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {currentRoutine.AM.map((step, index) => (
                          <div key={index} className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-xl">
                            <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{step.name}</div>
                              <div className="text-sm text-gray-600">{step.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Evening Routine */}
                  <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
                      <h3 className="text-xl font-bold">Evening Routine</h3>
                      <p className="text-indigo-100">Total time: ~3 minutes</p>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {currentRoutine.PM.map((step, index) => (
                          <div key={index} className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-xl">
                            <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{step.name}</div>
                              <div className="text-sm text-gray-600">{step.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
                  <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all">
                    Reorder All
                  </button>
                </div>

                <div className="space-y-4">
                  {recentProducts.map((product, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-rose-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-600">Last ordered: {product.lastOrdered}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            product.status === 'In Use' ? 'bg-green-100 text-green-800' :
                            product.status === 'Running Low' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {product.status}
                          </span>
                          <button className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors">
                            Reorder
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-8">
                <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>

                <div className="space-y-4">
                  {assessments.map((assessment) => (
                    <div key={assessment.id} className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{assessment.type}</h3>
                          <p className="text-sm text-gray-600">Completed on {new Date(assessment.date).toLocaleDateString()}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span>{assessment.recommendations} products recommended</span>
                            <span>•</span>
                            <span>{assessment.routine} routine created</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            Completed
                          </span>
                          <Link 
                            href={`/results/${assessment.id}`}
                            className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors"
                          >
                            View Results
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

                <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-xl" value="user@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl" value="John Doe" />
                    </div>
                    <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Routine Reminders</div>
                        <div className="text-sm text-gray-600">Get reminded to follow your daily routine</div>
                      </div>
                      <button className="bg-rose-500 w-12 h-6 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Product Reorder Alerts</div>
                        <div className="text-sm text-gray-600">Get notified when products are running low</div>
                      </div>
                      <button className="bg-rose-500 w-12 h-6 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}