import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

const SearchOption = styled(motion.img)`
    // color : white;
    width : 20px;
    height :20px;
    margin : 2%;
    cursor : pointer;
    border : 0.1px solid lightgrey;
    border-radius : 50%;
    padding : 3%;
`;
const searchIconVariants = {
    initial : {
        filter: "saturate(10%) ",
        opacity : 0.7
    },
    hover : {
        filter: "saturate(100%) ",
        scale : 1.3,
        opacity : 1
    }
};

export const SearchOptionIcon = ({dataLabel, handleClick, icon, alt})=>{
    return(
        <>
            <SearchOption variants = { searchIconVariants } initial = "initial" whileHover = "hover" data-label = {dataLabel} onClick = { handleClick } src = { icon } alt = {alt} />
        </>
    )
}