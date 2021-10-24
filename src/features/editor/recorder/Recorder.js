import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box/Box';
import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PauseIcon from '@mui/icons-material/Pause';
import StopSharpIcon from '@mui/icons-material/StopSharp';

const RecordButton = (props) => {
    return (
        <IconButton size={ 'large' } color={ 'success' } onClick={ props.onClick }>
            <FiberManualRecordIcon fontSize={ 'large' } />
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

const StopButton = (props) => {
    return (
        <IconButton
            size={ 'large' }
            color={ 'default' }
            onClick={ props.onClick }
            disabled={ props.disabled }
        >
            <StopSharpIcon fontSize={ 'large' } />
        </IconButton>
    );
};

const Recorder = (props) => (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} style={{ zIndex: 10 }} elevation={ 5 }>
        <Box display="flex" justifyContent="center" alignItems="center">
            { props.recording
                ? <PauseButton onClick={ props.onPause }/>
                : <RecordButton onClick={ props.onStart }/>
            }
            <StopButton disabled={ !props.recording } onClick={ props.onPause } />
        </Box>
    </Paper>
);

export default Recorder;