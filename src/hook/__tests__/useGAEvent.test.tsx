import { act, renderHook } from '@testing-library/react'
import { describe, it } from 'vitest'
import { useGAEvent } from '@/hook'

const mockGa4Event = vi.fn()

vi.mock('@/provider/GAProvider', () => ({
  useGA: vi.fn(() => ({
    ga4Event: mockGa4Event,
  })),
}))

describe('useGAEvent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('useGAEvent 훅을 호출하면 ga4Event 메서드를 호출해야 한다.', () => {
    const { result } = renderHook(() =>
      useGAEvent({
        eventName: 'ad_impression',
        eventParams: {
          ad_id: '123',
          ad_format: 'banner',
          ad_location: 'top',
          ad_name: 'test',
          ad_placement: 'test',
          ad_size: '300x250',
          ad_unit_id: '123',
        },
      }),
    )

    act(() => {
      result.current.handleEvent({} as any)
    })

    expect(mockGa4Event).toHaveBeenCalledWith('ad_impression', {
      ad_id: '123',
      ad_format: 'banner',
      ad_location: 'top',
      ad_name: 'test',
      ad_placement: 'test',
      ad_size: '300x250',
      ad_unit_id: '123',
    })
  })

  it('enabled가 false인 경우 ga4Event 메서드를 호출하지 않아야 한다.', () => {
    const { result } = renderHook(() =>
      useGAEvent({
        eventName: 'ad_impression',
        eventParams: {
          ad_id: '123',
          ad_format: 'banner',
          ad_location: 'top',
          ad_name: 'test',
          ad_placement: 'test',
          ad_size: '300x250',
          ad_unit_id: '123',
        },
        enabled: false,
      }),
    )

    act(() => {
      result.current.handleEvent({} as any)
    })

    expect(mockGa4Event).not.toHaveBeenCalled()
  })
})
