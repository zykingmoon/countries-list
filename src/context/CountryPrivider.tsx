import React, {FC, ReactNode, useState, useEffect} from 'react';
import { getCountries } from '../api';
import { CountryOriItem, CountryItem } from '../base/interface';

interface Props {
  children: ReactNode | ReactNode[];
};
export const CountriesContext = React.createContext<CountryItem[]>([]);
export const RegionContext = React.createContext<string[]>([]);

const handleCountries = (countriesData: CountryOriItem[]) => {
  const regions: {[index: string]: string} = {};
  const countries: CountryItem[] = [];
  if (countriesData && countriesData[0]) {
    countriesData.map((item: CountryOriItem, index: number) => {
        item?.region && (regions[item.region] = item.region);
        const nativeName = (item.name && item.name.nativeName && item.name.nativeName.length && Object.values(item?.name?.nativeName)?.[0]?.common) || '';
        const currencyObjList = item.currencies && Object.values(item.currencies);
        const currencyList = (currencyObjList && currencyObjList.map((currencyObject) => currencyObject.name).join(',')) || ''
        countries.push({
            fifa: item.fifa,
            official: item?.name?.official || '',
            numericCode: item.ccn3 || index + '',
            common: item?.name?.common || '',
            nativeName,
            tld: item?.tld?.[0] || '',
            capital: item?.capital?.[0] || '',
            region: item.region,
            subregion: item.subregion,
            borders: item?.borders?.join(',') || '',
            languages: (item.languages && Object.values(item.languages).join(',')) || '',
            currencies: currencyList || '',
            population: String(item.population).replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,'),
            flag: item.flags.svg
        })
    })
  }
  return {
    regionList: Object.values(regions),
    countryList: countries
  }
}

export const CountryPrivider:FC<Props> = ({children}: Props) => {
  const [countriesList, setCountriesList] = useState<CountryItem[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);

  const fetchCountries = async () => {
      try {
        const {data} = await getCountries('v3.1/all');
        const {regionList, countryList} = handleCountries(data)
        console.log('countryList', countryList)
        console.log('regionList', regionList)
        setRegions(regionList);
        setCountriesList(countryList);
      } catch (e) {
        console.log('Request Failed', e);
      }
  }
  
  useEffect(() => {
    console.log('CountryPrivider', countriesList)
    if (!countriesList.length){
      setLoading(true);
      fetchCountries();
    }
  }, [])
  
  return (
    <CountriesContext.Provider value={countriesList}>
      <RegionContext.Provider value={regions}>
        {children}
      </RegionContext.Provider>
    </CountriesContext.Provider>
  );
}



