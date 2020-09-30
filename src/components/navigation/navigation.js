import React from 'react';
import {NavigationContainer} from './navigation-style';

const Navigation = ({onRouteChange, isSignedIn})=> {
    if(isSignedIn){
        return(
            <NavigationContainer>
            <p onClick = {() => onRouteChange('signout')} to='signout'>
                Sign Out 
            </p>
        </NavigationContainer>
        )
    }else {
        return(
            <NavigationContainer>
                <p onClick = {() => onRouteChange('signin')} to='signin'>
                    Sign In 
                </p>
                <p onClick = {() => onRouteChange('register')} to='register'>
                    Register 
                </p>
            </NavigationContainer> 
        )
    }
};

export default Navigation;