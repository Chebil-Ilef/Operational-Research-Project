import PL1 from "./components/pls/PL1"
import PL5 from "./components/pls/PL5";
import "./App.css";
import "./components/CustomCollapse.css";

import PL6 from "./components/pls/PL6";
import PL3 from "./components/pls/PL3";
import PL2 from "./components/pls/PL2";
import PL7 from "./components/pls/PL7";
import PL8 from "./components/pls/PL8";
import PL9 from "./components/pls/PL9";



const App = () => {

    return (
        <div className="content">
            <h1>Linear Program Solver</h1>

            <div className="container">
                <PL1/>
                <PL2/>
                <PL3/>
                <PL5/>
                <PL6/>
                <PL7/>
                <PL8/>
                <PL9/>
                {/* {pls.map((pl, index) => (
                    <div key={index}>
                        <CustomCollapse
                            pl={pl}
                            index={index}
                            pl_model={models[index]}
                        />
                    </div>
                ))} */}
            </div>
        </div>
    );
};
export default App;
