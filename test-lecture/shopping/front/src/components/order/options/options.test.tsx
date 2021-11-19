import React from 'react';
import { render, screen } from '@testing-library/react';
import Options from '.';

describe('option component', () => {
  it('fetch options from server', async () => {
    render(<Options />);

    const optionCheckBoxes = await screen.findAllByRole('checkbox');

    expect(optionCheckBoxes).toHaveLength(2);
  });
});
