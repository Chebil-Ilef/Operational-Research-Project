
import "./App.css";
import "./components/CustomCollapse.css";
import PL1 from "./components/pls/PL1";
import PL2 from "./components/pls/PL2";
import PL3 from "./components/pls/PL3";
import PL4 from "./components/pls/PL4";
import PL5 from "./components/pls/PL5";
import PL6 from "./components/pls/PL6";





const App = () => {

    return (
        <div className="content">
            <h1>Application de Recherche Opérationnelle </h1>

            <div className="container">
                <PL1/>
                <PL2/>
                <PL3/>
                <PL4/>
                <PL5/>
                <PL6/>
               
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
