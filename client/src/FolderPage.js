import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Form, Link } from 'react-router-dom';
import data from './data.js'
import axios from 'axios';

export default function FolderPage() {
    let [toggle, setToggle] = useState(false);

    return(<div style = {{minHeight : "100vh", display : "flex", flexDirection : "column"}}>

        <div class = "fp-nav">
            <div class = "fp-nav-sf" style = {{position : "relative"}}>
            <div class = "fp-nav-dd" style = {{borderRightWidth : "2px", borderRightStyle : "rgba(255, 255, 255, 0.8)", borderRightStyle : "solid", backgroundColor : "rgba(112, 131, 190, 0.28)", position : "relative", width : "25%", height : '100%', alignItems : "center", justifyContent : 'center'}}>
                        <img src="dd.svg" style={{ transform : "rotate(90deg)", filter : "invert()", opacity : "0.7", margin : "0", width: "70%", aspectRatio: "1/1" }} />

                </div>
                <div class = "fp-nav-p"  style = {{textAlign : "center", justifyContent : "center", alignItems: "center"}}> <p>Sub-folders</p>
                </div>
                
                <div onClick = {() => {setToggle(!toggle)}} className = "fp-nav-sf-img" style = {{position : "relative", height : "75%", alignItems : "center", justifyContent : "center"}}>
                    <img style = {{height : "85%", aspectRatio : "1/1", opacity : toggle ? "0" : "100"}} src = "bars.png"/>
                    <img style = {{height : "65%", aspectRatio : "1/1", position : "absolute", opacity : toggle ? "100" : "0"}} src = "cross.png"/>
                </div>
            </div>
            <div class = "fp-nav-add">
                <div style = {{position : "relative", display : "flex", height : "55%", alignItems : "center"}}>
                    <img style = {{height : "85%", aspectRatio : "1/1"}} src = "add.png"/>
                </div>
                <p>Add video</p>
                
            </div>
        </div>

        <div className = "fp-body-wrapper" style = {{backgroundColor : "red", marginTop : "20px", display : "flex", flexDirection : "row", justifyContent : "space-between"}}>
            <div className = "sf-sb" style = {{flexDirection : "column", backgroundColor : "blue", width : "17.5vw", display : "flex", position : "relative", right : "5vw", alignItems : "center", justifyContent : "center"}}> 
                <div className = "add-sf" style = {{borderRadius : "3px", marginTop : "15px", backgroundColor : "rgba(0, 0, 0, 0.7)", display : "flex",  justifyContent : "center", alignItems : "center", gap : "7px", flexDirection : "row", position : "relative", width : "10vw", height : "27px"}}>
                    <div style = {{ display : "flex",  justifyContent : "center", alignItems : "center", position : "relative", aspectRatio : '1/1', height : "100%", }}>
                        <img style = {{height : "60%", aspectRatio : '1/1'}} src = 'add.png'/>
                    </div>
                    <p style = {{display : "flex", justifyContent : "center", alignItems : "center", color : "rgb(220, 230, 245)", fontSize : "85%"}}>Add a Folder</p>
                </div>
                
                <div className = "add-sf-db" style = {{ backgroundColor : "blue", width : "100%", display : "flex", flexDirection : "column"
                
                ,position : "absolute", top : "50px", alignItems : "center", justifyContent : "center"}}>
                    <input placeholder = "foldername"></input>
                    <button>add</button>
                </div>
            </div>

            
            <div className = "vids" style = {{backgroundColor : "green", width : "60vw"}}></div>

        </div>
    </div>)
}