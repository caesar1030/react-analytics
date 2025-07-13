import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, beforeEach, vi } from 'vitest'
import { GAProvider } from '@/provider/GAProvider'
import { GAEvent, useGAEvent } from '@/index'

const mockHandleEvent = vi.fn()
vi.mock('@/hook/useGAEvent', () => ({
  useGAEvent: vi.fn(() => ({
    handleEvent: mockHandleEvent,
  })),
}))

describe('<GAEvent />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('children을 렌더링해야 한다.', () => {
    render(
      <GAProvider measurementId="G-TEST123">
        <GAEvent
          eventName="add_to_cart"
          eventParams={{
            currency: 'KRW',
            value: 25000,
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Green T-shirts',
                item_brand: 'Google Merchandise Store',
                item_category: 'Clothes',
                item_variant: 'Green',
                price: 25000,
                quantity: 1,
              },
            ],
          }}
        >
          <button>Add to Cart</button>
        </GAEvent>
      </GAProvider>,
    )

    expect(screen.getByText('Add to Cart')).toBeInTheDocument()
  })

  it('자식 컴포넌트를 클릭하면 handleEvent 함수가 한번 호출되어야 한다.', () => {
    render(
      <GAProvider measurementId="G-TEST123">
        <GAEvent
          eventName="add_to_cart"
          eventParams={{
            currency: 'KRW',
            value: 25000,
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Green T-shirts',
                item_brand: 'Google Merchandise Store',
                item_category: 'Clothes',
                item_variant: 'Green',
                price: 25000,
                quantity: 1,
              },
            ],
          }}
        >
          <button>Add to Cart</button>
        </GAEvent>
      </GAProvider>,
    )

    fireEvent.click(screen.getByText('Add to Cart'))

    expect(mockHandleEvent).toHaveBeenCalledTimes(1)
    expect(mockHandleEvent).toHaveBeenCalledWith(
      // NOTES: MouseEvent
      expect.any(Object),
      // NOTES: 자식 컴포넌트의 onClick 함수가 없으므로 undefined
      undefined,
    )
  })

  it('자식 컴포넌트에 onClick이 있으면 handleEvent에 전달되어야 한다.', () => {
    const mockOnClick = vi.fn()

    render(
      <GAProvider measurementId="G-TEST123">
        <GAEvent
          eventName="add_to_cart"
          eventParams={{
            currency: 'KRW',
            value: 25000,
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Green T-shirts',
                item_brand: 'Google Merchandise Store',
                item_category: 'Clothes',
                item_variant: 'Green',
                price: 25000,
                quantity: 1,
              },
            ],
          }}
        >
          <button onClick={mockOnClick}>Add to Cart</button>
        </GAEvent>
      </GAProvider>,
    )

    fireEvent.click(screen.getByText('Add to Cart'))

    expect(mockHandleEvent).toHaveBeenCalledTimes(1)
    expect(mockHandleEvent).toHaveBeenCalledWith(
      // NOTES: MouseEvent
      expect.any(Object),
      // NOTES: 자식 컴포넌트의 onClick 함수
      mockOnClick,
    )
  })

  it('enabled가 false인 경우 useGAEvent 훅을 enabled가 false로 호출해야 한다.', () => {
    render(
      <GAProvider measurementId="G-TEST123">
        <GAEvent
          eventName="add_to_cart"
          eventParams={{
            currency: 'KRW',
            value: 25000,
          }}
          enabled={false}
        >
          <button>Add to Cart</button>
        </GAEvent>
      </GAProvider>,
    )

    expect(useGAEvent).toHaveBeenCalledWith({
      eventName: 'add_to_cart',
      eventParams: {
        currency: 'KRW',
        value: 25000,
      },
      enabled: false,
    })
  })
})
