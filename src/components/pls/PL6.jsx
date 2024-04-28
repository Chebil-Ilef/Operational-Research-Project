import React, { useState } from "react";
import { Collapse, Table, Button, Form, Input } from "antd";
import "../CustomCollapse.css";
import { PLservice } from "../../service/plservice";

const { Panel } = Collapse;

const PL6 = () => {
    const title = "PL 6 : Problème de réseau";
    const enonce =
        `représente un réseau IP où on considère un seul sens de transmission indiqué par les flèches.
        Le nombre figurant sur chaque lien indique la durée nécessaire (en secondes) pour transférer un paquet IP en
        empruntant ce lien.`;
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

export default PL6;
