import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import labels from '../../translations.json';
import { defaultStop } from '../../utility/constants';
import CardBusStop from './index';

describe('CardRoute', () => {
  test('route card renders details and sections', () => {
    render(<CardBusStop labels={labels.en} stop={defaultStop} />);

    const detailsAccordion = screen.getByRole('button', {name: /Stop Details/i});
    expect(detailsAccordion).toBeInTheDocument();

    const zone = screen.getByText(/Zone/i);
    expect(zone).toBeInTheDocument();

    const emptyBusList = screen.getByText(/No busses listed/i);
    expect(emptyBusList).toBeInTheDocument();
    
    const wheelchair = screen.getByRole('img', { name: /wheelchair access unknown/i });
    expect(wheelchair).toBeInTheDocument();
  });
});
