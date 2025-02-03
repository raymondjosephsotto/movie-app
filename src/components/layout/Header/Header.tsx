import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header: React.FC = () => {
    return <header>
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    WatchWorthy
                </Typography>
            </Toolbar>
        </AppBar>
    </header>
}

export default Header;