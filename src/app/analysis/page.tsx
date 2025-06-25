'use client'

import { useState } from 'react'
import { Sparkles, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { AssessmentResponses } from '@/types'

const QUESTIONNAIRE_STEPS = [
  {
    id: 'personal',
    title: 'Personal Information',
    questions: [
      { id: 'name', label: 'Full Name', type: 'text', required: true },
      { id: 'age', label: 'Age', type: 'number', required: true },
      { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
      { id: 'location', label: 'Location', type: 'text', required: true },
    ]
  },
  {
    id: 'concern',
    title: 'Primary Concern',
    questions: [
      { 
        id: 'primary_concern', 
        label: 'What would you like to focus on?', 
        type: 'radio', 
        options: ['skin', 'hair', 'body'],
        required: true 
      }
    ]
  },
  {
    id: 'skin_type',
    title: 'Skin Type',
    condition: (responses: AssessmentResponses) => responses.primary_concern === 'skin',
    questions: [
      {
        id: 'skin_type',
        label: 'What is your skin type?',
        type: 'radio',
        options: ['Normal', 'T-zone oily', 'Combination', 'Oily', 'Dry', "Don't know"],
        required: true
      }
    ]
  },
  {
    id: 'skin_concerns',
    title: 'Skin Concerns',
    condition: (responses: AssessmentResponses) => responses.primary_concern === 'skin',
    questions: [
      {
        id: 'skin_concerns',
        label: 'What are your main skin concerns? (Select all that apply)',
        type: 'checkbox',
        options: [
          'Regular skin care',
          'Acne',
          'Anti ageing',
          'Pigmentation',
          'Dark under eyes',
          'Dark lips',
          'Scars',
          'Dullness',
          'Open pores',
          'Other'
        ],
        required: true
      }
    ]
  },
  {
    id: 'skin_goals',
    title: 'Skin Goals',
    condition: (responses: AssessmentResponses) => responses.primary_concern === 'skin',
    questions: [
      {
        id: 'skin_goals',
        label: 'What are your skin goals? (Select all that apply)',
        type: 'checkbox',
        options: [
          'Acne free',
          'Reduced pigmentation',
          'Reduced fine lines',
          'Smaller pore size',
          'Reduced oiliness',
          'Hydrated skin',
          'Reduced dark circles',
          'Reduced lip pigmentation',
          'Scar reduction',
          'Brighter skin'
        ],
        required: true
      }
    ]
  },
  {
    id: 'skincare_options',
    title: 'Skincare Preferences',
    condition: (responses: AssessmentResponses) => responses.primary_concern === 'skin',
    questions: [
      {
        id: 'skincare_options',
        label: 'Which skincare products are you interested in? (Select all that apply)',
        type: 'checkbox',
        options: [
          'Face wash',
          'Serum',
          'Moisturizer',
          'Sunscreen',
          'Eye cream',
          'Lip cream',
          'Oral medication',
          'Night serum',
          'Night cream',
          'Face pack',
          'Targeted skin treatment'
        ],
        required: true
      }
    ]
  },
  {
    id: 'allergies',
    title: 'Allergies & Supplements',
    questions: [
      {
        id: 'allergies',
        label: 'Do you have any known allergies?',
        type: 'textarea',
        placeholder: 'List any known allergies or sensitivities...',
        required: false
      },
      {
        id: 'oral_supplements',
        label: 'Are you interested in oral supplements?',
        type: 'checkbox',
        options: ['Multivitamin', 'Collagen', 'Biotin', 'Glutathione'],
        required: false
      }
    ]
  }
]

export default function AnalysisPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<AssessmentResponses>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredSteps = QUESTIONNAIRE_STEPS.filter(step => 
    !step.condition || step.condition(responses)
  )

  const currentStepData = filteredSteps[currentStep]
  const isLastStep = currentStep === filteredSteps.length - 1

  const handleInputChange = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < filteredSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          assessment_type: responses.primary_concern?.toLowerCase() || 'skin',
          responses
        })
      })

      if (response.ok) {
        const result = await response.json()
        window.location.href = `/results/${result.assessment_id}`
      }
    } catch (error) {
      console.error('Error submitting assessment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStepValid = () => {
    return currentStepData.questions.every(question => {
      if (!question.required) return true
      const value = responses[question.id as keyof AssessmentResponses]
      if (question.type === 'checkbox') {
        return Array.isArray(value) && value.length > 0
      }
      return value !== undefined && value !== '' && value !== null
    })
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
            
            {/* Progress Bar */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                Step {currentStep + 1} of {filteredSteps.length}
              </span>
              <div className="w-32 bg-rose-100 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / filteredSteps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg border border-rose-100 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentStepData.title}
              </h1>
              <p className="text-gray-600">
                Please answer the following questions to help us understand your needs better.
              </p>
            </div>

            <div className="space-y-6">
              {currentStepData.questions.map((question) => (
                <div key={question.id} className="space-y-3">
                  <label className="text-lg font-medium text-gray-900 block">
                    {question.label}
                    {question.required && <span className="text-rose-500 ml-1">*</span>}
                  </label>

                  {question.type === 'text' && (
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      value={responses[question.id as keyof AssessmentResponses] as string || ''}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                      placeholder={'placeholder' in question ? question.placeholder : ''}
                    />
                  )}

                  {question.type === 'number' && (
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      value={responses[question.id as keyof AssessmentResponses] as number || ''}
                      onChange={(e) => handleInputChange(question.id, parseInt(e.target.value))}
                    />
                  )}

                  {question.type === 'select' && (
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      value={responses[question.id as keyof AssessmentResponses] as string || ''}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                    >
                      <option value="">Select an option</option>
                      {question.options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}

                  {question.type === 'textarea' && (
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      value={responses[question.id as keyof AssessmentResponses] as string || ''}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                      placeholder={'placeholder' in question ? question.placeholder : ''}
                    />
                  )}

                  {question.type === 'radio' && (
                    <div className="grid grid-cols-1 gap-3">
                      {question.options?.map((option) => (
                        <label key={option} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl hover:bg-rose-50 cursor-pointer">
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            checked={responses[question.id as keyof AssessmentResponses] === option}
                            onChange={(e) => handleInputChange(question.id, e.target.value)}
                            className="text-rose-500 focus:ring-rose-500"
                          />
                          <span className="text-gray-900">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {question.type === 'checkbox' && (
                    <div className="grid grid-cols-1 gap-3">
                      {question.options?.map((option) => (
                        <label key={option} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl hover:bg-rose-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(responses[question.id as keyof AssessmentResponses] as string[] || []).includes(option)}
                            onChange={(e) => {
                              const currentValues = responses[question.id as keyof AssessmentResponses] as string[] || []
                              if (e.target.checked) {
                                handleInputChange(question.id, [...currentValues, option])
                              } else {
                                handleInputChange(question.id, currentValues.filter(v => v !== option))
                              }
                            }}
                            className="text-rose-500 focus:ring-rose-500"
                          />
                          <span className="text-gray-900">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>

              {isLastStep ? (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid() || isSubmitting}
                  className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Complete Analysis</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}