import "./Footer.css";

export default function Footer() {
    return (
        <div className = "footer">
            <div className = "top">
                <div>
                    <h1>Matrix</h1>
                </div>
                <div>
                    <a href = "/">
                        <i className = "fa-brands fa-facebook-square"></i>
                    </a>
                </div>
            </div>
            <div className = "bottom">
                <div>
                <h4>
                    Graphs
                </h4>
                <a href = "/">graphs</a>
                </div>

                <div>
                <h4>
                    Templates
                </h4>
                <a href = "/">templates</a>
                </div>

                <div>
                <h4>
                    Learn
                </h4>
                <a href = "/">learn</a>
                </div>
            </div>
        </div>
    )
}