import React from 'react';
import styled from 'styled-components';
import { motion }from 'framer-motion';

const LoaderBar = styled(motion.div)`
    position : relative;
    border : none;
    border-bottom : 0.5px solid lightgrey;
    margin : 20% 0 0% 0;
`;
const LoaderSpinner = styled(motion.div)`
    height : 3px;
    background : #29C23F;
    width : 50%;
    position : absolute;
    box-shadow : 0 0 50px black, 0px 0px 5px white;
    border-radius : 20px;
    top : -1px;
`;
//spinner slideBar variants  
const loaderVariants = {
    open :{
        width : "200px",
        opacity : 1,
        transition : {
            type : "spring",
            duration : 0.4 ,
            stiffness : 102,
            delayChildren : 0.5
        }
    },
    closed :{
        width : 0,
        opacity : 0
    },
};
const loaderSpinnerVariants = {
    closed: {},
    open : {
        opacity: 1,
        x : 100,
        transition : {
            type : 'tween',
            yoyo : Infinity,
            duration : 1,
        }
    }
};

export const SpinnerOnLoading = ({isLoading})=>{
    return(
        <>
         <LoaderBar variants = { loaderVariants }  animate = {isLoading ? "open" : "closed"} >
                <LoaderSpinner 
                variants = { loaderSpinnerVariants }
                animate = { isLoading ? "open" : "closed" }
                >
                </LoaderSpinner>
            </LoaderBar>
        </>
    )
}