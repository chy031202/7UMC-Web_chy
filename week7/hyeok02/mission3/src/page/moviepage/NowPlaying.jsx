import React from 'react';
import List from '../../components/List';

const NowPlaying = () => {
    return (
        <List url={"movie/now_playing"} pagination={false} />
    );
};

export default NowPlaying;
