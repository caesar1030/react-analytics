import { renderHook } from '@testing-library/react'
import { describe, it } from 'vitest'
import { useGASet } from '@/hook'

const mockGa4Set = vi.fn()

vi.mock('@/provider/GAProvider', () => ({
  useGA: vi.fn(() => ({
    ga4Set: mockGa4Set,
  })),
}))

describe('useGASet', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('useGASet 훅을 호출하면 ga4Set 메서드를 호출해야 한다.', () => {
    renderHook(() =>
      useGASet({
        args: 'allow_google_signals',
        params: true,
      }),
    )

    expect(mockGa4Set).toHaveBeenCalledWith('allow_google_signals', true)
  })

  it('enabled가 false인 경우 ga4Set 메서드를 호출하지 않아야 한다.', () => {
    renderHook(() =>
      useGASet({
        args: 'allow_google_signals',
        params: true,
        enabled: false,
      }),
    )

    expect(mockGa4Set).not.toHaveBeenCalled()
  })
})
