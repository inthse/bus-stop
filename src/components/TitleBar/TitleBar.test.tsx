import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TitleBar from './index';

describe('TitleBar', () => {
  test('renders site name and language switcher', () => {
    render(<TitleBar lang="en" setLang={() => {}} />);
    const title = screen.getByRole('heading', {name: /Linja/i});
    const en = screen.getByRole('button', {name: /EN/i});
    const fi = screen.getByRole('button', {name: /FI/i});
    expect(title).toBeInTheDocument();
    expect(en).toBeInTheDocument();
    expect(fi).toBeInTheDocument();
  });
});
