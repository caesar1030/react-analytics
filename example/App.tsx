import React, { type ReactElement } from 'react'
import { GAEvent, GAPageView, useGAConfig } from '../src'
import { GAProvider } from '../src'

function App(): ReactElement {
  useGAConfig({
    config: {
      send_page_view: true,
      debug_mode: true,
    },
    enabled: true,
  })

  return (
    <GAProvider measurementId="G-VM8MZHYGG5">
      <GAPageView>
        <div className="app">
          <h1>Analytics Test Page</h1>

          <div className="test-section">
            <h2>Event Tracking Test</h2>
            <GAEvent
              eventName="button_click"
              eventParams={{
                category: 'button',
                action: 'click',
                label: 'test-button',
                value: 1,
              }}
            >
              <button>Track Test Event</button>
            </GAEvent>
          </div>

          <div className="test-section">
            <h2>Navigation Test</h2>
            <nav>
              <GAEvent
                eventName="navigation"
                eventParams={{
                  category: 'navigation',
                  action: 'navigate',
                  label: 'home',
                }}
              >
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault()
                    window.history.pushState({}, '', '/')
                  }}
                >
                  Home
                </a>
              </GAEvent>
              {' | '}
              <GAEvent
                eventName="navigation"
                eventParams={{
                  category: 'navigation',
                  action: 'navigate',
                  label: 'about',
                }}
              >
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault()
                    window.history.pushState({}, '', '/about')
                  }}
                >
                  About
                </a>
              </GAEvent>
              {' | '}
              <GAEvent
                eventName="navigation"
                eventParams={{
                  category: 'navigation',
                  action: 'navigate',
                  label: 'contact',
                }}
              >
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault()
                    window.history.pushState({}, '', '/contact')
                  }}
                >
                  Contact
                </a>
              </GAEvent>
            </nav>
          </div>

          <div className="current-path">
            Current Path: {window.location.pathname}
          </div>
        </div>
      </GAPageView>
    </GAProvider>
  )
}

function Root() {
  return (
    <GAProvider measurementId="G-VM8MZHYGG5">
      <App />
    </GAProvider>
  )
}

export default Root
