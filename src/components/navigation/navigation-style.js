import styled from 'styled-components';

export const NavigationContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: flex-end;
padding: 20px;

p{
    text-decoration: underline;
    cursor: pointer;
    margin-right: 20px;
    font-size: 90%;

    &:hover {
        opacity: 0.5;
    }
}
`