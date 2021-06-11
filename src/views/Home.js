import React from 'react';
import styled from 'styled-components';
import Result from './Result';
import SideBar from './SideBar';

const Root = styled.div`
    position : relative;
    display : flex;
    align-items : flex-start;
    max-height :  100vh;
    padding: 0 !important;
    overflow : hidden;                
`;

export default function Home(){

    return(
        <Root>
            <SideBar/>
            <Result />
        </Root>
    )
}

