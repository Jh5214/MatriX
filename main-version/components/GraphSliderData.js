import "./GraphSlider.css";

export default function GraphSliderData(props) {
    return (
        <div className = "t-card">
            <div className = "t-image">
                <img src = {props.image} alt = {props.alt}/>
            </div>
            <h4>{props.heading}</h4>
            <p> {props.text}</p>
        </div>
    );
}