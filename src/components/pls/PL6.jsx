import React, { useState } from "react";
import { Collapse, Table, Button, Form, Input } from "antd";
import "../CustomCollapse.css";
import { PLservice } from "../../service/plservice";

const { Panel } = Collapse;

const PL6 = () => {
    const title = "PL 6 : Distribution de produit";
    const enonce =
        "L’entreprise TOMO produit des conserves de tomates dans trois usines A, B et C de capacité de production annuelle respective de 200, 300 et 100 tonnes. Elle a deux clients E et F dont les demandes annuelles sont respectivement de 400 et 180 tonnes. L’entreprise dispose de deux dépôts D1, D2 par lesquels peut transiter les marchandises. Les coûts de productions sont identiques pour les trois usines. Les possibilités de transport ainsi que les coûts de transport par tonne sont donnés par le tableau suivant. La quantité pouvant être transporté entre deux nœuds quelconques ne peut dépasser les 200 tonnes. Représenter graphiquement le modèle logistique de l’entreprise. Développer un système permettant de déterminer la politique optimale de transport et de transbordement. Les cases vides indiquent une impossibilité de transport.";

    const tableColumns1 = [
        {
            title: "Usine",
            dataIndex: "usine",
            key: "usine",
        },
        {
            title: "A",
            dataIndex: "a",
            key: "a",
        },
        {
            title: "B",
            dataIndex: "b",
            key: "b",
        },
        {
            title: "C",
            dataIndex: "c",
            key: "c",
        },
    ];

    const tableData1 = [
        {
            key: "1",
            usine: "Capacité de production annuelle (tonnes)",
            a: (
                <Form.Item name="form8-A" initialValue={200}>
                    <Input type="number" />
                </Form.Item>
            ),
            b: (
                <Form.Item name="form8-B" initialValue={300}>
                    <Input type="number" />
                </Form.Item>
            ),
            c: (
                <Form.Item name="form8-C" initialValue={100}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
        {
            key: "2",
            usine: "Cout de production",
            a: (
                <Form.Item name="form9-A" initialValue={1}>
                    <Input type="number" />
                </Form.Item>
            ),
            b: (
                <Form.Item name="form9-B" initialValue={1}>
                    <Input type="number" />
                </Form.Item>
            ),
            c: (
                <Form.Item name="form9-C" initialValue={1}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
    ];
    const tableColumns2 = [
        {
            title: "Client",
            dataIndex: "client",
            key: "client",
        },
        {
            title: "E",
            dataIndex: "e",
            key: "e",
        },
        {
            title: "F",
            dataIndex: "f",
            key: "f",
        },
    ];

    const tableData2 = [
        {
            key: "1",
            client: "Demandes annuelles (tonnes)",
            e: (
                <Form.Item name="form-10-E" initialValue={400}>
                    <Input type="number" />
                </Form.Item>
            ),
            f: (
                <Form.Item name="form-10-F" initialValue={180}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
    ];
    const tableColumns4 = [
        {
            title: "Quantite de transport maximale entre deux nœuds",
            dataIndex: "quantite_trans",
            key: "quantite_trans",
        },
    ];

    const tableData4 = [
        {
            key: "1",
            quantite_trans: (
                <Form.Item name="form-11-transport" initialValue={200}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
    ];

    const tableColumns3 = [
        {
            title: "Transport",
            dataIndex: "transport",
            key: "transport",
        },
        {
            title: "A",
            dataIndex: "a",
            key: "a",
        },
        {
            title: "B",
            dataIndex: "b",
            key: "b",
        },
        {
            title: "C",
            dataIndex: "c",
            key: "c",
        },
        {
            title: "D1",
            dataIndex: "d1",
            key: "d1",
        },
        {
            title: "D2",
            dataIndex: "d2",
            key: "d2",
        },
        {
            title: "E",
            dataIndex: "e",
            key: "e",
        },
        {
            title: "F",
            dataIndex: "f",
            key: "f",
        },
    ];

    const tableData3 = [
        {
            key: "1",
            transport: "A",
            a: (
                <Form.Item name="form1-A" initialValue={-1}>
                    <Input type="number" disabled />
                </Form.Item>
            ),
            b: (
                <Form.Item name="form1-B" initialValue={5}>
                    <Input type="number" />
                </Form.Item>
            ),
            c: (
                <Form.Item name="form1-C" initialValue={3}>
                    <Input type="number" />
                </Form.Item>
            ),
            d1: (
                <Form.Item name="form1-D1" initialValue={5}>
                    <Input type="number" />
                </Form.Item>
            ),
            d2: (
                <Form.Item name="form1-D2" initialValue={5}>
                    <Input type="number" />
                </Form.Item>
            ),
            e: (
                <Form.Item name="form1-E" initialValue={20}>
                    <Input type="number" />
                </Form.Item>
            ),
            f: (
                <Form.Item name="form1-F" initialValue={20}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
        {
            key: "2",
            transport: "B",
            a: (
                <Form.Item name="form2-A" initialValue={9}>
                    <Input type="number" />
                </Form.Item>
            ),
            b: (
                <Form.Item name="form2-B" initialValue={-1}>
                    <Input type="number" disabled />
                </Form.Item>
            ),
            c: (
                <Form.Item name="form2-C" initialValue={9}>
                    <Input type="number" />
                </Form.Item>
            ),
            d1: (
                <Form.Item name="form2-D1" initialValue={1}>
                    <Input type="number" />
                </Form.Item>
            ),
            d2: (
                <Form.Item name="form2-D2" initialValue={1}>
                    <Input type="number" />
                </Form.Item>
            ),
            e: (
                <Form.Item name="form2-E" initialValue={8}>
                    <Input type="number" />
                </Form.Item>
            ),
            f: (
                <Form.Item name="form2-F" initialValue={15}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
        {
            key: "3",
            transport: "C",
            a: (
                <Form.Item name="form3-A" initialValue={0.4}>
                    <Input type="number" />
                </Form.Item>
            ),
            b: (
                <Form.Item name="form3-B" initialValue={8}>
                    <Input type="number" />
                </Form.Item>
            ),
            c: (
                <Form.Item name="form3-C" initialValue={-1}>
                    <Input type="number" disabled />
                </Form.Item>
            ),
            d1: (
                <Form.Item name="form3-D1" initialValue={1}>
                    <Input type="number" />
                </Form.Item>
            ),
            d2: (
                <Form.Item name="form3-D2" initialValue={0.5}>
                    <Input type="number" />
                </Form.Item>
            ),
            e: (
                <Form.Item name="form3-E" initialValue={10}>
                    <Input type="number" />
                </Form.Item>
            ),
            f: (
                <Form.Item name="form3-F" initialValue={12}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
        {
            key: "4",
            transport: "D1",
            a: (
                <Form.Item name="form4-A" initialValue={-1}>
                    <Input type="number" />
                </Form.Item>
            ),
            b: (
                <Form.Item name="form4-B" initialValue={-1}>
                    <Input type="number" />
                </Form.Item>
            ),
            c: (
                <Form.Item name="form4-C" initialValue={-1}>
                    <Input type="number" />
                </Form.Item>
            ),
            d1: (
                <Form.Item name="form4-D1" initialValue={-1}>
                    <Input type="number" disabled />
                </Form.Item>
            ),
            d2: (
                <Form.Item name="form4-D2" initialValue={1.2}>
                    <Input type="number" />
                </Form.Item>
            ),
            e: (
                <Form.Item name="form4-E" initialValue={2}>
                    <Input type="number" />
                </Form.Item>
            ),
            f: (
                <Form.Item name="form4-F" initialValue={12}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
        {
            key: "5",
            transport: "D2",
            a: (
                <Form.Item name="form5-A" initialValue={-1}>
                    <Input type="number" />
                </Form.Item>
            ),
            b: (
                <Form.Item name="form5-B" initialValue={-1}>
                    <Input type="number" />
                </Form.Item>
            ),
            c: (
                <Form.Item name="form5-C" initialValue={-1}>
                    <Input type="number" />
                </Form.Item>
            ),
            d1: (
                <Form.Item name="form5-D1" initialValue={0.8}>
                    <Input type="number" />
                </Form.Item>
            ),
            d2: (
                <Form.Item name="form5-D2" initialValue={-1}>
                    <Input type="number" disabled />
                </Form.Item>
            ),
            e: (
                <Form.Item name="form5-E" initialValue={2}>
                    <Input type="number" />
                </Form.Item>
            ),
            f: (
                <Form.Item name="form5-F" initialValue={12}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
        {
            key: "5",
            transport: "E",
            a: (
                <Form.Item name="form6-A" initialValue={-1}>
                    <Input type="number" />
                </Form.Item>
            ),
            b: (
                <Form.Item name="form6-B" initialValue={-1}>
                    <Input type="number" />
                </Form.Item>
            ),
            c: (
                <Form.Item name="form6-C" initialValue={-1}>
                    <Input type="number" />
                </Form.Item>
            ),
            d1: (
                <Form.Item name="form6-D1" initialValue={-1}>
                    <Input type="number" />
                </Form.Item>
            ),
            d2: (
                <Form.Item name="form6-D2" initialValue={-1}>
                    <Input type="number" />
                </Form.Item>
            ),
            e: (
                <Form.Item name="form6-E" initialValue={-1}>
                    <Input type="number" disabled />
                </Form.Item>
            ),
            f: (
                <Form.Item name="form6-F" initialValue={1}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
        {
            key: "6",
            transport: "F",
            a: (
                <Form.Item name="form7-A" initialValue={-1}>
                    <Input type="number" />
                </Form.Item>
            ),
            b: (
                <Form.Item name="form7-B" initialValue={-1}>
                    <Input type="number" />
                </Form.Item>
            ),
            c: (
                <Form.Item name="form7-C" initialValue={-1}>
                    <Input type="number" />
                </Form.Item>
            ),
            d1: (
                <Form.Item name="form7-D1" initialValue={-1}>
                    <Input type="number" />
                </Form.Item>
            ),
            d2: (
                <Form.Item name="form7-D2" initialValue={-1}>
                    <Input type="number" />
                </Form.Item>
            ),
            e: (
                <Form.Item name="form7-E" initialValue={7}>
                    <Input type="number" />
                </Form.Item>
            ),
            f: (
                <Form.Item name="form7-F" initialValue={-1}>
                    <Input type="number" disabled />
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
            capacite_usine: [],
            cout_usine: [],
            demande_client: [],
            matrice: [],
            quantite_trans: [],
        };

        const rowA = [];
        const rowB = [];
        const rowC = [];
        const rowD1 = [];
        const rowD2 = [];
        const rowE = [];
        const rowF = [];

        for (const [key, value] of Object.entries(values)) {
            if (key.includes("form1")) {
                rowA.push(parseFloat(value));
            }

            if (key.includes("form2")) {
                rowB.push(parseFloat(value));
            }

            if (key.includes("form3")) {
                rowC.push(parseFloat(value));
            }
            if (key.includes("form4")) {
                rowD1.push(parseFloat(value));
            }

            if (key.includes("form5")) {
                rowD2.push(parseFloat(value));
            }

            if (key.includes("form6")) {
                rowE.push(parseFloat(value));
            }

            if (key.includes("form7")) {
                rowF.push(parseFloat(value));
            }
            if (key.includes("form8")) {
                request.capacite_usine.push(parseFloat(value));
            }

            if (key.includes("form9")) {
                request.cout_usine.push(parseFloat(value));
            }

            if (key.includes("form-10")) {
                request.demande_client.push(parseFloat(value));
            }

            if (key.includes("form-11")) {
                request.quantite_trans.push(parseFloat(value));
            }
        }

        request.matrice.push(rowA);
        request.matrice.push(rowB);
        request.matrice.push(rowC);
        request.matrice.push(rowD1);
        request.matrice.push(rowD2);
        request.matrice.push(rowE);
        request.matrice.push(rowF);

        console.log(request);

        const final_result = await PLservice(request, "pl6");
        setResult(final_result.res6);

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
                        {tables.map((tab) => (
                            <Table
                                dataSource={tab.data}
                                columns={tab.col}
                                pagination={false}
                            />
                        ))}
                        {/* <Table
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
                        /> */}
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
                                <div className="col">
                                    {Object.entries(result).map((item) => {
                                        return (
                                            <div>
                                                <h2>{item[0]}</h2>
                                                {Object.entries(item[1]).map(
                                                    (e) => {
                                                        return (
                                                            <div>
                                                                {e[0]} : {e[1]}
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        );
                                    })}
                                    {/* <div>
                                        <h2>A</h2>
                                        {Object.entries(result.matrix.A).map(
                                            (item) => {
                                                console.log(item);
                                                return (
                                                    <div>
                                                        {item[0]} : {item[1]}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div> */}
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

export default PL6;
