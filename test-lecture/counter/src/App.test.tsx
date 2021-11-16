import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('test counter', () => {
  it('the counter start at 0', () => {
    const { getByText } = render(<App />);

    const counterValue = getByText('0');
    expect(counterValue).toBeInTheDocument();
  });

  it('plus, minus button exist', () => {
    const { getByRole } = render(<App />);

    const plusButton = getByRole('button', {
      name: '+',
    });
    expect(plusButton).toBeInTheDocument();

    const minusButton = getByRole('button', {
      name: '-',
    });
    expect(minusButton).toBeInTheDocument();
  });

  it('counter increases when click plus button', () => {
    const { getByText } = render(<App />);

    const prevCounterValue = getByText('0');
    expect(prevCounterValue).toBeInTheDocument();

    const plusButton = getByText('+');
    fireEvent.click(plusButton);

    const curCounterValue = getByText('1');
    expect(curCounterValue).toBeInTheDocument();
  });

  it('counter decreases when click minus button', () => {
    const { getByTestId } = render(<App />);

    const counterValue = getByTestId('counter');

    expect(counterValue).toHaveTextContent('0');

    const minusButtonElement = getByTestId('minus-button');

    userEvent.click(minusButtonElement);

    expect(counterValue).toHaveTextContent('-1');
  });
});
