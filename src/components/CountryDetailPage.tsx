
import React, {useEffect, useState} from 'react';
import { Grid, Button, Typography, Box, Container, Stack, Link} from '@mui/material';
import { CountryItem } from '../base/interface';
import { CountriesContext } from '../context/CountryPrivider';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

interface borderProp {
    name: string;
    numericCode: string;
}

const leftGridData = [
    {
        label: 'native name',
        schema: 'nativeName',
    },
    {
        label: 'population',
        schema: 'population',
    },
    {
        label: 'region',
        schema: 'region',
    },
    {
        label: 'sub region',
        schema: 'subregion',
    },
    {
        label: 'capital',
        schema: 'capital',
    }
];

const rightGridData = [
    {
        label: 'top level domain',
        schema: 'tld',
    },
    {
        label: 'currencies',
        schema: 'currencies',
    },
    {
        label: 'languages',
        schema: 'languages',
    }
];

export default function CountryDetail() {
    const {id} = useParams();
    const [country, setCountry] = useState<CountryItem | null>(null);
    const [borders, setBorders] = useState<borderProp[]>([]);
    const countries = React.useContext(CountriesContext);
    useEffect(() => {
        const matchedCountry = countries.filter((item: CountryItem) => item.numericCode == id);
        console.log('id', id, matchedCountry)
        if (matchedCountry?.[0]) {
            setCountry(matchedCountry[0]);
            const bdrs = `,${matchedCountry[0].borders},`;
            console.log('bdrs', bdrs)
            if (bdrs !== ',,') {
                const bdrsArr: borderProp[] = [];
                countries.map((country: CountryItem) => {
                    if(country.fifa && country.numericCode && bdrs.match(`,${country.fifa},`)) {
                        bdrsArr.push({
                            name: country.common,
                            numericCode: country.numericCode
                        })
                    }
                })
                console.log('bdrsArr', bdrsArr)
                setBorders(bdrsArr);
            }
        }
    }, [countries])
    return (
        <Box sx={(theme) => ({
            backgroundColor: theme.palette.background.paper,
        })}>
            <Container maxWidth="lg">
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    py={9}
                >
                        <Button
                            component={Link}
                            color="primary"
                            size="large"
                            href="/home"
                            sx={{ boxShadow: 3, width: '142px'}}
                            startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                        >
                            Back
                        </Button>
                </Stack>
            {
            country ? <Grid container spacing={15}>
                <Grid item sm={5} lg={5} >
                    <img
                        src={country.flag}
                        alt={country.common}
                        loading="lazy"
                        width="100%"
                    />
                </Grid>
                <Grid item sm={7} lg={7}>
                    <Box 
                        sx={{
                            py: 4, 
                            textTransform: "capitalize",
                            '& p.MuiTypography-body1': {pb: 1, color: "text.primary"}, 
                            '& span.MuiTypography-body1': {pl: 1, color: "text.secondary"}
                        }}
                    >
                        <Typography gutterBottom variant="h3" component="div" color="text.primary">
                            {country.official}
                        </Typography>
                        <Box>
                            <Grid container spacing={5}>
                                <Grid item sm={12} lg={6}>
                                    {
                                        leftGridData.map((item: {label: string; schema: string}) => (
                                            <Typography variant="body1" key={item.schema}>
                                                {item.label}: 
                                                <Typography component="span">
                                                    {country[item.schema]}
                                                </Typography>
                                            </Typography>
                                        ))
                                    }
                                </Grid>
                                <Grid item sm={12} lg={6}>
                                    {
                                        rightGridData.map((item: {label: string; schema: string}) => (
                                            <Typography variant="body1" key={item.schema}>
                                                {item.label}: 
                                                <Typography component="span">
                                                    {country[item.schema]}
                                                </Typography>
                                            </Typography>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                        </Box>
                        {borders.length > 0 && 
                        <Typography variant="body1" sx={{pt: 4}}>
                            Border Countries: {borders.map((border) => <Button
                                component={Link}
                                color="primary"
                                size="small"
                                href={`/details/${border.numericCode}`}
                                key={border.numericCode}
                                sx={{ boxShadow: 3, borderColor: 'transparent', width: '100px', textTransform: "capitalize", ml: 1}}
                            >
                                {border.name}
                            </Button>)}
                        </Typography>}
                    </Box>
                </Grid>
                
            </Grid>
            : null}
            </Container>
        </Box>
    );
}
