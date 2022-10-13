
import * as React from 'react';
import { Card, CardContent, CardMedia, CardActionArea, Typography} from '@mui/material';
import { CountryItem } from '../base/interface';

interface Props {
    countries: CountryItem[];
}

export default function CountryList({ countries }: Props) {
    return (
        <>
        {
            countries.map((country: CountryItem) => 
                <Card sx={{ maxWidth: 345 }} key={country.fifa}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={country.flag}
                            alt={country.common}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {country.official}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                population: {country.population}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                region: {country.region}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                capital {country.capital}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )
        }
    </>);
}
