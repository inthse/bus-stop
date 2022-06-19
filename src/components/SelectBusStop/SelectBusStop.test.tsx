import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import labels from '../../translations.json';
import { defaultShortStop } from '../../utility/constants';
import SelectBusStop from './index';

describe('SelectBusStop', () => {
  test('combo box renders options', () => {
    render(
      <SelectBusStop
        labels={labels.en.app}
        loading={false}
        options={[defaultShortStop]}
        setValue={() => {}}
        searchValue={() => {}}
        value={defaultShortStop}
      />
    );
    const inputElement = screen.getByRole('combobox', {name: /Bus Stop/i});
    expect(inputElement).toBeInTheDocument();
  });
});
