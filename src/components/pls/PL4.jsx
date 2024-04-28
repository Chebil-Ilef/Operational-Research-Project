import React, { useState } from "react";
import { Collapse, Table, Button, Form, Input } from "antd";
import "../CustomCollapse.css";
import { PLservice } from "../../service/plservice";

const { Panel } = Collapse;

const PL4 = () => {
    const title = "PL 4 : Choix d’implantation d’agences bancaires";
    const enonce =
        `Disposant d’un budget B, une banque cherche à déterminer la localisation optimale de nouvelles agences et de
        nouveaux serveurs DAB, qu’elle compte ouvrir en janvier 2006. L’Investissement est de K milliers de dinars pour
        une agence, pour un serveur DAB le coût est de D milliers de dinars. Neuf régions sont sous considération. Dans
        chaque région, on aura au maximum une agence. En ayant une agence dans la région Ri, on aura un nombre de
        clients égal à a% de population de la région Ri et b% de celles des régions voisines. Un serveur DAB dans une
        zone Ri donnera un nombre de clients égal à c% de la population de la région Ri. La matrice A= (aij) i=1,...,9 et
        j=1,...,9 donne pour chaque région, les régions voisines (1 si régions voisines, 0 sinon).`;
        const [result, setResult] = useState(null);

        return (
            <Collapse className="collpase">
                <Panel header={title}>
                    <p>{enonce}</p>
                    <br />
                </Panel>
            </Collapse>
        );
};
export default PL4;
