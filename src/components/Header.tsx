
import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

import { Button, Container, Stack, Typography, useTheme } from '@mui/material';
import { ColorModeContext } from '../context/ModePrivider'

export default function Filters() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Stack sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        boxShadow: 3,
        mb:1,
        height: "80px",
        justifyContent: "center"
      })} >
        <Container maxWidth="lg" sx={{ display: "flex", justifyContent: 'space-between' }}>
            <Typography variant="h3" component="div" color="text.primary" sx={(theme) => ({
                flexGrow: 1,
                fontWeight: theme.typography.fontWeightBold
            })}>
                Where in the world?
            </Typography>
            <Button
                variant="text"
                onClick={colorMode.toggleColorMode}
                color="primary"
                startIcon={theme.palette.mode === 'dark' 
                    ? <FontAwesomeIcon icon={faMoon} /> 
                    : <FontAwesomeIcon icon={faSun} />}
            >
                {theme.palette.mode} Mode
            </Button>
        </Container>
    </Stack>
  );
}