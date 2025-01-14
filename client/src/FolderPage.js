import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Form, Link } from 'react-router-dom';
import data from './data.js'
import axios from 'axios';

export default function FolderPage() {
    let [toggle, setToggle] = useState(false);

    return(<div style = {{minHeight : "100vh"}}>

        <div class = "fp-nav">
            <div class = "fp-nav-sf" style = {{position : "relative"}}>
            <div class = "fp-nav-dd" style = {{ position : "relative", height : "85%", alignItems : "center"}}>
                        <img src="dd.svg" style={{ filter : "invert()", opacity : "0.7", margin : "0", height: "70%", aspectRatio: "1/1" }} />

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
    </div>)
}