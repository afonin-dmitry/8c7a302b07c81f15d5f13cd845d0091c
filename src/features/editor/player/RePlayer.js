import ReactPlayer from 'react-player';
import * as React from 'react';
import { useEffect, useState } from 'react';

const url = 'https://m2.akniga.club/b/70981/6HhfyAJ38do6UZcZTendQQ,,/01.%20%D0%9C%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%B5%D1%81%20%D0%A1%D1%8D%D0%BC%20-%20%D0%A0%D0%B0%D0%B4%D0%B8%20%D0%B2%D1%81%D0%B5%D0%B3%D0%BE%20%D1%81%D0%B2%D1%8F%D1%82%D0%BE%D0%B3%D0%BE.mp3';

const RePlayer = (props) => {
    const [ player, setPlayer ] = useState(null);
    const [ played, setPlayed ] = useState(0);

    const onProgress = ({ playedSeconds/*, played, loadedSeconds, loaded */}) => {
        setPlayed( playedSeconds );
        props.onProgress( playedSeconds );
    }

    useEffect(() => { if (played !== props.played) player.seekTo( props.played ) }, [ props.played ]);

    return <ReactPlayer
        ref={ setPlayer }
        width='100%'
        height='100%'
        url={ url }
        playing={ props.playing }
        onProgress={ onProgress }
        progressInterval={ 500 }
    />
};

export default RePlayer;
