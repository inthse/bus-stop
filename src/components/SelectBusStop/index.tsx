import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { ShortStop } from '../../types';

type SelectBusStopPropType = {
  label: string;
  options: Array<ShortStop>;
  setValue: (arg0: ShortStop | null) => void;
  value: ShortStop;
};

const SelectBusStop = ({
  label,
  options,
  setValue,
  value,
}: SelectBusStopPropType) => {
  //simple value for what the user is typing
  const [stopInputValue, setStopInputValue] = useState('');
  const handleChange = (newInput: string) => {
    setStopInputValue(newInput);
  };

  return (
    <Autocomplete
      id="select-bus-stop"
      options={options}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.gtfsId}>
            {option.name} ({option.gtfsId})
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} required label={label} margin="normal" />
      )}
      fullWidth={true}
      inputValue={stopInputValue}
      onInputChange={(_event, newInputValue) => {
        handleChange(newInputValue);
      }}
      value={value}
      onChange={(_event, newValue) => {
        setValue(newValue);
      }}
      blurOnSelect={true}
    />
  );
};

export default SelectBusStop;
