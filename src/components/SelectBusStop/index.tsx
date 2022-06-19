import { useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import { NestedLabel, ShortStop } from '../../types';

type SelectBusStopPropType = {
  labels: NestedLabel;
  loading: boolean;
  options: Array<ShortStop>;
  searchValue: (arg0: string) => void;
  setValue: (arg0: ShortStop | null) => void;
  value: ShortStop;
};

const SelectBusStop = ({
  labels,
  loading,
  options,
  searchValue,
  setValue,
  value,
}: SelectBusStopPropType) => {
  //simple value for what the user is typing
  const [stopInputValue, setStopInputValue] = useState('');
  const handleChange = (newInput: string) => {
    setStopInputValue(newInput);
    if(newInput.length > 0) {
      searchValue(newInput);
    }
  };

  return (
    <Autocomplete
      id="select-bus-stop"
      loading={loading}
      loadingText={<CircularProgress />}
      options={options}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.gtfsId}>
            {option.name} ({option.gtfsId ? option.gtfsId : labels.typeToSearch})
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} required label={labels.busStop} margin="normal" />
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
