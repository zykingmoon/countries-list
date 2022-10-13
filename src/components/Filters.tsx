
import React, {useState, useEffect, useContext} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputLabel, MenuItem, FormControl, InputAdornment, Stack } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { RegionContext } from '../context/CountryPrivider';
import { FilterContext } from '../context/FiltedCountriesPrivider';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
      const timeout = setTimeout(() => {
          setDebouncedValue(value);
      }, delay)
      return () => {
          clearTimeout(timeout);
      }
  }, [value, delay])

  return debouncedValue
}

export default function Filters() {
  const regions = useContext(RegionContext);
  const filterChange = useContext(FilterContext);
  const [region, setRegion] = useState('');
  const [keyword, setKeyword] = useState('');
  const debouncedSearchQuery = useDebounce(keyword, 500);
  const handleRegionChange = (event: SelectChangeEvent) => {
    const rg:string = event.target.value;
    setRegion(rg);
    filterChange.setFilter(rg, keyword);
  };
  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const kw:string = event.target.value;
    setKeyword(kw);
  };

  useEffect(() => {
    filterChange.setFilter(region, debouncedSearchQuery.toLowerCase());
  }, [debouncedSearchQuery]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      py={5}
      sx={{justifyContent: 'space-between'}}
    >
      <Box sx={{ width: 480 }}>
        <TextField
          id="search"
          fullWidth
          placeholder="Search for a country..."
          value={keyword}
          onChange={handleKeywordChange}
          sx={{ boxShadow: 3, borderColor: 'transparent'}}
          InputProps={{
            startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faMagnifyingGlass} /></InputAdornment>,
          }}
        />
      </Box>
      <Box sx={{ flexGrow: 0, width: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="region-label">Filter by region</InputLabel>
          <Select
            labelId="region-label"
            id="region"
            value={region}
            label="Filter by region"
            onChange={handleRegionChange}
            sx={{ boxShadow: 3, borderColor: 'transparent'}}
          >
              {
                  regions.map((item: string) => {
                      return (<MenuItem value={item} key={item}>{item}</MenuItem>);
                  })
              }
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
}
