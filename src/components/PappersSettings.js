import React, {useState, useContext} from 'react';
import { motion }from 'framer-motion';
import axios from 'axios';
import styled from 'styled-components';
import Add from '../assets/images/plus.svg';
import Remove from '../assets/images/minus.svg';
import AppContext from '../Context/AppContext';

const Form = styled.form`
    display :flex;
    flex-direction : column;
    justify-content : space-evenly;
    align-items : center;
    height : 100%;
    padding-top  : 70px;
    width :95%;
    padding-top : 25px;
`;
const OptionsWrapper = styled.div`
    width : 100%;
    display : flex;
    flex-wrap : wrap;
    // justify-content : center;
    margin : 2%;
    & > *{
        margin : 1.5%;
    }
`;
const Container = styled.div`
    display : flex;
    flex-direction :column;
    width : 30%;
    
`;
const Label = styled.label`
    display : flex;
    padding : 9px 4%;
    font-size : 1.2rem;
    font-weight : 700;
    cursor : pointer;
    text-align : center;
    color : lightgrey;
    border-radius : 5px;
    box-shadow: 0 0 5px black;
    width : 85%;
`;
const TextField = styled.input`
    outline : none;
    border-radius : 20px;
    align-self : center;
    width : 80%;
    font-size : 1.3rem;
    color : lightgrey;
    height : 30px;
    border : 1px solid grey;
    padding-left : 20px;
    background: inherit;
    border : 0.1px solid lightgrey;
    &::placeholder{
        font-style : italic;
        font-size : 1rem;
    }
`;
const AddOrRemoveIcon = styled.img`
    margin-right : 5%; 
    vertical-align : -0.06cm; 
    background : lightgrey; 
    width : 8px; 
    height : 8px; 
    padding : 1.3%;
    border-radius : 3px;
`;
const SelectionWrapper = styled(motion.div)`
    display : none;
    flex-wrap : wrap;
    width : 100%;
    margin-top : 2%;
    
`;
const Option = styled.span`
    background : inherit;
    color : lightgrey;
    border : 0.1px solid lightgrey;
    border-radius : 4px;
    font-size : 1.2rem;
    margin : 2%;
    padding : 0.5% 2%;
    cursor : pointer;
`;
const SubmitBtn = styled.input`
    
    width : 30px;
    height : 30px;
    border-radius: 50%;
    border : 0.1px solid lightgrey;
    background : inherit;
    color : white;
    &:hover{
        background : #52931A;
    }
`;
const LoadingNotification = styled(motion.h3)`
    color : white;
    font-size : 1.3rem;
    align-self : flex-start;
    margin : 0 8%;
    font-style : italic;
`;
const loadingVariants = {
    open : {
        display : "block",
        opacity : 1,
        transition : {
            yoyo : Infinity,
            duration :0.4
        }
    },
    closed : {
        display : "none"
    }
}
const options = [
    "api_token",
    "q",
    "date_creation_max",
    "date_creation_min",
    "departement",
    "code_postal",
    //inscrit, radié, non inscrit
    "statut_rcs",
    //dirigeants, entreprises, publications, documents
    "bases",
    //approximative, standard, exacte
    "precision",
    "code_Naf",
    "chiffre_affaires_min",
    "tranche_effectif_min",
    "par_page",
    "page"
];
const labels = [
    "texte à rechercher",
    "date de création max",
    "date de création min",
    "département",
    "code postal",
    "status rcs",
    "bases de données",
    "précision",
    "code naf",
    "chiffre d'affaire",
    "nombre de salariés",
    "par page",
    "page"
]

