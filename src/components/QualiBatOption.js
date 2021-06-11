import React from 'react';
import styled from 'styled-components';

const QualiBatIconOption = styled.select`
    border-radius : 20px;
    justify-content: center;
    background : transparent;
    color : lightgrey;
    border-color : white;
    font-size : 1.4rem;
    width : 100%;
    height : 40px;
    outline : none;
    padding-left :5%;
    text-align : center;
`;

export const QualiBatOption = ({onChangeFirstField, onChangeSecondField})=>{
    return(
        <>
            <QualiBatIconOption onChange = { onChangeFirstField }> 
                <option>Sélectionner un métier</option>
                <option value = "Agenceur/aménagement">Agenceur/aménagement</option>
                <option value = "Chapiste/dallage">Chapiste/dallage</option>
                <option value = "Charpentier/charpentier métallique">Charpentier/charpentier métallique</option>
                <option value = "Cheministe/fumiste/ramoneur">Cheministe/fumiste/ramoneur</option>
                <option value = "Cordiste/échafaudeur/étaiements">Cordiste/échafaudeur/étaiements</option>
                <option value = "Couvreur/étancheur">Couvreur/étancheur</option>
                <option value = "Démolisseur">Démolisseur</option>
                <option value = "Fenêtrier/vérandaliste/portes et ouvertures">Fenêtrier/vérandaliste/portes et ouvertures</option>
                <option value = "Installateur en énergies renouvelables">Installateur en énergies renouvelables</option>
                <option value = "Isolateur thermique/Isolateur acoustique">Isolateur thermique/Isolateur acoustique</option>
                <option value = "Maçon/bardeur/ravaleur/façadier">Maçon/bardeur/ravaleur/façadier</option>
                <option value = "Menuisier bois/parqueteur">Menuisier bois/parqueteur</option>
                <option value = "Métallier/serrurier">Métallier/serrurier</option>
                <option value = "Paysagiste/aménagements extérieurs">Paysagiste/aménagements extérieurs</option>
                <option value = "Plâtrier/plaquiste/staffeur">Plâtrier/plaquiste/staffeur</option>
                <option value = "Plombier/chauffagiste/climaticien">Plombier/chauffagiste/climaticien</option>
                <option value = "Poseur de sols/carreleur/moquettiste">Poseur de sols/carreleur/moquettiste</option>
                <option value = "Rénovateur énergétique">Rénovateur énergétique</option>
                <option value = "Restaurateur de patrimoine ancien/décorateur/tailleur de pierres">Restaurateur de patrimoine ancien/décorateur/tailleur de pierres</option>
                <option value = "Terrassier/assainissement/fondations">Terrassier/assainissement/fondations</option>
                <option value = "Traitement de la maison (champignons, amiante, etc.)">Traitement de la maison (champignons, amiante, etc.)</option>
            </QualiBatIconOption>
            <QualiBatIconOption onChange = { onChangeSecondField }>
                <option>Rechercher dans un département</option>
                <option value = "01 - Ain">01 - Ain</option>
                <option value = "02 - Aisne">02 - Aisne</option>
                <option value = "03 - Allier">03 - Allier</option>
                <option value = "04 - Alpes-de-Haute-Provence">04 - Alpes-de-Haute-Provence</option>
                <option value = "05 - Hautes-Alpes">05 - Hautes-Alpes</option>
                <option value = "06 - Alpes-Maritimes">06 - Alpes-Maritimes</option>
                <option value = "07 - Ardèche">07 - Ardèche</option>
                <option value = "08 - Ardennes">08 - Ardennes</option>
                <option value = "09 - Ariège">09 - Ariège</option>
                <option value = "10 - Aube">10 - Aube</option>
                <option value = "11 - Aude">11 - Aude</option>
                <option value = "12 - Aveyron">12 - Aveyron</option>
                <option value = "13 - Bouches-du-Rhône">13 - Bouches-du-Rhône</option>
                <option value = "14 - Calvados">14 - Calvados</option>
                <option value = "15 - Cantal">15 - Cantal</option>
                <option value = "16 - Charente">16 - Charente</option>
                <option value = "17 - Charente-Maritime">17 - Charente-Maritime</option>
                <option value = "18 - Cher">18 - Cher</option>
                <option value = "19 - Corrèze">19 - Corrèze</option>
                <option value = "20 - Corse">20 - Corse</option>
                <option value = "21 - Côte-d'Or">21 - Côte-d'Or</option>
                <option value = "22 - Côtes-d'Armor">22 - Côtes-d'Armor</option>
                <option value = "23 - Creuse">23 - Creuse</option>
                <option value = "24 - Dordogne">24 - Dordogne</option>
                <option value = "25 - Doubs">25 - Doubs</option>
                <option value = "26 - Drôme">26 - Drôme</option>
                <option value = "27 - Eure">27 - Eure</option>
                <option value = "28 - Eure-et-Loir">28 - Eure-et-Loir</option>
                <option value = "29 - Finistère">29 - Finistère</option>
                <option value = "30 - Gard">30 - Gard</option>
                <option value = "31 - Haute-Garonne">31 - Haute-Garonne</option>
                <option value = "32 - Gers">32 - Gers</option>
                <option value = "33 - Gironde">33 - Gironde</option>
                <option value = "34 - Hérault">34 - Hérault</option>
                <option value = "35 - Ille-et-Vilaine">35 - Ille-et-Vilaine</option>
                <option value = "36 - Indre">36 - Indre</option>
                <option value = "37 - Indre-et-Loire">37 - Indre-et-Loire</option>
                <option value = "38 - Isère">38 - Isère</option>
                <option value = "39 - Jura">39 - Jura</option>
                <option value = "40 - Landes">40 - Landes</option>
                <option value = "41 - Loir-et-Cher">41 - Loir-et-Cher</option>
                <option value = "42 - Loire">42 - Loire</option>
                <option value = "43 - Haute-Loire">43 - Haute-Loire</option>
                <option value = "44 - Loire-Atlantique">44 - Loire-Atlantique</option>
                <option value = "45 - Loiret<">45 - Loiret</option>
                <option value = "46 - Lot<">46 - Lot</option>
                <option value = "47 - Lot-et-Garonne">47 - Lot-et-Garonne</option>
                <option value = "48 - Lozère">48 - Lozère</option>
                <option value = "49 - Maine-et-Loire<">49 - Maine-et-Loire</option>
                <option value = "50 - Manche">50 - Manche</option>
                <option value = "51 - Marne">51 - Marne</option>
                <option value = "52 - Haute-Marne">52 - Haute-Marne</option>
                <option value = "53 - Mayenne">53 - Mayenne</option>
                <option value = "54 - Meurthe-et-Moselle">54 - Meurthe-et-Moselle</option>
                <option value = "55 - Meuse">55 - Meuse</option>
                <option value = "56 - Morbihan">56 - Morbihan</option>
                <option value = "57 - Moselle">57 - Moselle</option>
                <option value = "58 - Nièvre">58 - Nièvre</option>
                <option value = "59 - Nord">59 - Nord</option>
                <option value = "60 - Oise">60 - Oise</option>
                <option value = "61 - Orne">61 - Orne</option>
                <option value = "62 - Pas-de-Calais">62 - Pas-de-Calais</option>
                <option value = "63 - Puy-de-Dôme">63 - Puy-de-Dôme</option>
                <option value = "64 - Pyrénées-Atlantiques">64 - Pyrénées-Atlantiques</option>
                <option value = "65 - Hautes-Pyrénées">65 - Hautes-Pyrénées</option>
                <option value = "66 - Pyrénées-Orientales">66 - Pyrénées-Orientales</option>
                <option value = "67 - Bas-Rhin">67 - Bas-Rhin</option>
                <option value = "68 - Haut-Rhin">68 - Haut-Rhin</option>
                <option value = "69 - Rhône">69 - Rhône</option>
                <option value = "70 - Haute-Saône">70 - Haute-Saône</option>
                <option value = "71 - Saône-et-Loire">71 - Saône-et-Loire</option>
                <option value = "72 - Sarthe">72 - Sarthe</option>
                <option value = "73 - Savoie">73 - Savoie</option>
                <option value = "74 - Haute-Savoie">74 - Haute-Savoie</option>
                <option value = "75 - Paris">75 - Paris</option>
                <option value = "76 - Seine-Maritime">76 - Seine-Maritime</option>
                <option value = "77 - Seine-et-Marne">77 - Seine-et-Marne</option>
                <option value = "78 - Yvelines">78 - Yvelines</option>
                <option value = "79 - Deux-Sèvres">79 - Deux-Sèvres</option>
                <option value = "80 - Somme">80 - Somme</option>
                <option value = "81 - Tarn">81 - Tarn</option>
                <option value = "82 - Tarn-et-Garonne">82 - Tarn-et-Garonne</option>
                <option value = "83 - Var">83 - Var</option>
                <option value = "84 - Vaucluse">84 - Vaucluse</option>
                <option value = "85 - Vendée">85 - Vendée</option>
                <option value = "86 - Vienne">86 - Vienne</option>
                <option value = "87 - Haute-Vienne">87 - Haute-Vienne</option>
                <option value = "88 - Vosges">88 - Vosges</option>
                <option value = "89 - Yonne">89 - Yonne</option>
                <option value = "90 - Territoire de Belfort">90 - Territoire de Belfort</option>
                <option value = "91 - Essonne">91 - Essonne</option>
                <option value = "92 - Hauts-de-Seine">92 - Hauts-de-Seine</option>
                <option value = "93 - Seine-Saint-Denis">93 - Seine-Saint-Denis</option>
                <option value = "94 - Val-de-Marne">94 - Val-de-Marne</option>
                <option value = "95 - Val-d'Oise">95 - Val-d'Oise</option>
                <option value = "971 - Guadeloupe">971 - Guadeloupe</option>
                <option value = "972 - Martinique">972 - Martinique</option>
                <option value = "973 - Guyane">973 - Guyane</option>
                <option value = "974 - de la Réunion">974 - de la Réunion</option>
                <option value = "975 - St Pierre et Miquelon">975 - St Pierre et Miquelon</option>
                <option value = "976 - Mayotte">976 - Mayotte</option>
                <option value = "977 - Réunion">977 - Réunion</option>
                <option value = "978 - Réunion">978 - Réunion</option>
                <option value = "980 - Monaco">980 - Monaco</option>
                <option value = "988 - Nouvelle-Calédonie">988 - Nouvelle-Calédonie</option>
            </QualiBatIconOption>
        </>    
    )
}