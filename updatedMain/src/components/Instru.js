import "./instruStyles.css";
import { InstruList } from "./InstruList.js";
import { Button } from "@mui/material";

export default function Instru() {
    return (
        <div className="head">
            
            <h1>
                To get Started
            </h1>
            <p> instructions on how to start</p>
            <a href = "/features">
            <Button variant = "contained">Start Creation</Button>
            </a>
            {InstruList.map((instru,index) => {
            return (
                <div className = "steps">
                <div className="steps-text">
                            <h2>
                            {instru.heading}
                            </h2>
                            <p>
                                {instru.text}
                            </p>
                        </div>
                            <div className = "image">
                            <img alt= {instru.heading} src = {instru.img}/>
                            <img alt = {instru.heading} src = {instru.img}/>
                            </div>
                        
                </div>
            );})}
        </div>
    );
}