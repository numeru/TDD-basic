import React from 'react';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import Products from '.';
import { server } from '../../../mocks/server';
import userEvent from '@testing-library/user-event';

describe('test products component', () => {
  it('display product images from server', async () => {
    render(<Products />);

    const productsImages = await screen.findAllByRole('img', {
      name: /product$/i,
    });

    expect(productsImages).toHaveLength(2);
  });

  it('error', async () => {
    server.resetHandlers(
      rest.get('http://localhost:5000/products', (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<Products />);

    const errorBanner = await screen.findByTestId('error_banner');
    expect(errorBanner).toHaveTextContent('에러가 발생했습니다.');
  });

  it('calculate total price', async () => {
    render(<Products />);

    const totalPrice = screen.getByText('Total Price : ', {
      exact: false,
    });

    expect(totalPrice).toHaveTextContent('0');

    const productAmerica = await screen.findByRole('spinbutton', {
      name: 'America',
      exact: false,
    });

    userEvent.type(productAmerica, '1');

    expect(totalPrice).toHaveTextContent('1000');

    const productEngland = await screen.findByRole('spinbutton', {
      name: 'England',
    });

    userEvent.type(productEngland, '3');

    expect(totalPrice).toHaveTextContent('4000');
  });
});
