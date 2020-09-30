import React from 'react';
import {ImageLinkFormContainer, InputContainer} from './image-link-form-style';

const ImageLinkForm = ({onInputChange, onButtonSubmit})=> {
    return(
        <ImageLinkFormContainer>
            <p>This Magin Brain Will Detect Faces In Your Pictures. Give it a try!</p>
            <InputContainer>
                <input type='text' onChange={onInputChange} />
                <button onClick={onButtonSubmit}>Detect</button>
            </InputContainer>
        </ImageLinkFormContainer>
    )
};

export default ImageLinkForm;