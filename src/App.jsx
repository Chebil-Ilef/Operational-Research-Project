
import "./App.css";
import "./components/CustomCollapse.css";
import PL1 from "./components/pls/PL1";
import PL2 from "./components/pls/PL2";
import PL3 from "./components/pls/PL3";
import PL4 from "./components/pls/PL4";
import PL5 from "./components/pls/PL5";





const App = () => {

    return (
        <div className="content">
            <h1
                style={{
                    textAlign: "center",
                    fontSize: "2.5em",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    //uppercase  text
                    textTransform: "uppercase",
                }}
            >Application de Recherche Opérationnelle </h1>
            <div
            className="container"
            >
               <p>
               Cette application utilise des techniques de
programmation linéaire (PL) et mixte (PLNE/PLM) pour résoudre des problèmes
d'optimisation.
                </p>
                <p>
                    Réalisée par : <br/>
                <p
                    style={{
                        marginLeft: "20px",
                    }}
                >
                -  Chebil Ilef <br/>
                -  Elhaj Asma <br/>
                -  Medimegh Olfa <br/>
                -  Mansouri Samer <br/>
                </p>
                </p>

            </div>

            <div className="container">
                <PL1/>
                <PL2/>
                <PL3/>
                <PL4/>
                {/* <PL5/> */}
                <PL5/>
               
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
