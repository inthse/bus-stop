import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { IdBundle } from '../../types';

type SelectBusStopPropType = {
  label: string;
  options: Array<IdBundle>;
  setValue: (arg0: IdBundle | null) => void;
  value: IdBundle;
};

const SelectBusStop = ({
  label,
  options,
  setValue,
  value,
}: SelectBusStopPropType) => {
  //simple value for what the user is typing
  const [stationInputValue, setStationInputValue] = useState('');
  const handleChange = (newInput: string) => {
    setStationInputValue(newInput);
  };

  return (
    <Autocomplete
      id="bus-stop-field"
      options={options}
      renderInput={(params) => (
        <TextField {...params} required label={label} margin="normal" />
      )}
      fullWidth={true}
      inputValue={stationInputValue}
      onInputChange={(_event, newInputValue) => {
        handleChange(newInputValue);
      }}
      value={value}
      onChange={(_event, newValue) => {
        setValue(newValue);
      }}
    />
  );
};

export default SelectBusStop;
