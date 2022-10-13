
import * as React from 'react';

import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActionArea, Typography, Grid, Box, Container} from '@mui/material';
import { CountryItem } from '../base/interface';
// import { CountriesContext } from '../context/CountryPrivider';
import { FilteredContext } from '../context/FiltedCountriesPrivider';
import Filters from './Filters'


export default function CountryPage() {
  // const countries = React.useContext(CountriesContext);
  const countries = React.useContext(FilteredContext);
  console.log('CountryPage', countries)
  return (
    <Box sx={(theme) => ({
        // ...theme.typography.body,
        fontFamily: 'NunitoSans',
        backgroundColor: theme.palette.background.default,
      })}>
      <Container maxWidth="lg">
        <Filters />
        <Grid container spacing={9}>
        {
            countries.map((country: CountryItem) => 
              <Grid item sm={12} lg={3} key={country.numericCode}>
                <Card sx={{ maxWidth: 345 }}>
                  {/* <Link to={`/details/${country.numericCode}`}> */}
                    <CardActionArea component={Link} to={`/details/${country.numericCode}`}>
                        <CardMedia
                            component="img"
                            height="160"
                            image={country.flag}
                            alt={country.common}
                        />
                        <CardContent 
                          sx={{
                            px: 3, 
                            py: 4, 
                            '& p.MuiTypography-body2': {pb: 1, color: "text.primary"}, 
                            '& span.MuiTypography-body2': {pl: 1, color: "text.secondary"}
                          }}
                        >
                            <Typography gutterBottom variant="h5" component="div" sx={{pb: 3}}>
                              {country.common}
                            </Typography>
                            <Typography variant="body2">
                              population: 
                              <Typography component="span">
                                {country.population}
                              </Typography>
                            </Typography>
                            <Typography variant="body2">
                              region: 
                              <Typography component="span">
                                {country.region}
                              </Typography>
                            </Typography>
                            <Typography variant="body2">
                              capital: 
                              <Typography component="span">
                                {country.capital}
                              </Typography>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                  {/* </Link> */}
                </Card>
              </Grid>
            )
        }
        </Grid>
      </Container>
    </Box>
  );
}

