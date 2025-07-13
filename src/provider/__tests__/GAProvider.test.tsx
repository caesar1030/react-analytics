import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, type MockedClass } from 'vitest'
import { GAProvider, useGA } from '../GAProvider'
import { GA4 } from '@/core'

vi.mock('@/core', () => ({
  GA4: vi.fn(),
}))

const MockGA4 = GA4 as MockedClass<typeof GA4>

let mockAnalytics: any

mockAnalytics = {
  initialize: vi.fn(),
  event: vi.fn(),
  config: vi.fn(),
  consent: vi.fn(),
  set: vi.fn(),
  configInfo: { page_title: 'test' },
}

MockGA4.mockImplementation(() => mockAnalytics)

const TestComponent = () => {
  const { config, ga4Event, ga4Config, ga4Consent, ga4Set } = useGA()
  return (
    <div>
      <div>{JSON.stringify(config)}</div>
      <button onClick={() => ga4Event('page_view', { page_title: 'test' })}>
        Event
      </button>
      <button onClick={() => ga4Config({ page_title: 'test' })}>Config</button>
      <button
        onClick={() => ga4Consent('default', { analytics_storage: 'granted' })}
      >
        Consent
      </button>
      <button onClick={() => ga4Set('page_title', 'test')}>Set</button>
    </div>
  )
}

describe('GAProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GA4 초기화', () => {
    it('measurementId로 GA4 인스턴스를 생성해야 한다.', () => {
      render(
        <GAProvider measurementId="G-TEST123">
          <div>Test</div>
        </GAProvider>,
      )

      expect(MockGA4).toHaveBeenCalledWith('G-TEST123')
    })

    it('최초 1회 initialize를 호출해야 한다.', () => {
      const testConfig = { page_title: 'test page' }

      render(
        <GAProvider measurementId="G-TEST123" config={testConfig}>
          <div>Test</div>
        </GAProvider>,
      )

      expect(mockAnalytics.initialize).toHaveBeenCalledWith(testConfig)
    })

    it('config가 없으면 initialize를 빈 객체로 호출해야 한다', () => {
      render(
        <GAProvider measurementId="G-TEST123">
          <div>Test</div>
        </GAProvider>,
      )

      expect(mockAnalytics.initialize).toHaveBeenCalledWith(undefined)
    })

    it('measurementId가 변경되면 새로운 GA4 인스턴스를 생성해야 한다.', () => {
      const { rerender } = render(
        <GAProvider measurementId="G-TEST123">
          <div>Test</div>
        </GAProvider>,
      )

      expect(MockGA4).toHaveBeenCalledTimes(1)
      expect(MockGA4).toHaveBeenCalledWith('G-TEST123')

      rerender(
        <GAProvider measurementId="G-TEST456">
          <div>Test</div>
        </GAProvider>,
      )

      expect(MockGA4).toHaveBeenCalledTimes(2)
      expect(MockGA4).toHaveBeenCalledWith('G-TEST456')
    })

    it('config가 변경되면 initialize를 다시 호출해야 한다.', () => {
      const { rerender } = render(
        <GAProvider measurementId="G-TEST123" config={{ page_title: 'page1' }}>
          <div>Test</div>
        </GAProvider>,
      )

      expect(mockAnalytics.initialize).toHaveBeenCalledWith({
        page_title: 'page1',
      })

      rerender(
        <GAProvider measurementId="G-TEST123" config={{ page_title: 'page2' }}>
          <div>Test</div>
        </GAProvider>,
      )

      expect(mockAnalytics.initialize).toHaveBeenCalledWith({
        page_title: 'page2',
      })
    })
  })

  describe('Context 값', () => {
    it('children을 렌더링해야 한다.', () => {
      render(
        <GAProvider measurementId="G-TEST123">
          <div>Child Component</div>
        </GAProvider>,
      )

      expect(screen.getByText('Child Component')).toBeInTheDocument()
    })

    it('analytics.configInfo를 config로 제공해야 한다.', () => {
      mockAnalytics.configInfo = { custom_parameter: 'test_value' }

      render(
        <GAProvider measurementId="G-TEST123">
          <TestComponent />
        </GAProvider>,
      )

      expect(
        screen.getByText(JSON.stringify({ custom_parameter: 'test_value' })),
      ).toBeInTheDocument()
    })

    it('모든 GA4 메서드가 올바르게 바인딩되어야 한다.', () => {
      render(
        <GAProvider measurementId="G-TEST123">
          <TestComponent />
        </GAProvider>,
      )

      screen.getByText('Event').click()
      screen.getByText('Config').click()
      screen.getByText('Consent').click()
      screen.getByText('Set').click()

      expect(mockAnalytics.event).toHaveBeenCalledOnce()
      expect(mockAnalytics.config).toHaveBeenCalledOnce()
      expect(mockAnalytics.consent).toHaveBeenCalledOnce()
      expect(mockAnalytics.set).toHaveBeenCalledOnce()
    })
  })
})
