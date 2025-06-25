import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseClient } from '@/lib/supabase'
import { AssessmentResponses } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { assessment_type, responses }: { assessment_type: string, responses: AssessmentResponses } = await request.json()
    
    const supabase = createSupabaseClient()
    
    // For now, we'll create assessments without user authentication
    // In production, you'd get user_id from the authenticated session
    const user_id = 'anonymous-' + Date.now() // Temporary solution
    
    // Insert assessment
    const { data: assessment, error: assessmentError } = await supabase
      .from('assessments')
      .insert({
        user_id,
        assessment_type,
        responses
      })
      .select()
      .single()

    if (assessmentError) {
      console.error('Assessment insertion error:', assessmentError)
      return NextResponse.json({ error: 'Failed to save assessment' }, { status: 500 })
    }

    // Generate recommendations
    const recommendations = await generateRecommendations(responses, assessment_type)
    
    // Generate routine
    const routine = await generateRoutine(recommendations, responses)

    return NextResponse.json({
      assessment_id: assessment.id,
      recommendations,
      routine,
      message: 'Assessment completed successfully'
    })

  } catch (error) {
    console.error('Assessment submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function generateRecommendations(responses: AssessmentResponses, assessment_type: string) {
  // Rule-based recommendation engine
  const recommendations = []
  
  if (assessment_type === 'skin') {
    // Face wash recommendations
    if (responses.skincare_options?.includes('Face wash')) {
      if (responses.skin_type === 'Oily' || responses.skin_type === 'Combination') {
        if (responses.skin_concerns?.includes('Acne')) {
          recommendations.push({
            product: {
              id: 'facewash-acne-oily',
              name: 'Salicylic Acid Face Wash',
              category: 'Face Wash',
              description: 'Perfect for oily, acne-prone skin',
              price: 899,
              image_url: '/products/salicylic-face-wash.jpg'
            },
            priority: 1,
            reason: 'Recommended for oily skin with acne concerns',
            usage: {
              frequency: 'Twice daily',
              amount: 'Pea-sized amount',
              routine: ['AM', 'PM']
            }
          })
        } else {
          recommendations.push({
            product: {
              id: 'facewash-oily',
              name: 'Tea Tree Face Wash',
              category: 'Face Wash',
              description: 'Controls oil and purifies pores',
              price: 699,
              image_url: '/products/tea-tree-face-wash.jpg'
            },
            priority: 1,
            reason: 'Ideal for oily skin type',
            usage: {
              frequency: 'Twice daily',
              amount: 'Pea-sized amount',
              routine: ['AM', 'PM']
            }
          })
        }
      } else if (responses.skin_type === 'Dry') {
        recommendations.push({
          product: {
            id: 'facewash-dry',
            name: 'Hydrating Cream Cleanser',
            category: 'Face Wash',
            description: 'Gentle cleanser for dry skin',
            price: 799,
            image_url: '/products/hydrating-cleanser.jpg'
          },
          priority: 1,
          reason: 'Gentle formula for dry skin',
          usage: {
            frequency: 'Twice daily',
            amount: 'Pea-sized amount',
            routine: ['AM', 'PM']
          }
        })
      } else {
        recommendations.push({
          product: {
            id: 'facewash-normal',
            name: 'Gentle Daily Cleanser',
            category: 'Face Wash',
            description: 'Perfect for normal skin',
            price: 649,
            image_url: '/products/gentle-cleanser.jpg'
          },
          priority: 1,
          reason: 'Suitable for normal skin type',
          usage: {
            frequency: 'Twice daily',
            amount: 'Pea-sized amount',
            routine: ['AM', 'PM']
          }
        })
      }
    }

    // Serum recommendations
    if (responses.skincare_options?.includes('Serum')) {
      if (responses.skin_concerns?.includes('Acne')) {
        recommendations.push({
          product: {
            id: 'serum-acne',
            name: 'Niacinamide 10% Serum',
            category: 'Serum',
            description: 'Reduces acne and controls oil',
            price: 1299,
            image_url: '/products/niacinamide-serum.jpg'
          },
          priority: 2,
          reason: 'Targets acne and oil control',
          usage: {
            frequency: 'Once daily',
            amount: '2-3 drops',
            routine: ['PM']
          }
        })
      }
      
      if (responses.skin_concerns?.includes('Anti ageing')) {
        recommendations.push({
          product: {
            id: 'serum-anti-aging',
            name: 'Retinol Anti-Aging Serum',
            category: 'Serum',
            description: 'Reduces fine lines and wrinkles',
            price: 1899,
            image_url: '/products/retinol-serum.jpg'
          },
          priority: 2,
          reason: 'Effective for anti-aging concerns',
          usage: {
            frequency: 'Every other night',
            amount: '2-3 drops',
            routine: ['PM']
          }
        })
      }
      
      if (responses.skin_concerns?.includes('Pigmentation')) {
        recommendations.push({
          product: {
            id: 'serum-pigmentation',
            name: 'Vitamin C Brightening Serum',
            category: 'Serum',
            description: 'Reduces dark spots and brightens skin',
            price: 1599,
            image_url: '/products/vitamin-c-serum.jpg'
          },
          priority: 2,
          reason: 'Targets pigmentation and brightening',
          usage: {
            frequency: 'Once daily',
            amount: '2-3 drops',
            routine: ['AM']
          }
        })
      }
    }

    // Moisturizer recommendations
    if (responses.skincare_options?.includes('Moisturizer')) {
      if (responses.skin_type === 'Oily') {
        recommendations.push({
          product: {
            id: 'moisturizer-oily',
            name: 'Oil-Free Gel Moisturizer',
            category: 'Moisturizer',
            description: 'Lightweight hydration for oily skin',
            price: 999,
            image_url: '/products/gel-moisturizer.jpg'
          },
          priority: 3,
          reason: 'Non-comedogenic for oily skin',
          usage: {
            frequency: 'Twice daily',
            amount: 'Pump or two',
            routine: ['AM', 'PM']
          }
        })
      } else if (responses.skin_type === 'Dry') {
        recommendations.push({
          product: {
            id: 'moisturizer-dry',
            name: 'Rich Hydrating Cream',
            category: 'Moisturizer',
            description: 'Deep hydration for dry skin',
            price: 1199,
            image_url: '/products/hydrating-cream.jpg'
          },
          priority: 3,
          reason: 'Rich formula for dry skin',
          usage: {
            frequency: 'Twice daily',
            amount: 'Pump or two',
            routine: ['AM', 'PM']
          }
        })
      } else {
        recommendations.push({
          product: {
            id: 'moisturizer-normal',
            name: 'Daily Hydrating Lotion',
            category: 'Moisturizer',
            description: 'Perfect balance for normal skin',
            price: 899,
            image_url: '/products/daily-lotion.jpg'
          },
          priority: 3,
          reason: 'Balanced hydration for normal skin',
          usage: {
            frequency: 'Twice daily',
            amount: 'Pump or two',
            routine: ['AM', 'PM']
          }
        })
      }
    }

    // Sunscreen (always recommended)
    if (responses.skincare_options?.includes('Sunscreen')) {
      recommendations.push({
        product: {
          id: 'sunscreen-daily',
          name: 'Broad Spectrum SPF 50',
          category: 'Sunscreen',
          description: 'Daily protection against UV rays',
          price: 1099,
          image_url: '/products/sunscreen-spf50.jpg'
        },
        priority: 4,
        reason: 'Essential daily protection',
        usage: {
          frequency: 'Every morning',
          amount: 'Two finger lengths',
          routine: ['AM']
        }
      })
    }
  }

  return recommendations
}

async function generateRoutine(recommendations: any[], responses: AssessmentResponses) {
  const amRoutine = []
  const pmRoutine = []

  // Sort recommendations by priority
  const sortedRecommendations = recommendations.sort((a, b) => a.priority - b.priority)

  for (const rec of sortedRecommendations) {
    if (rec.usage.routine.includes('AM')) {
      amRoutine.push({
        product_id: rec.product.id,
        product_name: rec.product.name,
        order: amRoutine.length + 1,
        frequency: rec.usage.frequency,
        amount: rec.usage.amount,
        instructions: `Apply ${rec.usage.amount} of ${rec.product.name}`
      })
    }
    
    if (rec.usage.routine.includes('PM')) {
      pmRoutine.push({
        product_id: rec.product.id,
        product_name: rec.product.name,
        order: pmRoutine.length + 1,
        frequency: rec.usage.frequency,
        amount: rec.usage.amount,
        instructions: `Apply ${rec.usage.amount} of ${rec.product.name}`
      })
    }
  }

  return {
    AM: amRoutine,
    PM: pmRoutine
  }
}