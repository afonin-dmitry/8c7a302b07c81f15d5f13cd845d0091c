import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box/Box';
import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import RePlayer from './RePlayer';
import StopSharpIcon from '@mui/icons-material/StopSharp';

const PlayButton = (props) => {
    return (
        <IconButton size={ 'large' } color={ 'success' } onClick={ props.onClick }>
            <PlayArrowIcon fontSize={ 'large' } />
        </IconButton>
    );
}

const PauseButton = (props) => {
    return (
        <IconButton size={ 'large' } color={ 'default' } onClick={ props.onClick }>
            <PauseIcon fontSize={ 'large' } />
        </IconButton>
    );
}

const Player = (props) => (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} style={{ zIndex: 10 }} elevation={ 5 }>
        <RePlayer played={ props.played } playing={ props.playing } onProgress={ props.onProgress } />
        <Box display="flex" justifyContent="center" alignItems="center">
            { props.playing
                ? <PauseButton onClick={ props.onPause }/>
                : <PlayButton onClick={ props.onStart }/>
            }
        </Box>
    </Paper>
);

export default Player;