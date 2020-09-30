import styled from 'styled-components';

export const FaceContainer = styled.div`
    display: flex;
    justify-content: center;

    div {
        display: flex;
        justify-content: center;
        height: auto;
        width:500px;
        margin-top: 10px;
        position: relative;
        img{
            width:100%;
        }
    }

    .bouding-box {
        box-shadow: 0 0 0 3px #149df2 inset;
        display: flex;
        flex-warp: warp;
        justify-content: center;
        cursor: pointer;
        position: absolute;
    }
`
