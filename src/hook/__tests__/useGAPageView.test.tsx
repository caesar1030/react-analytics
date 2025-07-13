import { renderHook } from '@testing-library/react'
import { describe, it } from 'vitest'
import { useGAPageView } from '@/hook'

const mockGa4Event = vi.fn()

vi.mock('@/provider/GAProvider', () => ({
  useGA: vi.fn(() => ({
    ga4Event: mockGa4Event,
  })),
}))

describe('useGAPageView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('useGAPageView 훅을 호출하면 ga4PageView 메서드를 호출해야 한다.', () => {
    renderHook(() =>
      useGAPageView({
        eventParams: {
          page_title: 'test',
        },
      }),
    )

    expect(mockGa4Event).toHaveBeenCalledWith('page_view', {
      page_title: 'test',
    })
  })

  it('enabled가 false인 경우 ga4Event 메서드를 호출하지 않아야 한다.', () => {
    renderHook(() =>
      useGAPageView({
        eventParams: {
          page_title: 'test',
        },
        enabled: false,
      }),
    )

    expect(mockGa4Event).not.toHaveBeenCalled()
  })
})
