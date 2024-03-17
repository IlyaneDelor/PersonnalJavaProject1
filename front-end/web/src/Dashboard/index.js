import React from "react";
import { useLocalState } from "../util/useLocalStorage";


const Dashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    return (
        <div>
            <div className="App">
                <div> JWT Value is {jwt}</div>
            </div>
        </div>


    );
};

export default Dashboard;