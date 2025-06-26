import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { GAPageView } from '@/component/GAPageView'
import { GAProvider } from '@/provider/GAProvider'
import { useGAPageView } from '@/hook'

vi.mock('@/hook/useGAPageView', () => ({
  useGAPageView: vi.fn(),
}))

describe('<GAPageView />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('children을 렌더링해야 한다.', () => {
    render(
      <GAProvider measurementId="G-TEST123">
        <GAPageView>
          <div>child</div>
        </GAPageView>
      </GAProvider>,
    )

    expect(screen.getByText('child')).toBeInTheDocument()
  })

  it('렌더링이 되면 useGAPageView 훅을 호출해야 한다.', () => {
    render(
      <GAProvider measurementId="G-TEST123">
        <GAPageView>
          <div>child</div>
        </GAPageView>
      </GAProvider>,
    )

    expect(useGAPageView).toHaveBeenCalled()
  })
})
