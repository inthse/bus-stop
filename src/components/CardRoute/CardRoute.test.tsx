import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import CardRoute from './index';

const mockRoute = {
  gtfsId: '0',
  shortName: 'short name',
  longName: 'long name',
  bikesAllowed: 'ALLOWED',
};

describe('CardRoute', () => {
  test('route card renders details', () => {
    render(<CardRoute route={mockRoute} />);
    const shortName = screen.getByText(/short name/i);
    expect(shortName).toBeInTheDocument();
    const longName = screen.getByText(/long name/i);
    expect(longName).toBeInTheDocument();
    const bikes = screen.getByRole('img', { name: /bikes allowed/i });
    expect(bikes).toBeInTheDocument();
  });
});
