
export interface CountryOriItem {
    fifa: string;
    name?: {
        common: string;
        official: string;
        nativeName?: {[index: string]: {common: string;}};
    }
    ccn3: string;
    tld?: string[];
    capital?: string[];
    region: string;
    subregion: string;
    languages?: {[index: string]: string};
    borders?: string[];
    population: number;
    flags: {
        svg: string;
    };
    currencies: {
        [index: string]: {name: string;}
    }
}
export interface CountryItem {
    [index: string]: string;
}
export interface CountryContextProps {
    countries: CountryItem[];
    setCountries: () => void;
  };
interface routeInterface {
    path: string,
    component: any,
    routes?: Array<any>
  }
  
export type RouteInterface = routeInterface
