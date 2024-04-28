import React, { useState } from "react";
import { Collapse, Table, Button, Form, Input } from "antd";
import "../CustomCollapse.css";
import { PLservice } from "../../service/plservice";

const { Panel } = Collapse;

const PL5 = () => {
    const title = "PL 5 : La production d’électricité";
    const enonce =
        "La société STE produit de l’électricité dans trois centrales et fourni l’électricité à quatre villes. L’offre des trois centrales est donnée en million de Kwh dans le tableau 1. Le tableau 2 donne, en million de Kwh, la demande maximale de chacune des quatre villes. Le coût de transport d’un Kwh d’une centrale donnée à une ville donnée est donné par le tableau 3. \n 1. Déterminer la meilleure politique permettant de satisfaire les demandes des quatre villes. \n 2. Supposons que la demande de chacune des villes a augmenté de 5 millions de Kwh. Déterminer la meilleure politique permettant de satisfaire au mieux les différentes demandes en sachant que l’on subi une pénalité pour toute unité de demande non satisfaite (voir tableau 4). ";

    const tableColumns1 = [
        {
            title: "Centrale",
            dataIndex: "centrale",
            key: "centrale",
        },
        {
            title: "Offres",
            dataIndex: "offres",
            key: "offres",
        },
    ];

    const tableData1 = [
        {
            key: "1",
            centrale: "Centrale1",
            offres: (
                <Form.Item name="form1-1" initialValue={35}>
                    <Input />
                </Form.Item>
            ), //35
        },
        {
            key: "2",
            centrale: "Centrale2",
            offres: (
                <Form.Item name="form1-2" initialValue={50}>
                    <Input />
                </Form.Item>
            ), //50
        },
        {
            key: "3",
            centrale: "Centrale3",
            offres: (
                <Form.Item name="form1-3" initialValue={40}>
                    <Input />
                </Form.Item>
            ), //40
        },
    ];

    const tableColumns2 = [
        {
            title: "Ville",
            dataIndex: "ville",
            key: "ville",
        },
        {
            title: "Demande",
            dataIndex: "demande",
            key: "demande",
        },
    ];

    const tableData2 = [
        {
            //rows1
            key: "1",
            ville: "Ville1",
            demande: (
                <Form.Item name="form2-1" initialValue={45}>
                    <Input />
                </Form.Item>
            ), //45
        },
        {
            key: "2",
            ville: "Ville2",
            demande: (
                <Form.Item name="form2-2" initialValue={20}>
                    <Input />
                </Form.Item>
            ), //20
        },
        {
            key: "3",
            ville: "Ville3",
            demande: (
                <Form.Item name="form2-3" initialValue={30}>
                    <Input />
                </Form.Item>
            ), //30
        },
        {
            key: "4",
            ville: "Ville4",
            demande: (
                <Form.Item name="form2-4" initialValue={30}>
                    <Input />
                </Form.Item>
            ), //30
        },
    ];

    const tableColumns3 = [
        {
            title: "Centrale / Ville",
            dataIndex: "centrale_ville",
            key: "entrale_ville",
        },
        {
            title: "Ville1",
            dataIndex: "ville1",
            key: "ville1",
        },
        {
            title: "Ville2",
            dataIndex: "ville2",
            key: "ville2",
        },
        {
            title: "Ville3",
            dataIndex: "ville3",
            key: "ville3",
        },
        {
            title: "Ville4",
            dataIndex: "ville4",
            key: "ville4",
        },
    ];

    const tableData3 = [
        {
            //rows1
            key: "1",
            centrale_ville: "Centrale1",
            ville1: (
                <Form.Item name="form3-1" initialValue={8}>
                    <Input />
                </Form.Item>
            ),
            ville2: (
                <Form.Item name="form3-2" initialValue={6}>
                    <Input />
                </Form.Item>
            ),
            ville3: (
                <Form.Item name="form3-3" initialValue={10}>
                    <Input />
                </Form.Item>
            ),
            ville4: (
                <Form.Item name="form3-4" initialValue={9}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "2",
            centrale_ville: "Centrale2",
            ville1: (
                <Form.Item name="form4-1" initialValue={9}>
                    <Input />
                </Form.Item>
            ),
            ville2: (
                <Form.Item name="form4-2" initialValue={12}>
                    <Input />
                </Form.Item>
            ),
            ville3: (
                <Form.Item name="form4-3" initialValue={13}>
                    <Input />
                </Form.Item>
            ),
            ville4: (
                <Form.Item name="form4-4" initialValue={7}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "3",
            centrale_ville: "Centrale3",
            ville1: (
                <Form.Item name="form5-1" initialValue={14}>
                    <Input />
                </Form.Item>
            ),
            ville2: (
                <Form.Item name="form5-2" initialValue={9}>
                    <Input />
                </Form.Item>
            ),
            ville3: (
                <Form.Item name="form5-3" initialValue={16}>
                    <Input />
                </Form.Item>
            ),
            ville4: (
                <Form.Item name="form5-4" initialValue={5}>
                    <Input />
                </Form.Item>
            ),
        },
    ];
    const tableColumns4 = [
        {
            title: "Penalite / Ville",
            dataIndex: "penalite_ville",
            key: "penalite_ville",
        },
        {
            title: "Ville1",
            dataIndex: "ville1",
            key: "ville1",
        },
        {
            title: "Ville2",
            dataIndex: "ville2",
            key: "ville2",
        },
        {
            title: "Ville3",
            dataIndex: "ville3",
            key: "ville3",
        },
        {
            title: "Ville4",
            dataIndex: "ville4",
            key: "ville4",
        },
    ];

    const tableData4 = [
        {
            //rows1
            key: "1",
            penalite_ville: "Penalite",
            ville1: (
                <Form.Item name="form6-1" initialValue={20}>
                    <Input />
                </Form.Item>
            ),
            ville2: (
                <Form.Item name="form6-2" initialValue={25}>
                    <Input />
                </Form.Item>
            ),
            ville3: (
                <Form.Item name="form6-3" initialValue={22}>
                    <Input />
                </Form.Item>
            ),
            ville4: (
                <Form.Item name="form6-4" initialValue={35}>
                    <Input />
                </Form.Item>
            ),
        },
    ];

    const tables = [
        {
            col: tableColumns1,
            data: tableData1,
        },
        {
            col: tableColumns2,
            data: tableData2,
        },
        {
            col: tableColumns3,
            data: tableData3,
        },
        {
            col: tableColumns4,
            data: tableData4,
        },
    ];

    const onFinish = async (values) => {
        const request = {
            centrales_offres: [],
            villes_demande: [],
            centrales_villes: [],
            penalite_villes: [],
        };

        const centrale1_villes = [];
        const centrale2_villes = [];
        const centrale3_villes = [];

        for (const [key, value] of Object.entries(values)) {
            if (key.includes("form1")) {
                request.centrales_offres.push(value);
            }

            if (key.includes("form2")) {
                request.villes_demande.push(value);
            }

            if (key.includes("form3")) {
                centrale1_villes.push(value);
            }
            if (key.includes("form4")) {
                centrale2_villes.push(value);
            }

            if (key.includes("form5")) {
                centrale3_villes.push(value);
            }

            if (key.includes("form6")) {
                request.penalite_villes.push(value);
            }
        }

        request.centrales_villes.push(centrale1_villes);
        request.centrales_villes.push(centrale2_villes);
        request.centrales_villes.push(centrale3_villes);

        console.log(request);

        const final_result = await PLservice(request, "pl5");
        setResult(final_result.res5);

        console.log(final_result);
    };

    const [result, setResult] = useState(null);
    
    return (
        <Collapse className="collpase">
            <Panel header={title}>
                <p>{enonce}</p>
                <br />
                <h2 className="warning">Veuillez donner des valeurs positives</h2>
                <div className="tabs-container">
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Table
                            dataSource={tables[0].data}
                            columns={tables[0].col}
                            pagination={false}
                        />
                        <Table
                            dataSource={tables[1].data}
                            columns={tables[1].col}
                            pagination={false}
                        />
                        <Table
                            dataSource={tables[2].data}
                            columns={tables[2].col}
                            pagination={false}
                        />
                        <Table
                            dataSource={tables[3].data}
                            columns={tables[3].col}
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
                                    {console.log(result)}
                                    {Object.entries(result).map(
                                        (item, index) => {
                                            console.log(item[1]);
                                            return (
                                                <div key={index}>{item[1]}</div>
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

export default PL5;
