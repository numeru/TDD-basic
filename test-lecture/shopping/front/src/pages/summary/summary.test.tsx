import React from 'react';
import { render, screen } from '@testing-library/react';
import SummaryPage from '.';
import userEvent from '@testing-library/user-event';

describe('summary page test', () => {
  it('checkbox and button', () => {
    render(<SummaryPage />);

    const checkbox = screen.getByLabelText('주문을 확인했습니다.');

    const confirmButton = screen.getByRole('button', {
      name: '주문 확인',
    });

    expect((checkbox as HTMLInputElement).checked).toBeFalsy();

    expect((confirmButton as HTMLButtonElement).disabled).toBeTruthy();

    userEvent.click(checkbox);

    expect((checkbox as HTMLInputElement).checked).toBeTruthy();

    expect((confirmButton as HTMLInputElement).disabled).toBeFalsy();
  });
});
