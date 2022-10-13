import React, {FC, ReactNode, createContext, useState, useEffect, useContext, useMemo} from 'react';
import { CountriesContext } from './CountryPrivider';
import { CountryItem } from '../base/interface';

interface Props {
  children: ReactNode | ReactNode[];
};

export const FilteredContext = createContext<CountryItem[]>([]);
export const FilterContext = createContext({ setFilter: (region: string, keyword: string) => {} });

export const FilteredCountriesPrivider:FC<Props> = ({children}: Props) => {
  const countries = useContext(CountriesContext);
  const [fCountries, setFCountries] = useState<CountryItem[]>(countries)
  const filterChange = useMemo(
    () => ({
      setFilter: (region: string, keyword: string) => {
        if (!region && !keyword) {
          setFCountries(countries);
          return ;
        } 
        let matchedCountry:CountryItem[] = countries.filter(
          (item: CountryItem) => {
            const matchkeyword = keyword ? (item.common.toLowerCase().match(keyword) || item.region.toLowerCase().match(keyword) || item.capital.toLowerCase().match(keyword)) : true;
            return region ? (item.region === region) && matchkeyword
                          : matchkeyword
          }
        );
        setFCountries(matchedCountry);
      },
    }),
    [countries]
  );
  useEffect(() => {
    setFCountries(countries);
  }, [countries]);

  return (
    <FilterContext.Provider value={filterChange}>
      <FilteredContext.Provider value={fCountries}>
        {children}
      </FilteredContext.Provider>
    </FilterContext.Provider>
  );
}




