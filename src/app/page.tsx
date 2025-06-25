import Link from "next/link";
import { Sparkles, ArrowRight, Heart, Shield, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Aesthetics
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-gray-600 hover:text-rose-600 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/analysis" 
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
            >
              Start Analysis
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Your
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              {" "}Perfect Skin{" "}
            </span>
            Care Routine
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get personalized skincare recommendations based on your unique skin type, 
            concerns, and goals. Transform your skin with products chosen just for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              href="/analysis" 
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all flex items-center space-x-2"
            >
              <span>Start Your Free Analysis</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/how-it-works" 
              className="border-2 border-rose-200 text-rose-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-50 transition-all"
            >
              How It Works
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-rose-100">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Analysis</h3>
              <p className="text-gray-600">
                Complete our comprehensive questionnaire to identify your unique skin needs and concerns.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-rose-100">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Recommendations</h3>
              <p className="text-gray-600">
                Get product suggestions curated by skincare professionals based on your analysis results.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-rose-100">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Star className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Custom Routines</h3>
              <p className="text-gray-600">
                Receive detailed AM and PM skincare routines with step-by-step instructions.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">50+</div>
              <div className="text-gray-600">Premium Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">24/7</div>
              <div className="text-gray-600">Expert Support</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Skin?
            </h2>
            <p className="text-rose-100 mb-8 text-lg">
              Join thousands of satisfied customers who found their perfect skincare routine.
            </p>
            <Link 
              href="/analysis" 
              className="bg-white text-rose-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all inline-flex items-center space-x-2"
            >
              <span>Start Your Analysis Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">Aesthetics</span>
              </div>
              <p className="text-gray-400">
                Your personalized skincare journey starts here.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/analysis" className="hover:text-white transition-colors">Skin Analysis</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link href="/routines" className="hover:text-white transition-colors">Routines</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><a href="https://wa.me/your-number" className="hover:text-white transition-colors">WhatsApp</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Aesthetics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
