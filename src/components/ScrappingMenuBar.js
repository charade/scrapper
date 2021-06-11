import InfoSharpIcon from '@material-ui/icons/InfoSharp';
import AppContext from '../Context/AppContext';
import {SearchOptionIcon} from './SearchOptionIcon';
import {SearchSettings} from './SearchSettings'
import {SpinnerOnLoading} from './SpinnerOnLoading';
import GoogleIcon from '../assets/images/google.svg';
import LinkedinIcon from '../assets/images/linkedin.svg';
import PappersIcon from '../assets/images/pappers.jpeg';
import IadIcon from '../assets/images/iad-logo.png';
import QualiBatIcon from '../assets/images/qualibat.png'
import { RequestFields } from './RequestFields';
import React , {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CSVLink } from 'react-csv';
import GetAppIcon from '@material-ui/icons/GetApp';

const Root = styled.div`
    display : flex;
    height : 100vh;
    margin : 0;
    // justify-content : center;
    padding-top : 11%;
    align-items : center;
    flex-direction : column;
    background : #252535;
`;
const InfoPanel = styled(motion.div)`
    position : absolute; 
    display: flex;
    justify-content : center;
    align-items : center;
    left : 30%;
    background : #111;
    border-radius : 10px;
    top : 3%;
    border : 0.1px solid lightgrey;
    height : 40px;
    z-index : 5;
`;
const InfoText = styled.p`
    text-align : center;
    color : white;
    width : 80%;
    font-size : 1.4rem;
`;
const FormWrapper = styled(motion.form)`
    position : relative;
    width : 90%;
    display:flex;
    border-radius : 20px;
    align-items :center;
    margin-bottom : 2%;
    border : 1px solid white;
    overflow : hidden;

    & > .request-laucher{
        border-radius : 50%;
    }
`;
const LaunchRequestIcon = styled.img`
    position : absolute;
    border : 0.1px solid white;
    width : 15px;
    height :15px;
    padding : 2.3%;
    margin : 8px;
`;
const SubmitBtn = styled(motion.input)`
    border-radius : 5px 0 0 5px;
    width : 30px;
    height :30px;
    transform : translateX(10px);
    opacity : 0;
    cursor : pointer;
    outline : none;
    position : relative;
    background :grey;
    border : 1px solid white;
    color : white;
    &:hover{
        background  : #738BD8;
        border : 0.5px solid black;
        transform : scale(1.0.5);
        box-shadow : 0 0 5px white;
    }
`;
export const TextField = styled.input`
    border-radius : 0 5px 5px 0;
    flex:3;
    width : 100%;
    font-size : 1.2rem;
    height : 100%;
    background : inherit;
    padding-left : 5%;
    color : white;
    outline : none;
    &::placeholder{
       font-style : italic;
       font-size :1rem;
    }
`;
const Options = styled.div`
    display : flex;
    flex-wrap : wrap;
    height : 100px;
    width : 99%;
    align-items : center;
    justify-content : center;
    margin-bottom : 2%;
`;
const fileDownloaderStyle = (args)=>{
    return({ 
        textDecoration : "none",
        display : "flex",
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center",
        width : "40px",
        height: "40px",
        borderRadius : "50%",
        border : args ? "0.1px solid lightgrey" : "0.1px solid transparent",
        cursor : args ? "not-allowed" : "pointer",
        background : args ? "inherit" : "#52931A",
        color : args ? "lightgrey" : "white",
        // padding : "1%"
    })
};
/*---animation variants ---*/
//search bar variants
const googleSearchBarVariants = {
    open : {
        height : "40px",
        transition : {
            duration : 0.4,
        }
    },
    closed : {
        height : 0,
        transition : {
            duration : 0.5,
        }
    }
};
const InfoBoxVariant = {
    open : {
        width : '150px',
        opacity : 1,
        transition : {
            duration : 0.3
        }
    },
    closed:{
        opacity : 0,
        width : 0,
    }
};

