import React, { useState } from "react";
import { Collapse, Table, Button, Form, Input } from "antd";
import "../CustomCollapse.css";
import { PLservice } from "../../service/plservice";

const { Panel } = Collapse;

const PL8 = () => {
    const title = "PL 8 : Remplacement d’équipement";
    const enonce =
        "Cas introductif : Le plus court chemin \n Soit un voyageur qui part de la ville 1 pour atteindre la ville 10, les distances entre et les sens des déplacements son donnés par le tableau suivant. Représenter par un graphe le réseau de circulation. Développer un système de décision permettant de déterminer le chemin le plus court de 1 à 10.";

    //todo to complete-----------------

    const tableColumns1 = [
        {
            title: "Ville",
            dataIndex: "ville",
            key: "ville",
        },
        {
            title: "1",
            dataIndex: "v1",
            key: "v1",
        },
        {
            title: "2",
            dataIndex: "v2",
            key: "v2",
        },
        {
            title: "3",
            dataIndex: "v3",
            key: "v3",
        },
        {
            title: "4",
            dataIndex: "v4",
            key: "v4",
        },
        {
            title: "5",
            dataIndex: "v5",
            key: "v5",
        },
        {
            title: "6",
            dataIndex: "v6",
            key: "v6",
        },
        {
            title: "7",
            dataIndex: "v7",
            key: "v7",
        },
        {
            title: "8",
            dataIndex: "v8",
            key: "v8",
        },
        {
            title: "9",
            dataIndex: "v9",
            key: "v9",
        },
        {
            title: "10",
            dataIndex: "v10",
            key: "v10",
        },
    ];

    // <Form.Item name="form1-ble" initialValue={75}>
    //                 <Input />
    //             </Form.Item>

    //todo to complete-----------------
    const tableData1 = [
        {
            key: "1",
            ville: "1",
            v1: (
                <Form.Item name="form1-1" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v2: (
                <Form.Item name="form1-2" initialValue={70}>
                    <Input />
                </Form.Item>
            ),
            v3: (
                <Form.Item name="form1-3" initialValue={63}>
                    <Input />
                </Form.Item>
            ),
            v4: (
                <Form.Item name="form1-4" initialValue={56}>
                    <Input />
                </Form.Item>
            ),
            v5: (
                <Form.Item name="form1-5" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v6: (
                <Form.Item name="form1-6" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v7: (
                <Form.Item name="form1-7" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v8: (
                <Form.Item name="form1-8" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v9: (
                <Form.Item name="form1-9" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v10: (
                <Form.Item name="form1-10" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "2",
            ville: "2",
            v1: (
                <Form.Item name="form2-1" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v2: (
                <Form.Item name="form2-2" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v3: (
                <Form.Item name="form2-3" initialValue={25}>
                    <Input />
                </Form.Item>
            ),
            v4: (
                <Form.Item name="form2-4" initialValue={19}>
                    <Input />
                </Form.Item>
            ),
            v5: (
                <Form.Item name="form2-5" initialValue={73}>
                    <Input />
                </Form.Item>
            ),
            v6: (
                <Form.Item name="form2-6" initialValue={50}>
                    <Input />
                </Form.Item>
            ),
            v7: (
                <Form.Item name="form2-7" initialValue={79}>
                    <Input />
                </Form.Item>
            ),
            v8: (
                <Form.Item name="form2-8" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v9: (
                <Form.Item name="form2-9" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v10: (
                <Form.Item name="form2-10" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "3",
            ville: "3",
            v1: (
                <Form.Item name="form3-1" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v2: (
                <Form.Item name="form3-2" initialValue={25}>
                    <Input />
                </Form.Item>
            ),
            v3: (
                <Form.Item name="form3-3" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v4: (
                <Form.Item name="form3-4" initialValue={29}>
                    <Input />
                </Form.Item>
            ),
            v5: (
                <Form.Item name="form3-5" initialValue={69}>
                    <Input />
                </Form.Item>
            ),
            v6: (
                <Form.Item name="form3-6" initialValue={61}>
                    <Input />
                </Form.Item>
            ),
            v7: (
                <Form.Item name="form3-7" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v8: (
                <Form.Item name="form3-8" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v9: (
                <Form.Item name="form3-9" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v10: (
                <Form.Item name="form3-10" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "4",
            ville: "4",
            v1: (
                <Form.Item name="form4-1" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v2: (
                <Form.Item name="form4-2" initialValue={19}>
                    <Input />
                </Form.Item>
            ),
            v3: (
                <Form.Item name="form4-3" initialValue={29}>
                    <Input />
                </Form.Item>
            ),
            v4: (
                <Form.Item name="form4-4" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v5: (
                <Form.Item name="form4-5" initialValue={67}>
                    <Input />
                </Form.Item>
            ),
            v6: (
                <Form.Item name="form4-6" initialValue={45}>
                    <Input />
                </Form.Item>
            ),
            v7: (
                <Form.Item name="form4-7" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v8: (
                <Form.Item name="form4-8" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v9: (
                <Form.Item name="form4-9" initialValue={85}>
                    <Input />
                </Form.Item>
            ),
            v10: (
                <Form.Item name="form4-10" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "5",
            ville: "5",
            v1: (
                <Form.Item name="form5-1" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v2: (
                <Form.Item name="form5-2" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v3: (
                <Form.Item name="form5-3" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v4: (
                <Form.Item name="form5-4" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v5: (
                <Form.Item name="form5-5" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v6: (
                <Form.Item name="form5-6" initialValue={18}>
                    <Input />
                </Form.Item>
            ),
            v7: (
                <Form.Item name="form5-7" initialValue={67}>
                    <Input />
                </Form.Item>
            ),
            v8: (
                <Form.Item name="form5-8" initialValue={69}>
                    <Input />
                </Form.Item>
            ),
            v9: (
                <Form.Item name="form5-9" initialValue={54}>
                    <Input />
                </Form.Item>
            ),
            v10: (
                <Form.Item name="form5-10" initialValue={87}>
                    <Input />
                </Form.Item>
            ),
        },

        {
            key: "6",
            ville: "6",
            v1: (
                <Form.Item name="form6-1" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v2: (
                <Form.Item name="form6-2" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v3: (
                <Form.Item name="form6-3" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v4: (
                <Form.Item name="form6-4" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v5: (
                <Form.Item name="form6-5" initialValue={18}>
                    <Input />
                </Form.Item>
            ),
            v6: (
                <Form.Item name="form6-6" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v7: (
                <Form.Item name="form6-7" initialValue={72}>
                    <Input />
                </Form.Item>
            ),
            v8: (
                <Form.Item name="form6-8" initialValue={52}>
                    <Input />
                </Form.Item>
            ),
            v9: (
                <Form.Item name="form6-9" initialValue={51}>
                    <Input />
                </Form.Item>
            ),
            v10: (
                <Form.Item name="form6-10" initialValue={97}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "7",
            ville: "7",
            v1: (
                <Form.Item name="form7-1" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v2: (
                <Form.Item name="form7-2" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v3: (
                <Form.Item name="form7-3" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v4: (
                <Form.Item name="form7-4" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v5: (
                <Form.Item name="form7-5" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v6: (
                <Form.Item name="form7-6" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v7: (
                <Form.Item name="form7-7" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v8: (
                <Form.Item name="form7-8" initialValue={17}>
                    <Input />
                </Form.Item>
            ),
            v9: (
                <Form.Item name="form7-9" initialValue={31}>
                    <Input />
                </Form.Item>
            ),
            v10: (
                <Form.Item name="form7-10" initialValue={72}>
                    <Input />
                </Form.Item>
            ),
        },

        {
            key: "8",
            ville: "8",
            v1: (
                <Form.Item name="form8-1" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v2: (
                <Form.Item name="form8-2" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v3: (
                <Form.Item name="form8-3" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v4: (
                <Form.Item name="form8-4" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v5: (
                <Form.Item name="form8-5" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v6: (
                <Form.Item name="form8-6" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v7: (
                <Form.Item name="form8-7" initialValue={17}>
                    <Input />
                </Form.Item>
            ),
            v8: (
                <Form.Item name="form8-8" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v9: (
                <Form.Item name="form8-9" initialValue={15}>
                    <Input />
                </Form.Item>
            ),
            v10: (
                <Form.Item name="form8-10" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
        },

        {
            key: "9",
            ville: "9",
            v1: (
                <Form.Item name="form9-1" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v2: (
                <Form.Item name="form9-2" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v3: (
                <Form.Item name="form9-3" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v4: (
                <Form.Item name="form9-4" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v5: (
                <Form.Item name="form9-5" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v6: (
                <Form.Item name="form9-6" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v7: (
                <Form.Item name="form9-7" initialValue={31}>
                    <Input />
                </Form.Item>
            ),
            v8: (
                <Form.Item name="form9-8" initialValue={15}>
                    <Input />
                </Form.Item>
            ),
            v9: (
                <Form.Item name="form9-9" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v10: (
                <Form.Item name="form9-10" initialValue={69}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "10",
            ville: "10",
            v1: (
                <Form.Item name="form-10-1" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v2: (
                <Form.Item name="form-10-2" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v3: (
                <Form.Item name="form-10-3" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v4: (
                <Form.Item name="form-10-4" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v5: (
                <Form.Item name="form-10-5" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v6: (
                <Form.Item name="form-10-6" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v7: (
                <Form.Item name="form-10-7" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v8: (
                <Form.Item name="form-10-8" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v9: (
                <Form.Item name="form-10-9" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            v10: (
                <Form.Item name="form-10-10" initialValue={0}>
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
    ];

    const onFinish = async (values) => {
        const request = {
            path: [],
        };

        const v1 = [];
        const v2 = [];
        const v3 = [];
        const v4 = [];
        const v5 = [];
        const v6 = [];
        const v7 = [];
        const v8 = [];
        const v9 = [];
        const v10 = [];

        for (const [key, value] of Object.entries(values)) {
            if (key.includes("form1")) {
                v1.push(parseFloat(value));
            }

            if (key.includes("form2")) {
                v2.push(parseFloat(value));
            }
            if (key.includes("form3")) {
                v3.push(parseFloat(value));
            }

            if (key.includes("form4")) {
                v4.push(parseFloat(value));
            }
            if (key.includes("form5")) {
                v5.push(parseFloat(value));
            }

            if (key.includes("form6")) {
                v6.push(parseFloat(value));
            }
            if (key.includes("form7")) {
                v7.push(parseFloat(value));
            }

            if (key.includes("form8")) {
                v8.push(parseFloat(value));
            }
            if (key.includes("form9")) {
                v9.push(parseFloat(value));
            }

            if (key.includes("form-10")) {
                v10.push(parseFloat(value));
            }
        }

        request.path.push(v1);
        request.path.push(v2);
        request.path.push(v3);
        request.path.push(v4);
        request.path.push(v5);
        request.path.push(v6);
        request.path.push(v7);
        request.path.push(v8);
        request.path.push(v9);
        request.path.push(v10);

        const final_result = await PLservice(request, "pl8");
        setResult(final_result.res8);

        console.log(final_result);
    };

    const [result, setResult] = useState(null);

    return (
        <Collapse className="collpase">
            <Panel header={title}>
                <p>{enonce}</p>
                <br />
                <h2 className="warning">
                    Veuillez donner des valeurs positives
                </h2>
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
                                    <h2>Solution optimale</h2>
                                    <div>{result[0]}</div>
                                    <div>{result[1]}</div>
                                    <div>{result[2]}</div>
                                    <br />

                                    <h2>Meilleur chemin</h2>
                                    <div>{result["Meilleur chemin"]}</div>
                                    <br />

                                    <h2>Coût total</h2>
                                    <div>{result["Coût total"]}</div>
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

export default PL8;
