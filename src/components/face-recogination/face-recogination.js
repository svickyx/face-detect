import React from 'react';
import {FaceContainer} from './face-recogination-style';

const FaceRecogination = ({imageUrl, box})=> {
    return(
        <FaceContainer>
            <div>
                <img id='inputimage' src={imageUrl} alt='face' />
                <div className='bouding-box' style={{width:box.facewidth,height:box.faceheight,top:box.top,left:box.left}} />
            </div>
        </FaceContainer>
    )
};
//3. img has an id'inputimage' to be able to let the calculateFaceLocation to use it
//7. after we receive the box parameter, we create an empty <div> and use css to show the face container

export default FaceRecogination;