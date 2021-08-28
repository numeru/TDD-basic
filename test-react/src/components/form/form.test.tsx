import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Form from 'components/form';

describe('<Form />', () => {
  const setup = () => {
    const onInsert = jest.fn(); // mock 함수
    const queries = render(<Form onInsert={onInsert} />);

    const { getByText, getByPlaceholderText } = queries;

    const input = getByPlaceholderText('enter title.');
    const button = getByText('submit');

    return {
      ...queries,
      input,
      button,
      onInsert,
    };
  };
  it('has input and button', () => {
    const { input, button } = setup();

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('changes input', () => {
    const { getByPlaceholderText } = setup();

    const input = getByPlaceholderText('enter title.');

    fireEvent.change(input, {
      target: {
        value: 'TDD',
      },
    });

    expect(input).toHaveAttribute('value', 'TDD');
  });

  it('calls onInsert and clears input', () => {
    const { input, button, onInsert } = setup();

    fireEvent.change(input, {
      target: {
        value: 'TDD',
      },
    });

    fireEvent.click(button);

    expect(onInsert).toBeCalledWith('TDD');
    expect(input).toHaveAttribute('value', '');
  });
});
