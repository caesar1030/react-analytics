# React Analytics

This library provides a simple way to implement Google Analytics 4 (GA4) in your React applications. Track GA4 events, configure settings, manage consent, and more through declarative components or hooks.

## Features

- Declarative Components: Track events and page views using components like `<GAEvent>` and `<GAPageView>` with a clean, declarative syntax.
- Hooks API: Implement complex analytics logic using hooks like `useGAEvent` for more flexibility.
- Automatic Script Injection: The library automatically injects the gtag.js script, eliminating the need for manual setup in your index.html.
- TypeScript Support: Enjoy full type safety and better development experience with comprehensive TypeScript definitions.

## Install

```bash
# Using yarn
yarn add @caesar/react-analytics

# Using npm
npm install @caesar/react-analytics
```


## How To Use

### 1. Provider Setup

First, wrap your application with `GAProvider` at the root level. This provider initializes Google Analytics and makes it available throughout your app.

```tsx
import { GAProvider } from 'react-analytics'

function App() {
  return (
    <GAProvider measurementId="G-XXXXXXXXXX">
      <YourApp />
    </GAProvider>
  )
}
```

### 2. Tracking Examples

#### Page View Tracking
The `GAPageView` component automatically tracks page views when the component mounts. This is useful for tracking specific pages or sections of your application.

```tsx
import { GAPageView } from 'react-analytics'

function ProductPage() {
  return (
    <GAPageView>
      <div>Welcome to our Product Page!</div>
    </GAPageView>
  )
}
```

#### Event Tracking
Use the `GAEvent` component to track user interactions like button clicks, form submissions, or any custom events. The component accepts event parameters that will be sent to Google Analytics.

```tsx
import { GAEvent } from 'react-analytics'

function AddToCartButton() {
  return (
    <GAEvent
      eventName='add_to_cart'
      eventParams={{
        currency: 'KRW',
        value: 25000,
        items: [
          {
            item_id: 'SKU_12345',
            item_name: 'Green T-shirts',
            item_brand: 'Google Merchandise Store',
            item_category: 'Clothes',
            item_variant: 'Green',
            price: 25000,
            quantity: 1
          }
        ]
      }}
    >
      <button>Add to Cart</button>
    </GAEvent>
  )
}
```

#### Configuration
The `GAConfig` component allows you to configure Google Analytics settings. You can use it to enable/disable features or set global parameters.

```tsx
import { GAConfig } from 'react-analytics'

function AnalyticsConfig() {
  return (
    <GAConfig
      config={{
        send_page_view: true,
        // Add other GA4 configuration options here..
      }}
    />
  )
}
```

#### Using Hooks
For more complex scenarios, use the `useGAEvent` hook. This is particularly useful when you need to track events based on custom logic or user interactions.

```tsx
import { useGAEvent } from 'react-analytics'

function CustomAddToCartButton() {
  const { handleClick } = useGAEvent({
    eventName: 'add_to_cart',
    eventParams: {
      currency: 'KRW',
      value: 25000,
      items: [
        {
          item_id: 'SKU_12345',
          item_name: 'Green T-shirts',
          item_brand: 'Google Merchandise Store',
          item_category: 'Clothes',
          item_variant: 'Green',
          price: 25000,
          quantity: 1
        }
      ]
    },
  })

  return <button onClick={handleClick}>Add to cart</button>
}
```

## Caveat

The default value for the ```send_page_view``` option is ```false```. This is to track page views only on the pages you want to, without any configuration.

If you want to automatically collect page view from GA4, set page_view to true in your GA provider config settings. In this case, you should not use the PageView component, hooks.

```tsx
import { GAProvider } from 'react-analytics'

function App() {
  return (
    <GAProvider 
    measurementId="G-XXXXXXXXXX" 
    config={{
      send_page_view: true,
    }}>
      <YourApp />
    </GAProvider>
  )
}
```