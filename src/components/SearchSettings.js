import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {PappersSettings} from './PappersSettings'

const Root = styled(motion.div)`
    position : absolute;
    display : flex;
    flex-direction : column;
    align-items : center;
    left : 65%;
    transform : translateX(-50%);
    overflow : hidden;
    width : 60%;
    top : 0;
    background  : #232332;
    padding-bottom : 30px;
    border : 0.1px solid lightgrey;
    z-index : 4;
`;

const rootVariant = {
    open : {
        height : "85%",
        opacity : 1,
        transition : {
            duration :0.3
        }
    },
    close : {
        height : 0,
        opacity :0,
        transition : {duration : 0.2}
    }
}

export const SearchSettings = ({canOpenSettingsBar})=>{

    return(
        <Root initial = {false} variants = {rootVariant} animate = {canOpenSettingsBar ? "open" : "close"}>
            <PappersSettings />
        </Root>
        )
}