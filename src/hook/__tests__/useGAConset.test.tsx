import { renderHook } from '@testing-library/react'
import { describe, it } from 'vitest'
import { useGAConsent } from '@/hook'

const mockGa4Consent = vi.fn()

vi.mock('@/provider/GAProvider', () => ({
  useGA: vi.fn(() => ({
    ga4Consent: mockGa4Consent,
  })),
}))

describe('useGAConset', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('useGAConset 훅을 호출하면 ga4Config 메서드를 호출해야 한다.', () => {
    renderHook(() =>
      useGAConsent({
        args: 'default',
        params: { ad_personalization: 'granted' },
      }),
    )

    expect(mockGa4Consent).toHaveBeenCalledWith('default', {
      ad_personalization: 'granted',
    })
  })

  it('enabled가 false인 경우 ga4Conset 메서드를 호출하지 않아야 한다.', () => {
    renderHook(() =>
      useGAConsent({
        args: 'default',
        params: { ad_personalization: 'granted' },
        enabled: false,
      }),
    )

    expect(mockGa4Consent).not.toHaveBeenCalled()
  })
})
