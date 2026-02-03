import React from 'react';
import { Toolbar, Typography, Button } from '@mui/material';
import styles from './Header.module.scss';

interface HeaderProps {
    category: 'movie' | 'tv';
    setCategory: (category: 'movie' | 'tv') => void;
}

const Header: React.FC<HeaderProps> = ({ category, setCategory }) => {
    return (
        <header className={styles.navbar}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant='h6' component='div'>
                    WatchWorthy
                </Typography>
                {/* Filter Buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                        variant={category === 'movie' ? 'contained' : 'outlined'}
                        onClick={() => setCategory('movie')}
                    >
                        Movies
                    </Button>
                    <Button
                        variant={category === 'tv' ? 'contained' : 'outlined'}
                        onClick={() => setCategory('tv')}
                    >
                        TV Shows
                    </Button>
                </div>
            </Toolbar>
        </header>
    );
};

export default Header;