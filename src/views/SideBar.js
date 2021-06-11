import React from 'react';
import styled from 'styled-components';
import ScrappingMenuBar from '../components/ScrappingMenuBar';

const Root = styled.div`
    width : 30%;
`;

export default function SideBar(){
    return(
        <Root>
            <ScrappingMenuBar />
        </Root>
    )
}