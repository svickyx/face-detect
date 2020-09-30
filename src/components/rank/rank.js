import React from 'react';
import {RankContainer} from './rank-style';

const Rank = ({name, entries})=> {
    return(
        <RankContainer>
            <h3 className='title'>{name} , your current entry count is</h3>
            <h3>{entries}</h3>
        </RankContainer>
    )
};

export default Rank;