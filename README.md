# Aesthetics - Skin Care Analysis Platform

A modern, responsive web application built with Next.js that provides personalized skincare analysis and product recommendations. The platform uses questionnaire-based assessment to understand users' skin needs and suggests tailored skincare routines.

## Features

### Core Functionality
- 📋 **Comprehensive Skin Analysis**: Multi-step questionnaire covering skin type, concerns, goals, and preferences
- 🎯 **Personalized Recommendations**: Rule-based recommendation engine suggesting products based on analysis results
- 📅 **Custom Routine Builder**: AM/PM skincare routines with step-by-step instructions
- 📊 **User Dashboard**: Track analysis history, current routine, and product status
- 🛒 **Shopify Integration**: Direct checkout and product purchasing

### User Experience
- 🎨 **Modern Design**: Aesthetic rose/pink theme with smooth gradients and animations
- 📱 **Responsive Layout**: Mobile-first design that works on all devices
- ⚡ **Fast Performance**: Optimized with Next.js 14 and Tailwind CSS
- 🔒 **User Profiles**: Save analysis results and track skincare journey

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide Icons
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Google OAuth
- **E-commerce**: Shopify Storefront API
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project
- Shopify store (optional, for e-commerce)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd skin-care-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env.local` file in the root directory:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google OAuth (for Supabase Auth)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# Shopify (optional)
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your_store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
```

4. **Database Setup**
Run the SQL schema in your Supabase project:
```bash
# Copy the contents of src/lib/database-schema.sql
# Paste and run in your Supabase SQL editor
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── analysis/                 # Skin analysis questionnaire
│   ├── results/[id]/            # Analysis results and recommendations
│   ├── dashboard/               # User dashboard
│   ├── faq/                     # FAQ page
│   └── api/                     # API routes
│       └── assessment/          # Assessment submission endpoint
├── lib/                         # Utility libraries
│   ├── supabase.ts             # Supabase client configuration
│   ├── shopify.ts              # Shopify integration
│   └── database-schema.sql     # Database schema
├── types/                       # TypeScript type definitions
│   ├── index.ts                # Application types
│   └── database.ts             # Supabase database types
└── components/                  # Reusable components (future)
```

## Key Features Implementation

### 1. Skin Analysis Questionnaire
- Multi-step form with progress tracking
- Conditional questions based on user selections
- Validation and error handling
- Responsive design for mobile devices

### 2. Recommendation Engine
- Rule-based product matching system
- Considers skin type, concerns, and goals
- Prioritized product suggestions
- Usage instructions and frequency

### 3. Routine Builder
- Generates AM/PM routines automatically
- Step-by-step application order
- Time estimates and instructions
- Customizable routine options

### 4. Dashboard
- Analysis history tracking
- Current routine display
- Product reorder functionality
- Progress tracking

## Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the database schema from `src/lib/database-schema.sql`
3. Enable Google OAuth in Authentication settings
4. Add your project URL and anon key to environment variables

### Shopify Integration
1. Create a Shopify store
2. Generate a Storefront API access token
3. Add store domain and access token to environment variables
4. Update product mappings in `src/lib/shopify.ts`

## Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables
Ensure all environment variables are set in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`

## Customization

### Adding New Questions
Update the `QUESTIONNAIRE_STEPS` array in `src/app/analysis/page.tsx`:
```typescript
{
  id: 'new_step',
  title: 'New Step Title',
  questions: [
    {
      id: 'question_id',
      label: 'Question text',
      type: 'radio', // or 'checkbox', 'text', etc.
      options: ['Option 1', 'Option 2'],
      required: true
    }
  ]
}
```

### Modifying Recommendation Rules
Update the recommendation logic in `src/app/api/assessment/submit/route.ts`:
```typescript
if (responses.skin_type === 'Oily' && responses.skin_concerns?.includes('Acne')) {
  recommendations.push({
    product: { /* product details */ },
    priority: 1,
    reason: 'Recommended for oily, acne-prone skin',
    usage: { /* usage instructions */ }
  })
}
```

### Styling Customization
The project uses Tailwind CSS with a custom rose/pink color scheme. Update colors in:
- `src/app/globals.css` for global styles
- Component classes for specific styling

## Support

For questions or issues:
- Check the FAQ page at `/faq`
- Contact support via WhatsApp (configure link in footer)
- Submit issues through your project repository

## License

This project is licensed under the MIT License.
