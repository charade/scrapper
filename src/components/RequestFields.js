import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import { QualiBatOption } from'./QualiBatOption';
import LinkedinIcon from '../assets/images/linkedin.svg';
import IadIcon from '../assets/images/iad-logo.png';
import QualiBatIcon from '../assets/images/qualibat.png'

const FieldsWrapper = styled(motion.form)`
    width : 90%;
    display : flex;
    align-items : center;
    flex-direction : column;
    & > *{
        margin : 2% 0;
    }
`;
const Field = styled(motion.input)`
    width : 95%;
    border-radius : 20px;
    height : 30px;
    color : white;
    border : 0.1px solid white;
    background : inherit;
    outline: none;
    padding-left : 5%;
    &::placeholder{
        margin-left : 20%;
        font-style : italic;
        font-size :1.2rem;
    }
`;
const SubmitFieldsBtn = styled.input`
    color :lightgrey;
    border-radius: 50%;
    width : 40px;
    height: 40px;
    outline : none;
    cursor : pointer;
    border : 0.1px solid white;
    background : inherit;
    align-self:center;
    &:hover{
        background : #52931A
    }
`;
const CurrentIcon = styled.img`
    box-shadow : 0 0 10px green;
    width : 30px; 
    height :30px;
    border : 0.1px solid lightgrey;
    border-radius: 50%;
`;

const setFieldsToViewVariants = {
    visible : {
        opacity:1,
        damping : 3,
        stiffness : 50,
        y : 50,
        transition :{
            type : "spring",
            duration : 0.8,
        }
    },
    hidden :{
        y : 200,
        opacity : 0,
        transition :{
            duration : 0.5,
        }
    }
};

export const RequestFields = ({handleSubmit, canOpenFields, fieldIcon, searchOption, handleFirstField, handleSecondField})=>{
    
    const [IconSrc, setIconSrc] = useState();

    useEffect(()=>{
        switch(fieldIcon){
            case 'linkedin':
                setIconSrc(LinkedinIcon);
                break;
            case 'iad':
                setIconSrc(IadIcon);
                break;
            case 'qualibat':
                setIconSrc(QualiBatIcon);
                break;
            default : return null;
        }
    },[fieldIcon])
    return(
        <>
            <FieldsWrapper onSubmit = { handleSubmit } initial = "hidden" variants = { setFieldsToViewVariants } animate = { canOpenFields ? "visible" : "hidden" } >
                { IconSrc ? <CurrentIcon src = { IconSrc} /> : null }
                { SwicthSearchField(searchOption, handleFirstField , handleSecondField ) }
                <SubmitFieldsBtn type="submit"  value = "Go" />
            </FieldsWrapper>
        </>
    )
}

function SwicthSearchField(searchOption, handleOtherSearchFirstFieldChange, handleOtherSearchSecondFieldChange){
    // eslint-disable-next-line default-case
    switch(searchOption){
        case "linkedin" : 
            return(
                <>
                    <Field onChange = { handleOtherSearchFirstFieldChange } type="text" placeholder = "Identifiant..." />
                    <Field onChange = { handleOtherSearchSecondFieldChange } type="text" placeholder = "Mot de pass..."/>
                </>
            )
        case "iad" : 
            return <Field onChange = { handleOtherSearchFirstFieldChange } type="text" placeholder = "Recherche par ville..." />
        
        case 'qualibat' : 
            return(
                <>
                    <QualiBatOption onChangeFirstField = {handleOtherSearchFirstFieldChange} onChangeSecondField = { handleOtherSearchSecondFieldChange } />
                </>
            )

    }
}