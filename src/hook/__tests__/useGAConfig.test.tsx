import { renderHook } from '@testing-library/react'
import { describe, it } from 'vitest'
import { useGAConfig } from '@/hook'

const mockGa4Config = vi.fn()

vi.mock('@/provider/GAProvider', () => ({
  useGA: vi.fn(() => ({
    ga4Config: mockGa4Config,
  })),
}))

describe('useGAConfig', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('useGAConfig 훅을 호출하면 ga4Config 메서드를 호출해야 한다.', () => {
    renderHook(() => useGAConfig({ config: { page_title: 'title' } }))

    expect(mockGa4Config).toHaveBeenCalledWith({ page_title: 'title' })
  })

  it('enabled가 false인 경우 ga4Config 메서드를 호출하지 않아야 한다.', () => {
    renderHook(() =>
      useGAConfig({ config: { page_title: 'title' }, enabled: false }),
    )

    expect(mockGa4Config).not.toHaveBeenCalled()
  })
})
