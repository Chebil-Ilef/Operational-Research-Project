import React, { useState } from "react";
import { Collapse, Table, Button, Form, Input } from "antd";
import "../CustomCollapse.css";
import { PLservice } from "../../service/plservice";

const { Panel } = Collapse;

const PL5 = () => {
    const title = "PL 5 : Problème de positionnement";
    const enonce =
        `Une compagnie téléphonique spécialisée dans les téléphones mobiles est nouvellement installée dans un pays dont
        le plan est présenté ci-dessous. Les antennes d’émission peuvent être placées sur les sites A,..., G situés sur les
        frontières communes des différentes zones du pays. Une antenne placée sur un site donné peut couvrir les deux
        zones dont la frontière commune abrite ce site. Le but de la compagnie est d’assurer au moindre coût le
        recouvrement de chaque zone avec au moins une antenne tout en couvrant la zone 4 avec au moins deux antennes.
        Formuler le programme linéaire qui permet d’atteindre ce but.`;
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

export default PL5;
