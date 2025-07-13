import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { GAProvider } from '@/provider/GAProvider'
import { useGAConfig } from '@/hook'
import { GAConfig } from '@/index'

vi.mock('@/hook/useGAConfig', () => ({
  useGAConfig: vi.fn(),
}))

describe('<GAConfig />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('children을 렌더링해야 한다.', () => {
    render(
      <GAProvider measurementId="G-TEST123">
        <GAConfig config={{ page_title: 'title' }}>
          <div>child</div>
        </GAConfig>
      </GAProvider>,
    )

    expect(screen.getByText('child')).toBeInTheDocument()
  })

  it('렌더링이 되면 useGAConfig 훅을 호출해야 한다.', () => {
    render(
      <GAProvider measurementId="G-TEST123">
        <GAConfig config={{ page_title: 'title' }}>
          <div>child</div>
        </GAConfig>
      </GAProvider>,
    )

    expect(useGAConfig).toHaveBeenCalled()
  })

  it('enabled가 false인 경우 useGAConfig 훅을 enabled가 false로 호출해야 한다.', () => {
    render(
      <GAProvider measurementId="G-TEST123">
        <GAConfig config={{ page_title: 'title' }} enabled={false}>
          <div>child</div>
        </GAConfig>
      </GAProvider>,
    )
  })
})