export const PappersSettings = ()=>{

    const [isAdded, setAIsAdded] = useState(false);
    const appCtx = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddClick = async(e)=>{
        await setAIsAdded(added => !added);
        const icon = e.target.parentElement.querySelector(".Icon");
        //click on icon or on label text field
        const entriesBlock = (/Icon/).test(e.target.className) ?  e.target.parentElement.nextSibling : e.target.nextSibling;
        //aiming label textContent
        const targetToColorText = (/Icon/).test(e.target.className) ? e.target.parentElement : e.target;

        if(isAdded){
            // in order img still toggle wether we click on label or on img tag
            icon.src = Remove;
            icon.style.backgroundColor = '#70C7ED';
            targetToColorText.style.color = '#70C7ED';
            entriesBlock.style.display = 'flex'
            return
        }
        icon.src = Add;
        icon.style.backgroundColor = 'lightgrey'
        targetToColorText.style.color = 'white';
        //when close we empty input fields
        entriesBlock.querySelector('input').value = '';
        //when closed no option still be selected
        Array.from(entriesBlock.querySelectorAll('.Option')).forEach( option => option.style.color = 'lightgrey')
        entriesBlock.style.display = 'none'
    } 
    //subOptionBlock
    const handleSelectOption = (e)=>{
        if((/Option/).test(e.target.className)){
            let optionsBlock = Array.from(e.target.parentElement.children);
            //shift input non displayed to only get span options block
            optionsBlock = optionsBlock.filter(option => option.textContent !== e.target.textContent)
            optionsBlock.forEach(option => option.style.color = "lightgrey");
            e.target.style.color = '#70C7ED';
            //input not displayed
            e.target.parentElement.firstElementChild.value = e.target.getAttribute('data-option');
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const datas = {};
        const fields = Array.from(e.target.elements).filter(el => el.contentEditable && el.value);
        let url = "https://api.pappers.fr/v2/recherche?";

        //we need a token to launch request
        if(e.target.firstElementChild.value){
            //when new request we lost last one 
            appCtx.allowDownloadFile(false);
            //setLoading notification appear
            setIsLoading(true);
            //tell to the context wich request has been launched
            appCtx.setWhichReq('pappersApi')
            //delete submit button
            fields.pop();
            //get the token
            datas["api_token"]= fields.shift().value;
            for(let el of fields){
                datas[el.name] = el.value;
            }
            const datasKeysArray = Object.keys(datas);

            if(datas){
                for( let i = 0; i < datasKeysArray.length; i++){
                    //formating url in key/value concataining
                    url += `${datasKeysArray[i]}=${datas[datasKeysArray[i]]}&`
                }
                //remove last & at the end of url string
                url = url.slice(0,-1)
                console.log(url);
                const  list = await axios.get(url)
                const result = await list.data.resultats;
                // console.log(list.data.resultats)
                appCtx.handleContextItems(result);
                if(result.length){
                    //show file downloadable
                    appCtx.allowDownloadFile(true)
                }
                //make loading notification disappear
                setIsLoading(false);
            }
        }
    }
    return(
        <Form onSubmit = { handleSubmit }>
            <TextField placeholder ="entrez ici votre jeton d'accès..." style = {{ width : '50%' }}/>
            <OptionsWrapper>
            {
                labels.map((el,i) =>{
                    return(
                        <>
                            <Container key = {i}>
                                <Label key = {`label-${i}`} onClick = { handleAddClick }>
                                    <AddOrRemoveIcon key = {`add-remove-icon-${i}`} className = "Icon" src = { Add } alt = 'add-remove-icons' />
                                    {el}
                                </Label>
                                < SelectionWrapper key = {`options-icons-${i}`} className = "EntriesBlock" onClick = { handleSelectOption  }>
                                    { SetOptions(i) }
                                </SelectionWrapper>
                            </Container>
                        </>
                    )
                })
            }
            </OptionsWrapper>
            {/* appear if loading */}
            < LoadingNotification initial = {{opacity : 0}} variants = { loadingVariants } animate = {isLoading ? "open" : "close"}>Chargement...</ LoadingNotification>
            <SubmitBtn type = 'submit' value = "Go"/>
        </Form>
    )
}

function SetOptions(index){
    switch(index){
        case 5 : 
            return (
                <>
                    <TextField name = {options[index + 1]} style = {{ display : "none" }}/>
                    <Option className = "Option" data-option = "inscrit">inscrits</Option>
                    <Option className = "Option" data-option = "radie">radiés</Option>
                </>
            )
        case 6 : 
            return (
                    <>
                        <TextField name = {options[index + 1]} style = {{ display : "none" }}/>
                        <Option className = "Option" data-option ="entreprises" >entreprises</Option>
                        <Option className = "Option" data-option ="dirigeants" >dirigeants</Option>
                        <Option className = "Option" data-option ="documents" >documents</Option>
                        <Option className = "Option" data-option ="publications" >publications</Option>
                    </>
            )
        case 7 : 
            return (
                <>
                    <TextField name = {options[index + 1]} style = {{ display : "none" }}/>
                    <Option className = "Option" data-option = "approximative">approximative</Option>
                    <Option className = "Option" data-option = "standard">standard</Option>
                    <Option className = "Option" data-option = "exacte">exacte</Option>
                </>
            )
        default : return <TextField name = {options[index+1]} placeholder = "saisir..."/>
    }
}