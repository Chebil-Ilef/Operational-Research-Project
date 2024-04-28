import React, { useState } from "react";
import { Collapse, Table, Button, Form, Input } from "antd";
import "../CustomCollapse.css";
import { PLservice } from "../../service/plservice";

const { Panel } = Collapse;

const PL9 = () => {
    const title =
        "PL 9 : Localisation d’usine et de dépôts et Planification logistique ";
    const enonce =
        "Tomo producteur de conserve de tomate veut déterminer les usines et les dépôts qu’elle doit avoir pour optimiser son exploitation. Cinq usines et trois dépôts sont sous considération. Les capacités de production (en tonnes) des usines sont données par le tableau 1. Les coûts de production et de transport d’une tonne de conserve d’une usine vers un dépôt sont donnés par le tableau 2. Les coûts de transport d’une tonne de conserve d’un dépôt à un client donné parmi les quatre clients de l’entreprise sont donnés par le tableau 3. Le tableau 4 donne les quantités (en tonnes) requises par chacun des quatre clients. Le tableau 5 donne les coûts fixes annuels. Développer un système pour aider à prendre la meilleure décision.";

    const tableColumns1 = [
        {
            title: "Offre/Usine",
            dataIndex: "offre_usine",
            key: "offre_usine",
        },
        {
            title: "Usine 1",
            dataIndex: "usine1",
            key: "usine1",
        },
        {
            title: "Usine 2",
            dataIndex: "usine2",
            key: "usine2",
        },
        {
            title: "Usine 3",
            dataIndex: "usine3",
            key: "usine3",
        },
        {
            title: "Usine 4",
            dataIndex: "usine4",
            key: "usine4",
        },
        {
            title: "Usine 5",
            dataIndex: "usine5",
            key: "usine5",
        },
    ];

    const tableData1 = [
        {
            key: "1",
            offre_usine: "Offres",
            usine1: (
                <Form.Item name="form1-1" initialValue={300}>
                    <Input />
                </Form.Item>
            ),
            usine2: (
                <Form.Item name="form1-2" initialValue={200}>
                    <Input />
                </Form.Item>
            ),
            usine3: (
                <Form.Item name="form1-3" initialValue={300}>
                    <Input />
                </Form.Item>
            ),
            usine4: (
                <Form.Item name="form1-4" initialValue={200}>
                    <Input />
                </Form.Item>
            ),
            usine5: (
                <Form.Item name="form1-5" initialValue={400}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "2",
            offre_usine: "Cout fixe",
            usine1: (
                <Form.Item name="form-11-1" initialValue={35000}>
                    <Input />
                </Form.Item>
            ),
            usine2: (
                <Form.Item name="form-11-2" initialValue={45000}>
                    <Input />
                </Form.Item>
            ),
            usine3: (
                <Form.Item name="form-11-3" initialValue={40000}>
                    <Input />
                </Form.Item>
            ),
            usine4: (
                <Form.Item name="form-11-4" initialValue={42000}>
                    <Input />
                </Form.Item>
            ),
            usine5: (
                <Form.Item name="form-11-5" initialValue={40000}>
                    <Input />
                </Form.Item>
            ),
        },
    ];
    const tableColumns2 = [
        {
            title: "De / à",
            dataIndex: "usine",
            key: "usine",
        },
        {
            title: "Depot 1",
            dataIndex: "depot1",
            key: "depot1",
        },
        {
            title: "Depot 2",
            dataIndex: "depot2",
            key: "depot2",
        },
        {
            title: "Depot 3",
            dataIndex: "depot3",
            key: "depot3",
        },
    ];

    const tableData2 = [
        {
            key: "1",
            usine: "Usine 1",
            depot1: (
                <Form.Item name="form2-1" initialValue={800}>
                    <Input />
                </Form.Item>
            ),
            depot2: (
                <Form.Item name="form2-2" initialValue={1000}>
                    <Input />
                </Form.Item>
            ),
            depot3: (
                <Form.Item name="form2-3" initialValue={1200}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "2",
            usine: "Usine 2",
            depot1: (
                <Form.Item name="form3-1" initialValue={700}>
                    <Input />
                </Form.Item>
            ),
            depot2: (
                <Form.Item name="form3-2" initialValue={500}>
                    <Input />
                </Form.Item>
            ),
            depot3: (
                <Form.Item name="form3-3" initialValue={700}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "3",
            usine: "Usine 3",
            depot1: (
                <Form.Item name="form4-1" initialValue={800}>
                    <Input />
                </Form.Item>
            ),
            depot2: (
                <Form.Item name="form4-2" initialValue={600}>
                    <Input />
                </Form.Item>
            ),
            depot3: (
                <Form.Item name="form4-3" initialValue={500}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "4",
            usine: "Usine 4",
            depot1: (
                <Form.Item name="form5-1" initialValue={500}>
                    <Input />
                </Form.Item>
            ),
            depot2: (
                <Form.Item name="form5-2" initialValue={600}>
                    <Input />
                </Form.Item>
            ),
            depot3: (
                <Form.Item name="form5-3" initialValue={700}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "5",
            usine: "Usine 5",
            depot1: (
                <Form.Item name="form6-1" initialValue={700}>
                    <Input />
                </Form.Item>
            ),
            depot2: (
                <Form.Item name="form6-2" initialValue={600}>
                    <Input />
                </Form.Item>
            ),
            depot3: (
                <Form.Item name="form6-3" initialValue={500}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "6",
            usine: "Cout fixe",
            depot1: (
                <Form.Item name="form-12-1" initialValue={40000}>
                    <Input />
                </Form.Item>
            ),
            depot2: (
                <Form.Item name="form-12-2" initialValue={20000}>
                    <Input />
                </Form.Item>
            ),
            depot3: (
                <Form.Item name="form-12-3" initialValue={60000}>
                    <Input />
                </Form.Item>
            ),
        },
    ];
    const tableColumns3 = [
        {
            title: "De / à",
            dataIndex: "depot",
            key: "depot",
        },
        {
            title: "Client 1",
            dataIndex: "client1",
            key: "client1",
        },
        {
            title: "Client 2",
            dataIndex: "client2",
            key: "client2",
        },
        {
            title: "Client 3",
            dataIndex: "client3",
            key: "client3",
        },
        {
            title: "Client 4",
            dataIndex: "client4",
            key: "client4",
        },
    ];

    const tableData3 = [
        {
            key: "1",
            depot: "Depot 1",
            client1: (
                <Form.Item name="form7-1" initialValue={40}>
                    <Input />
                </Form.Item>
            ),
            client2: (
                <Form.Item name="form7-2" initialValue={80}>
                    <Input />
                </Form.Item>
            ),
            client3: (
                <Form.Item name="form7-3" initialValue={90}>
                    <Input />
                </Form.Item>
            ),
            client4: (
                <Form.Item name="form7-4" initialValue={50}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "2",
            depot: "Depot 2",
            client1: (
                <Form.Item name="form8-1" initialValue={70}>
                    <Input />
                </Form.Item>
            ),
            client2: (
                <Form.Item name="form8-2" initialValue={40}>
                    <Input />
                </Form.Item>
            ),
            client3: (
                <Form.Item name="form8-3" initialValue={60}>
                    <Input />
                </Form.Item>
            ),
            client4: (
                <Form.Item name="form8-4" initialValue={80}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "3",
            depot: "Depot 3",
            client1: (
                <Form.Item name="form9-1" initialValue={80}>
                    <Input />
                </Form.Item>
            ),
            client2: (
                <Form.Item name="form9-2" initialValue={30}>
                    <Input />
                </Form.Item>
            ),
            client3: (
                <Form.Item name="form9-3" initialValue={50}>
                    <Input />
                </Form.Item>
            ),
            client4: (
                <Form.Item name="form9-4" initialValue={60}>
                    <Input />
                </Form.Item>
            ),
        },
    ];
    const tableColumns4 = [
        {
            title: "Quantite / Client",
            dataIndex: "quantite",
            key: "quantite",
        },
        {
            title: "Client 1",
            dataIndex: "client1",
            key: "client1",
        },
        {
            title: "Client 2",
            dataIndex: "client2",
            key: "client2",
        },
        {
            title: "Client 3",
            dataIndex: "client3",
            key: "client3",
        },
        {
            title: "Client 4",
            dataIndex: "client4",
            key: "client4",
        },
    ];

    const tableData4 = [
        {
            key: "1",
            quantite: "Quantité requise",
            client1: (
                <Form.Item name="form-10-1" initialValue={200}>
                    <Input />
                </Form.Item>
            ),
            client2: (
                <Form.Item name="form-10-2" initialValue={300}>
                    <Input />
                </Form.Item>
            ),
            client3: (
                <Form.Item name="form-10-3" initialValue={150}>
                    <Input />
                </Form.Item>
            ),
            client4: (
                <Form.Item name="form-10-4" initialValue={250}>
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
            usine_depot: [],
            depot_client: [],
            offre_usine: [],

            quantite_client: [],
            cout_fixe: [],
        };

        const u1_dep = [];
        const u2_dep = [];
        const u3_dep = [];
        const u4_dep = [];
        const u5_dep = [];
        const dep1_client = [];
        const dep2_client = [];
        const dep3_client = [];
        const cout_usine = [];
        const cout_depot = [];

        for (const [key, value] of Object.entries(values)) {
            //todo to complete-----------------
            if (key.includes("form1")) {
                request.offre_usine.push(parseFloat(value));
            }

            if (key.includes("form2")) {
                u1_dep.push(parseFloat(value));
            }

            if (key.includes("form3")) {
                u2_dep.push(parseFloat(value));
            }

            if (key.includes("form4")) {
                u3_dep.push(parseFloat(value));
            }

            if (key.includes("form5")) {
                u4_dep.push(parseFloat(value));
            }

            if (key.includes("form6")) {
                u5_dep.push(parseFloat(value));
            }

            if (key.includes("form7")) {
                dep1_client.push(parseFloat(value));
            }

            if (key.includes("form8")) {
                dep2_client.push(parseFloat(value));
            }

            if (key.includes("form9")) {
                dep3_client.push(parseFloat(value));
            }

            if (key.includes("form-10")) {
                request.quantite_client.push(parseFloat(value));
            }

            if (key.includes("form-11")) {
                cout_usine.push(parseFloat(value));
            }

            if (key.includes("form-12")) {
                cout_depot.push(parseFloat(value));
            }
        }

        request.usine_depot.push(u1_dep);
        request.usine_depot.push(u2_dep);
        request.usine_depot.push(u3_dep);
        request.usine_depot.push(u4_dep);
        request.usine_depot.push(u5_dep);
        cout_usine.push(...cout_depot);
        request.cout_fixe.push(cout_usine);

        request.depot_client.push(dep1_client);
        request.depot_client.push(dep2_client);
        request.depot_client.push(dep3_client);

        console.log(request);

        const final_result = await PLservice(request, "pl9");

        setResult(final_result.res9);

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
                                    {Object.entries(result).map((item) => {
                                        return typeof item[1] === "object" ? (
                                            <div>
                                                {Object.values(item[1]).map(
                                                    (e) => {
                                                        // console.log(e);
                                                        return <div>{e}</div>;
                                                    }
                                                )}
                                                <br />
                                            </div>
                                        ) : (
                                            <div>
                                                <h2>{item[0]}</h2>
                                                {item[1]}
                                            </div>
                                        );
                                    })}
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

export default PL9;
