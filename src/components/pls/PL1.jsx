import React, { useState } from "react";
import { Collapse, Table, Button, Form, Input, Spin } from "antd";
import "../CustomCollapse.css";
import { PLservice } from "../../service/plservice";

const { Panel } = Collapse;

const PL1 = () => {
    const title = "PL 1 : Gestion optimale d’une zone agricole";
    const enonce =
        "L’Etat tunisien veut mettre en valeur une zone agricole de 1000 hectares ou cinq cultures sont à priori possibles : le blé, l’orge, le mais, la betterave à sucre et le tournesol. Les disponibilités des différents facteurs de production sont comme suit : Main d’œuvre : 3000 ouvriers agricoles. Eau d’irrigation : 25000000 m3. Heures machine : 24000 Heures machine";

    const tableColumns1 = [
        {
            title: "Ressource",
            dataIndex: "ressource",
            key: "ressource",
        },
        {
            title: "Blé",
            dataIndex: "ble",
            key: "ble",
        },
        {
            title: "Orge",
            dataIndex: "orge",
            key: "orge",
        },
        {
            title: "Mais",
            dataIndex: "mais",
            key: "mais",
        },
        {
            title: "Bet-sucre",
            dataIndex: "bet_sucre",
            key: "bet_sucre",
        },
        {
            title: "Tournesol",
            dataIndex: "tournesol",
            key: "tournesol",
        },
    ];
    const tableData1 = [
        {
            // ROW1: Rendement Q/ha
            key: "1",
            ressource: "Rendement Q/ha",
            ble: (
                <Form.Item name="form1-ble" initialValue={75}>
                    <Input type="number" />
                </Form.Item>
            ),
            orge: (
                <Form.Item name="form1-orge" initialValue={60}>
                    <Input type="number" />
                </Form.Item>
            ),
            mais: (
                <Form.Item name="form1-mais" initialValue={55}>
                    <Input type="number" />
                </Form.Item>
            ),
            bet_sucre: (
                <Form.Item name="form1-bet-sucre" initialValue={50}>
                    <Input type="number" />
                </Form.Item>
            ),
            tournesol: (
                <Form.Item name="form1-tournesol" initialValue={60}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
        {
            // ROW2: Prix de vente UM/Q
            key: "2",
            ressource: "Prix de vente UM/Q",
            ble: (
                <Form.Item name="form2-ble" initialValue={60}>
                    <Input type="number" />
                </Form.Item>
            ),
            orge: (
                <Form.Item name="form2-orge" initialValue={50}>
                    <Input type="number" />
                </Form.Item>
            ),
            mais: (
                <Form.Item name="form2-mais" initialValue={66}>
                    <Input type="number" />
                </Form.Item>
            ),
            bet_sucre: (
                <Form.Item name="form2-bet-sucre" initialValue={110}>
                    <Input type="number" />
                </Form.Item>
            ),
            tournesol: (
                <Form.Item name="form2-tournesol" initialValue={60}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
        {
            // ROW3: M.O.Ouvriers/ha
            key: "3",
            ressource: "M.O.Ouvriers/ha",
            ble: (
                <Form.Item name="form3-ble" initialValue={2}>
                    <Input type="number" />
                </Form.Item>
            ),
            orge: (
                <Form.Item name="form3-orge" initialValue={1}>
                    <Input type="number" />
                </Form.Item>
            ),
            mais: (
                <Form.Item name="form3-mais" initialValue={2}>
                    <Input type="number" />
                </Form.Item>
            ),
            bet_sucre: (
                <Form.Item name="form3-bet-sucre" initialValue={3}>
                    <Input type="number" />
                </Form.Item>
            ),
            tournesol: (
                <Form.Item name="form3-tournesol" initialValue={2}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
        {
            // ROW 4: Temps machine H/ha
            key: "4",
            ressource: "Temps machine H/ha",
            ble: (
                <Form.Item name="form4-ble" initialValue={30}>
                    <Input type="number" />
                </Form.Item>
            ),
            orge: (
                <Form.Item name="form4-orge" initialValue={24}>
                    <Input type="number" />
                </Form.Item>
            ),
            mais: (
                <Form.Item name="form4-mais" initialValue={20}>
                    <Input type="number" />
                </Form.Item>
            ),
            bet_sucre: (
                <Form.Item name="form4-bet-sucre" initialValue={28}>
                    <Input type="number" />
                </Form.Item>
            ),
            tournesol: (
                <Form.Item name="form4-tournesol" initialValue={25}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
        {
            key: "5",
            ressource: "Eau m3/ha",
            ble: (
                <Form.Item name="form5-ble" initialValue={3000}>
                    <Input type="number" />
                </Form.Item>
            ),
            orge: (
                <Form.Item name="form5-orge" initialValue={2000}>
                    <Input type="number" />
                </Form.Item>
            ),
            mais: (
                <Form.Item name="form5-mais" initialValue={2500}>
                    <Input type="number" />
                </Form.Item>
            ),
            bet_sucre: (
                <Form.Item name="form5-bet-sucre" initialValue={3800}>
                    <Input type="number" />
                </Form.Item>
            ),
            tournesol: (
                <Form.Item name="form5-tournesol" initialValue={3200}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
        {
            key: "6",
            ressource: "Salaire annuel/ouvrier",
            ble: (
                <Form.Item name="form6-ble" initialValue={500}>
                    <Input type="number" />
                </Form.Item>
            ),
            orge: (
                <Form.Item name="form6-orge" initialValue={500}>
                    <Input type="number" />
                </Form.Item>
            ),
            mais: (
                <Form.Item name="form6-mais" initialValue={600}>
                    <Input type="number" />
                </Form.Item>
            ),
            bet_sucre: (
                <Form.Item name="form6-bet-sucre" initialValue={700}>
                    <Input type="number" />
                </Form.Item>
            ),
            tournesol: (
                <Form.Item name="form6-tournesol" initialValue={550}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
        {
            key: "7",
            ressource: "Frais fixe de gestion",
            ble: (
                <Form.Item name="form7-ble" initialValue={250}>
                    <Input type="number" />
                </Form.Item>
            ),
            orge: (
                <Form.Item name="form7-orge" initialValue={180}>
                    <Input type="number" />
                </Form.Item>
            ),
            mais: (
                <Form.Item name="form7-mais" initialValue={190}>
                    <Input type="number" />
                </Form.Item>
            ),
            bet_sucre: (
                <Form.Item name="form7-bet-sucre" initialValue={310}>
                    <Input type="number" />
                </Form.Item>
            ),
            tournesol: (
                <Form.Item name="form7-tournesol" initialValue={320}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
    ];

    const tableColumns2 = [
        {
            title: "Zone Agricole",
            dataIndex: "zone_agricole",
            key: "zone_agricole",
        },
        {
            title: "Main d'oeuvre",
            dataIndex: "main_oeuvre",
            key: "main_oeuvre",
        },
        {
            title: "Eau d'irrigation",
            dataIndex: "eau",
            key: "eau",
        },
        {
            title: "Heures machine",
            dataIndex: "heures_machine",
            key: "heures_machine",
        },
        {
            title: "Cout heure machine",
            dataIndex: "cout_heure_machine",
            key: "cout_heure_machine",
        },
        {
            title: "Cout metre cube eau",
            dataIndex: "cout_eau",
            key: "cout_eau",
        },
    ];

    const tableData2 = [
        {
            zone_agricole: (
                <Form.Item name="form8-zone-agricole" initialValue={1000}>
                    <Input type="number" />
                </Form.Item>
            ),
            main_oeuvre: (
                <Form.Item name="form8-main-oeuvre" initialValue={3000}>
                    <Input type="number" />
                </Form.Item>
            ),
            eau: (
                <Form.Item name="form8-eau" initialValue={25000000}>
                    <Input type="number" />
                </Form.Item>
            ),
            heures_machine: (
                <Form.Item name="form8-heures-machine" initialValue={24000}>
                    <Input type="number" />
                </Form.Item>
            ),
            cout_heure_machine: (
                <Form.Item name="form8-cout-heure-machine" initialValue={30}>
                    <Input type="number" />
                </Form.Item>
            ),
            cout_eau: (
                <Form.Item name="form8-cout-eau" initialValue={0.1}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
    ];

    const tables1 = [
        {
            col: tableColumns1,
            data: tableData1,
        },
        {
            col: tableColumns2,
            data: tableData2,
        },
    ];

    const onFinish = async (values) => {
        setloading(true);
        const request = {
            Rd: [],
            Pv: [],
            MO: [],
            M: [],
            E: [],
            S: [],
            F: [],
            autres: [],
        };

        for (const [key, value] of Object.entries(values)) {
            if (key.includes("form1")) {
                request.Rd.push(parseFloat(parseFloat(value)));
            }

            if (key.includes("form2")) {
                request.Pv.push(parseFloat(parseFloat(value)));
            }

            if (key.includes("form3")) {
                request.MO.push(parseFloat(parseFloat(value)));
            }
            if (key.includes("form4")) {
                request.M.push(parseFloat(parseFloat(value)));
            }

            if (key.includes("form5")) {
                request.E.push(parseFloat(parseFloat(value)));
            }

            if (key.includes("form6")) {
                request.S.push(parseFloat(parseFloat(value)));
            }

            if (key.includes("form7")) {
                request.F.push(parseFloat(parseFloat(value)));
            }

            if (key.includes("form8")) {
                request.autres.push(parseFloat(parseFloat(value)));
            }
        }

        console.log(request);

        const final_result = await PLservice(request, "pl1");
        setResult(final_result.res1);

        setloading(false);
    };

    const [result, setResult] = useState(null);
    const [loading, setloading] = useState(false);

    return (
        <Collapse className="collpase">
            <Panel header={title}>
                <p>{enonce}</p>
                <br /><h2 className="warning">Veuillez donner des valeurs positives</h2>
                <div className="tabs-container">
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Table
                            key={1}
                            dataSource={tables1[0].data}
                            columns={tables1[0].col}
                            pagination={false}
                        />
                        <Table
                            key={2}
                            dataSource={tables1[1].data}
                            columns={tables1[1].col}
                            pagination={false}
                        />
                        <div className="btns-container">
                            <Form.Item>
                                <Button htmlType="submit">Solve</Button>
                            </Form.Item>

                            <Form.Item>
                                <Button htmlType="reset">Reset</Button>
                            </Form.Item>
                        </div>
                        <div className="solution">
                            {result != null ? (
                                <div>
                                    {Object.entries(result).map(
                                        (item, index) => {
                                            return (
                                                <div key={index}>
                                                    {item[0]} : {item[1]}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </Form>
                </div>
            </Panel>
        </Collapse>
    );
};

export default PL1;
