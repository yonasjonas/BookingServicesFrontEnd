import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];


export default function MultipleSelectNative() {
    const [weekName, setWeekName] = React.useState([]);
    const handleChangeMultiple = (event) => {
      const { options } = event.target;
      const value = [];
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setWeekName(value);
    };
  
    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
          <InputLabel shrink htmlFor="select-multiple-native">
            Native
          </InputLabel>
          <Select
            multiple
            native
            value={weekName}
            // @ts-ignore Typings are not considering `native`
            onChange={handleChangeMultiple}
            label="Native"
            inputProps={{
              id: 'select-multiple-native',
            }}
          >
            {weekdays.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }