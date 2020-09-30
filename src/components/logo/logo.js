import React from 'react';
import brain from './brain.svg';
import Tilt from 'react-tilt';

import {LogoBarContainer} from './logo-style';

const LogoBar = ()=> {
    return(
        <LogoBarContainer>
            <Tilt className="Tilt" options={{ max : 55 }} >
                <div className="Tilt-inner"><img src={brain} alt='logo' /></div>
            </Tilt>
        </LogoBarContainer>
    )
}

export default LogoBar;