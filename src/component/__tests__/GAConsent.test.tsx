import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { GAProvider } from '@/provider/GAProvider'
import { useGAConsent } from '@/hook'
import { GAConsent } from '@/index'

vi.mock('@/hook/useGAConsent', () => ({
  useGAConsent: vi.fn(),
}))

describe('<GAConsent />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('children을 렌더링해야 한다.', () => {
    render(
      <GAProvider measurementId="G-TEST123">
        <GAConsent args="default" params={{ ad_personalization: 'granted' }}>
          <div>child</div>
        </GAConsent>
      </GAProvider>,
    )

    expect(screen.getByText('child')).toBeInTheDocument()
  })

  it('렌더링이 되면 useGAConsent 훅을 호출해야 한다.', () => {
    render(
      <GAProvider measurementId="G-TEST123">
        <GAConsent args="default" params={{ ad_personalization: 'granted' }}>
          <div>child</div>
        </GAConsent>
      </GAProvider>,
    )

    expect(useGAConsent).toHaveBeenCalled()
  })

  it('enabled가 false인 경우 useGAConsent 훅을 enabled가 false로 호출해야 한다.', () => {
    render(
      <GAProvider measurementId="G-TEST123">
        <GAConsent
          args="default"
          params={{ ad_personalization: 'granted' }}
          enabled={false}
        >
          <div>child</div>
        </GAConsent>
      </GAProvider>,
    )

    expect(useGAConsent).toHaveBeenCalledWith({
      args: 'default',
      params: { ad_personalization: 'granted' },
      enabled: false,
    })
  })
})
