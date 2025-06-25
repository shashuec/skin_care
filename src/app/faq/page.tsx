'use client'

import Link from 'next/link'
import { Sparkles, Plus, Minus } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: 'How accurate is the skin analysis?',
    answer: 'Our questionnaire-based analysis is developed with dermatologists and uses proven scientific methods to assess your skin type and concerns. While it\'s very accurate for general recommendations, we always suggest consulting with a dermatologist for specific skin conditions.'
  },
  {
    question: 'How often should I retake the analysis?',
    answer: 'We recommend retaking the analysis every 2-3 months or when you notice significant changes in your skin. Your skin can change due to seasons, lifestyle, age, or hormonal changes.'
  },
  {
    question: 'Are the recommended products suitable for sensitive skin?',
    answer: 'Yes, we have specific options for sensitive skin. Our recommendation engine considers your skin sensitivity and allergies to suggest appropriate products. Always perform a patch test before using new products.'
  },
  {
    question: 'How long will it take to see results?',
    answer: 'Most users see initial improvements within 2-4 weeks of consistent use. However, significant changes in skin texture, tone, and overall health typically become visible after 6-8 weeks of following the recommended routine.'
  },
  {
    question: 'Can I customize my routine?',
    answer: 'Absolutely! While we provide scientifically-backed recommendations, you can customize your routine based on your preferences, budget, and lifestyle. Our dashboard allows you to modify and track your personalized routine.'
  },
  {
    question: 'What if I have allergies to certain ingredients?',
    answer: 'During the assessment, we ask about known allergies and sensitivities. Our recommendation engine filters out products containing ingredients you\'re allergic to. Always check ingredient lists and consult with a dermatologist if you have severe allergies.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Currently, we ship within India only. We\'re working on expanding our shipping to other countries. Sign up for our newsletter to be notified when we expand to your region.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for unopened products. If you\'re not satisfied with a product, you can return it within 30 days of delivery for a full refund. Opened products can be returned if they cause adverse reactions.'
  },
  {
    question: 'How do I contact customer support?',
    answer: 'You can reach our customer support team through WhatsApp, email, or our contact form. Our team is available Monday-Friday, 9 AM to 6 PM IST. For urgent concerns, WhatsApp is the fastest option.'
  },
  {
    question: 'Are your products cruelty-free?',
    answer: 'Yes, all products in our catalog are cruelty-free and not tested on animals. We carefully curate brands that align with ethical and sustainable practices.'
  }
]

function FAQItem({ question, answer, isOpen, onToggle }: { 
  question: string, 
  answer: string, 
  isOpen: boolean, 
  onToggle: () => void 
}) {
  return (
    <div className="border border-rose-100 rounded-2xl bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-rose-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-rose-500 flex-shrink-0" />
        ) : (
          <Plus className="w-5 h-5 text-rose-500 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
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
              <Link 
                href="/analysis" 
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
              >
                Start Analysis
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our skincare analysis and products.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openItems.includes(index)}
                onToggle={() => toggleItem(index)}
              />
            ))}
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-rose-100 mb-6">
              Our skincare experts are here to help you on your journey to healthier skin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/your-number" 
                className="bg-white text-rose-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Chat on WhatsApp
              </a>
              <Link 
                href="/contact" 
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-rose-600 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}