import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { GASet } from '@/component/GASet'
import { GAProvider } from '@/provider/GAProvider'
import { useGASet } from '@/hook'

vi.mock('@/hook/useGASet', () => ({
  useGASet: vi.fn(),
}))

describe('<GASet />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('children을 렌더링해야 한다.', () => {
    render(
      <GAProvider measurementId="G-TEST123">
        <GASet args={'allow_ad_personalization_signals'} params={true}>
          <div>child</div>
        </GASet>
      </GAProvider>,
    )

    expect(screen.getByText('child')).toBeInTheDocument()
  })

  it('렌더링이 되면 useGASet 훅을 호출해야 한다.', () => {
    render(
      <GAProvider measurementId="G-TEST123">
        <GASet args={'allow_ad_personalization_signals'} params={true}>
          <div>child</div>
        </GASet>
      </GAProvider>,
    )

    expect(useGASet).toHaveBeenCalledWith({
      args: 'allow_ad_personalization_signals',
      params: true,
      enabled: true,
    })
  })
})
