import React, {useState} from 'react';

const AppContext = React.createContext();

function ApplicationContext(props){
    const [isResultFound, setisResultFound] = useState(false)
    const [contextItems, setContextItems] = useState([]);
    const [whichRequest, setWichResquest] = useState('');
     //enable export to cvs file once we get the datas back and datas array not empty
     const [canDownloadFile, setCandDownloadFile] = useState(false);

    const handleContextItems = (items)=> setContextItems(items);
    const setResultFound = (bool) => setisResultFound(bool);
    //request type launched
    const setWhichReq = (name) => setWichResquest(name);
    //manage download icon to notify if can download
    const allowDownloadFile = (bool)=> setCandDownloadFile(bool);
    
    const value = {
        handleContextItems : handleContextItems,
        contextItems : contextItems,
        setResultFound : setResultFound,
        resultFound : isResultFound,
        setWhichReq : setWhichReq,
        whichReq : whichRequest,
        allowDownloadFile : allowDownloadFile,
        canDownloadFile : canDownloadFile
    }

    return(
        <AppContext.Provider value = {value}>
            {props.children}
        </AppContext.Provider>
    )
}
export {ApplicationContext};
export default AppContext;