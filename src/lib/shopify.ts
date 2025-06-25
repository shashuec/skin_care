// Simple Shopify integration for product checkout
export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  price: string
  image: string
  variants: ShopifyVariant[]
}

export interface ShopifyVariant {
  id: string
  title: string
  price: string
  available: boolean
}

export const shopifyConfig = {
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
}

// Redirect to Shopify checkout with products
export const redirectToShopifyCheckout = (productIds: string[]) => {
  const domain = shopifyConfig.domain
  if (!domain) {
    console.error('Shopify domain not configured')
    return
  }

  // Create checkout URL with product variants
  // Format: https://store.myshopify.com/cart/variant_id:quantity,variant_id:quantity
  const cartItems = productIds.map(id => `${id}:1`).join(',')
  const checkoutUrl = `https://${domain}/cart/${cartItems}`
  
  window.open(checkoutUrl, '_blank')
}

// Redirect to individual product page
export const redirectToShopifyProduct = (productHandle: string) => {
  const domain = shopifyConfig.domain
  if (!domain) {
    console.error('Shopify domain not configured')
    return
  }

  const productUrl = `https://${domain}/products/${productHandle}`
  window.open(productUrl, '_blank')
}

// Mock product data - in real app, this would come from Shopify API
export const mockShopifyProducts: Record<string, ShopifyProduct> = {
  'facewash-acne-oily': {
    id: 'gid://shopify/Product/1',
    title: 'Salicylic Acid Face Wash',
    handle: 'salicylic-acid-face-wash',
    description: 'Perfect for oily, acne-prone skin',
    price: '899.00',
    image: '/products/salicylic-face-wash.jpg',
    variants: [
      {
        id: 'gid://shopify/ProductVariant/1',
        title: 'Default Title',
        price: '899.00',
        available: true
      }
    ]
  },
  'serum-acne': {
    id: 'gid://shopify/Product/2',
    title: 'Niacinamide 10% Serum',
    handle: 'niacinamide-serum',
    description: 'Reduces acne and controls oil',
    price: '1299.00',
    image: '/products/niacinamide-serum.jpg',
    variants: [
      {
        id: 'gid://shopify/ProductVariant/2',
        title: 'Default Title',
        price: '1299.00',
        available: true
      }
    ]
  },
  'moisturizer-oily': {
    id: 'gid://shopify/Product/3',
    title: 'Oil-Free Gel Moisturizer',
    handle: 'oil-free-gel-moisturizer',
    description: 'Lightweight hydration for oily skin',
    price: '999.00',
    image: '/products/gel-moisturizer.jpg',
    variants: [
      {
        id: 'gid://shopify/ProductVariant/3',
        title: 'Default Title',
        price: '999.00',
        available: true
      }
    ]
  },
  'sunscreen-daily': {
    id: 'gid://shopify/Product/4',
    title: 'Broad Spectrum SPF 50',
    handle: 'broad-spectrum-spf-50',
    description: 'Daily protection against UV rays',
    price: '1099.00',
    image: '/products/sunscreen-spf50.jpg',
    variants: [
      {
        id: 'gid://shopify/ProductVariant/4',
        title: 'Default Title',
        price: '1099.00',
        available: true
      }
    ]
  }
}