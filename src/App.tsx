import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'

import routes from './router';
import { RouteInterface } from './base/interface';
import { ModePrivider } from './context/ModePrivider'
import { CountryPrivider } from './context/CountryPrivider'
import { FilteredCountriesPrivider } from './context/FiltedCountriesPrivider'

function App() {
  return (
    <ModePrivider>
      <CountryPrivider>
        <FilteredCountriesPrivider>
          <BrowserRouter>
            <Header />
            <Routes>
              {routes.map((route: RouteInterface, i: number) => {
                return (<Route
                    key={i}
                    path={route.path}
                    element={route.component}
                  />)
              })}
            </Routes>
          </BrowserRouter>
        </FilteredCountriesPrivider>
      </CountryPrivider>
    </ModePrivider>
  );
}

export default App;