export default function ScrappingMenuBar(){

    const [text, setText] = useState('');
    const [searchOption, setOption] = useState('');
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(false);
    //toggle search bar to view
    const [canOpenGoogleSearchBar, setCanOpenGoogleSearchbar] = useState(false);
    //toggle other search fields block to view
    const [canOpenFields, setCanOpenFields] = useState(false);
    //for search options !== google we need to notify which request we're about to make
    const [fieldSearchIcon, setfieldSearchIcon] = useState('');
    const [iconInfo, setIconInfo] = useState();
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    //headers to export items to CSV file depending on resquested search either Api or Scraping
    const [CSVHeaders, setCSVHeaders] = useState([]);
    //open or close settings && search options bar
    const [canOpenSettingsBar, setCanOpenSettingsBar] = useState(false);
    const appCtx = useContext(AppContext);
    
    //actions to perform when we get a response back to the search request from the main process
    const handleFetchResponse = (e,args)=>{
        setLoading(false);
        appCtx.setWhichReq('scrapping')
        if(!args.length){
            appCtx.setResultFound(false);
        }
        else{
            appCtx.setResultFound(true);
        }
        setItems(args);
    } 
    //if we couldn't achieve the request
    const handleLoadingError = (e, args)=>{
        console.error(args);
        //if error occured we stop the loading animation
        setLoading(false);
    }
    
    useEffect(()=>{
        let time = null;
        //mouseOver icon description appear
        const setInfoText = (e)=> {
            const label = e.target.getAttribute('data-label');
            label ? time = setTimeout(()=>setIconInfo(label),1500): setIconInfo('');
        }
        //when leaving icons area we clean text state
        const cleanInfoText = () =>{
            clearTimeout(time);
            setIconInfo('');
        };
        const iconsBlock = document.querySelector('.options');
        iconsBlock.addEventListener('mouseover',setInfoText);
        iconsBlock.addEventListener('mouseout',cleanInfoText);
        return ()=>{
            iconsBlock.removeEventListener('mouseover',setInfoText);
            iconsBlock.removeEventListener('mouseout', cleanInfoText)
        } 
    },[]);

    useEffect(()=>{
        window.electron.notificationApi.on('search-response', handleFetchResponse);
        window.electron.notificationApi.on('loading-error', handleLoadingError);
        return()=>{
            window.electron.notificationApi.removeListener('search-response', handleFetchResponse);
            window.electron.notificationApi.removeListener('loading-error', handleLoadingError);
        } 
    },[]);

    useEffect(()=>{
        if(items.length){
            //if we get datas we light up the cvs download file button
            appCtx.allowDownloadFile(true);
            appCtx.handleContextItems(items);
        }
    },[items,appCtx]);

    //listennig if request type Api/scrapping changed in order to change csv header too
    useEffect(()=>{
        switch(appCtx.whichReq){
            case "pappersApi":
                setCSVHeaders([
                    {label :" Noms", key : "nom"},
                    {label :" Prénoms", key : "prenom"},
                    {label :" Noms d'entreprises", key : "nom_entreprise"}
                ])
                break;
            case "scrapping": 
                setCSVHeaders([
                    {label :" Noms", key : "name"},
                    {label :" Numeros", key : "phone"},
                    {label :" Emails", key : "email"}
                ])
                break;
            default : return;
        } 
    },[appCtx])

    const handleGoogleEntryChange = (e)=> setText(e.target.value);
    const handleOtherSearchFirstFieldChange = (e)=> setField1(e.target.value);
    const handleOtherSearchSecondFieldChange = (e)=> setField2(e.target.value);

    const handleClickSearchOption = (e) =>{
        //close searchSetting bar
        setCanOpenSettingsBar(false);
        setOption(e.target.getAttribute('data-label'));
        if(e.target.getAttribute('data-label') === 'google'){
            setCanOpenGoogleSearchbar(true);
            setCanOpenFields(false);
            return;
        }
        setfieldSearchIcon(e.target.getAttribute('data-label'));
        setCanOpenGoogleSearchbar(false);
        setCanOpenFields(true);
    };
    //toggle searchSettingsBar
    const handleClickOpenSettingsBar = ()=>{
        //close side field search bloc
        setCanOpenFields(false);
        setCanOpenGoogleSearchbar(false)
        setCanOpenSettingsBar(state => !state);
    } 

    const handleSubmitGoogleSearch = (e) =>{
        e.preventDefault();
        //if we make another request we need to get the items savers empty
        setItems([]);
        appCtx.handleContextItems([]);

        if(searchOption){
            //notify that we're ready to start loading animations
            setLoading(true);
            //we send the searchOption to the main process in order to make the right request
            window.electron.notificationApi.send('search', [searchOption, text]);
        }   
    }
    //every submit !=== google
    const handleOtherSubmit = (e)=>{
        e.preventDefault();
        appCtx.allowDownloadFile(false);
        if((field1 && field2 ) || field1){
            setItems([]);
            appCtx.handleContextItems([]);
            setLoading(true);
        }
        switch(searchOption){
            case 'linkedIn' : 
            case 'qualibat' : 
                if(field1 && field2){
                    window.electron.notificationApi.send('search', [searchOption, {field :field1, key :field2}]); 
                    break;
                }
                setLoading(false);
                break;
            case 'iad' : 
                if(field1){
                    window.electron.notificationApi.send('search', [searchOption, field1]);
                    break;
                }
                setLoading(false);
                break;
            default : return null
        }
    }
    const handleDownload = (e)=>{
        if(!appCtx.contextItems.length){
            e.preventDefault();
        }
    }
    return(
        <Root>
            <SearchSettings canOpenSettingsBar = {canOpenSettingsBar}/>
            <InfoPanel initial = {false} variants={InfoBoxVariant} animate = {iconInfo ? "open"  : "closed"}>
                <InfoText>{ iconInfo ? iconInfo.charAt(0).toUpperCase() + iconInfo.slice(1) : '' } </InfoText>
                <InfoSharpIcon style = {{fill : "#2C2E3A", width : "20px", height : "20px", stroke : "white", boxShadow : '0 0 3px black', borderRadius : "50%"}}/>
            </InfoPanel>
            <FormWrapper onSubmit = { handleSubmitGoogleSearch } initial = { false } variants = { googleSearchBarVariants } animate = {canOpenGoogleSearchBar ? "open" : "closed"} >
                <LaunchRequestIcon className = "request-laucher" src = { GoogleIcon } />
                <SubmitBtn type = "submit" className = "request-laucher" value = "search" />
                <TextField type= "text" placeholder = "URL..." onChange = { handleGoogleEntryChange } />
            </FormWrapper>
            <Options className = 'options'>
                <SearchOptionIcon dataLabel = 'google' handleClick = { handleClickSearchOption } icon = { GoogleIcon } alt="google-icon"/>
                <SearchOptionIcon dataLabel = 'linkedin' handleClick = { handleClickSearchOption } icon ={ LinkedinIcon } alt="linkedin- icon"/>
                <SearchOptionIcon dataLabel = 'iad' handleClick = { handleClickSearchOption } icon ={ IadIcon } alt="iad-logo"/>
                <SearchOptionIcon dataLabel = 'qualibat' handleClick = { handleClickSearchOption } icon ={ QualiBatIcon } alt="iad-logo"/>
                <SearchOptionIcon dataLabel = 'pappers' handleClick = { handleClickOpenSettingsBar } icon ={ PappersIcon } alt="iad-logo"/>
            </Options>
            <CSVLink style = { fileDownloaderStyle(!appCtx.canDownloadFile) } data = {appCtx.contextItems} headers = {CSVHeaders} disabled = { !appCtx.canDownloadFile } onClick = { handleDownload }>
                <GetAppIcon/>
                CSV
            </CSVLink>
            <SpinnerOnLoading isLoading = {isLoading} />
            <RequestFields searchOption = {searchOption} handleSubmit = { handleOtherSubmit } canOpenFields = { canOpenFields } handleFirstField = {handleOtherSearchFirstFieldChange} handleSecondField = {handleOtherSearchSecondFieldChange} fieldIcon = {fieldSearchIcon}/>
        </Root>    
    )
}


