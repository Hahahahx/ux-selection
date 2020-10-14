import React from "react";
import ReactDOM from "react-dom";
import Selection from "../src/Selection";

const App = () => {
    return (
        <>
            <div style={{height:'100vh',width:'100vw'}}>
                <Selection> 

                </Selection>
            </div>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
