import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import AppContext from '../Context/AppContext';

const Root = styled.div`
    display : flex;
    // align-items : center;
    justify-content : center;
    height : 100vh;
    flex:1;
    overflow-y: scroll;

    /* Hide scrollbar for IE, Edge and Firefox */
    scrollbar-width : none;
    
    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
        display: none;
    }
`;
const ResultsTable = styled(motion.table)`
    width : 97%;
    position :relative;
    top : 0;
    border-collapse : collapse;
    table-layout : fixed;
    & * {
        border : 0.1px solid #7AD1F9;
        font-size : 1.3rem;
        max-width : 30%;
        color : white;
        margin : 0;
        padding :1.5%;
    }
`;
const DefaultMessage = styled(motion.h2)`
    align-self : center;
    font-size : 1.7rem;
    font-style : italic;
    color : lightgrey;
    text-align:center;
    line-height : 30px;
`;
export default function Result(){

    const [error, setError] = useState(false);
    const appCtx = useContext(AppContext);

    const handleBadNews = (_,args) => args.length ? setError(false) : setError(true);
    const handleSearchRequested = () => setError(false)
    
    useEffect(()=>{
        window.electron.notificationApi.on('search-response', handleBadNews);
        window.electron.notificationApi.on('search-requested', handleSearchRequested);
        return()=>{
            window.electron.notificationApi.removeListener('search-requested', handleSearchRequested);
            window.electron.notificationApi.removeListener('search', handleBadNews)
        } 
    },[]);

    const ifError = ()=>(
        <DefaultMessage initial = {{ y : -200}} animate = {{y : 0, transition : { duration : 4, type : "spring", damping: 7, stiffness : 100} }}>
            Sorry Dude,<br /> aucun résultat trouvé... 
        </DefaultMessage>
    )
    const isCtxEmpty = () => ResquestCase(appCtx.contextItems, appCtx.whichReq);
       
    return(
        <Root>
            { error ? ifError() : isCtxEmpty()}
        </Root>
    )
}


//which request has been made...
function ResquestCase(arr, whichReq){
    if(arr.length){
        switch(whichReq){

            case "pappersApi":
                return(
                    <ResultsTable>
                                <tr>
                                    <th scope = "col">Nom d'entreprises</th>
                                    <th scope = "col">Noms</th>
                                    <th scope = "col">Prénoms</th>
                                </tr>
                                {arr.map( el =>{
                                    return(
                                        <tr>
                                            <td >{el.nom_entreprise}</td>
                                            <td >{el.nom}</td>
                                            <td >{el.prenom}</td>
                                        </tr>
                                    )
                                })}
                    </ResultsTable>
                )
    
            case "scrapping":
                return(
                    <ResultsTable>
                        <tr>
                            <th scope = "col">Noms</th>
                            <th scope = "col">Tel</th>
                            <th scope = "col">E-mails</th>
                        </tr>
                        {arr.map( el =>{
                            return(
                                <tr>
                                    <td >{el.name}</td>
                                    <td >{el.phone}</td>
                                    <td >{el.email}</td>
                                </tr>
                            )
                        })}
                    </ResultsTable>
                )
    
            default : return
        }
    
    }
    else{
        return <DefaultMessage initial = {{ y : -200}} animate = {{y : 0, transition : { duration : 4, type : "spring", damping: 7, stiffness : 100} }}>Le résultat de ta recherche apparaitra ici...</DefaultMessage>
    }
}