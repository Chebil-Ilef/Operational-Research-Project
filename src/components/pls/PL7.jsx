import React, { useState } from "react";
import { Collapse, Table, Button, Form, Input } from "antd";
import "../CustomCollapse.css";
import { PLservice } from "../../service/plservice";

const { Panel } = Collapse;

const PL7 = () => {
    const title = "PL 7 : Affectation optimale de ressources";
    const enonce =
        "Une Société a lancé un appel d’offre pour huit projets. Six entreprises ont répondu par des offres conformément au tableau suivant. On veut déterminer l’affectation optimale permettant de réalisé les huit projets à un coût minimun tout en considérant que  1. Toute entreprise sans offre pour un projet ne peut être sélectionné pour ce projet. \n 2. Exactement une entreprise pour un projet. \n 3. Une entreprise ne peut réalisé plus de deux projets.";

    //todo to complete-----------------

    const tableColumns1 = [
        {
            title: "Entreprise",
            dataIndex: "entreprise",
            key: "entreprise",
        },
        {
            title: "Projet 1",
            dataIndex: "p1",
            key: "p2",
        },
        {
            title: "Projet 2",
            dataIndex: "p2",
            key: "p3",
        },
        {
            title: "Projet 3",
            dataIndex: "p3",
            key: "p3",
        },
        {
            title: "Projet 4",
            dataIndex: "p4",
            key: "p4",
        },
        {
            title: "Projet 5",
            dataIndex: "p5",
            key: "p5",
        },
        {
            title: "Projet 6",
            dataIndex: "p6",
            key: "p7",
        },
        {
            title: "Projet 7",
            dataIndex: "p7",
            key: "p7",
        },
        {
            title: "Projet 8",
            dataIndex: "p8",
            key: "p8",
        },
    ];

    const tableData1 = [
        {
            key: "1",
            entreprise: "1",
            p1: (
                <Form.Item name="form1-1" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            p2: (
                <Form.Item name="form1-2" initialValue={8200}>
                    <Input />
                </Form.Item>
            ),
            p3: (
                <Form.Item name="form1-3" initialValue={7800}>
                    <Input />
                </Form.Item>
            ),
            p4: (
                <Form.Item name="form1-4" initialValue={5400}>
                    <Input />
                </Form.Item>
            ),
            p5: (
                <Form.Item name="form1-5" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            p6: (
                <Form.Item name="form1-6" initialValue={3900}>
                    <Input />
                </Form.Item>
            ),
            p7: (
                <Form.Item name="form1-7" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            p8: (
                <Form.Item name="form1-8" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "2",
            entreprise: "2",
            p1: (
                <Form.Item name="form2-1" initialValue={7800}>
                    <Input />
                </Form.Item>
            ),
            p2: (
                <Form.Item name="form2-2" initialValue={8200}>
                    <Input />
                </Form.Item>
            ),
            p3: (
                <Form.Item name="form2-3" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            p4: (
                <Form.Item name="form2-4" initialValue={6300}>
                    <Input />
                </Form.Item>
            ),
            p5: (
                <Form.Item name="form2-5" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            p6: (
                <Form.Item name="form2-6" initialValue={3300}>
                    <Input />
                </Form.Item>
            ),
            p7: (
                <Form.Item name="form2-7" initialValue={4900}>
                    <Input />
                </Form.Item>
            ),
            p8: (
                <Form.Item name="form2-8" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "3",
            entreprise: "3",
            p1: (
                <Form.Item name="form3-1" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            p2: (
                <Form.Item name="form3-2" initialValue={4800}>
                    <Input />
                </Form.Item>
            ),
            p3: (
                <Form.Item name="form3-3" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            p4: (
                <Form.Item name="form3-4" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            p5: (
                <Form.Item name="form3-5" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            p6: (
                <Form.Item name="form3-6" initialValue={4400}>
                    <Input />
                </Form.Item>
            ),
            p7: (
                <Form.Item name="form3-7" initialValue={5600}>
                    <Input />
                </Form.Item>
            ),
            p8: (
                <Form.Item name="form3-8" initialValue={3600}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "4",
            entreprise: "4",
            p1: (
                <Form.Item name="form4-1" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            p2: (
                <Form.Item name="form4-2" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            p3: (
                <Form.Item name="form4-3" initialValue={8000}>
                    <Input />
                </Form.Item>
            ),
            p4: (
                <Form.Item name="form4-4" initialValue={5000}>
                    <Input />
                </Form.Item>
            ),
            p5: (
                <Form.Item name="form4-5" initialValue={6800}>
                    <Input />
                </Form.Item>
            ),
            p6: (
                <Form.Item name="form4-6" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            p7: (
                <Form.Item name="form4-7" initialValue={6700}>
                    <Input />
                </Form.Item>
            ),
            p8: (
                <Form.Item name="form4-8" initialValue={4200}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "5",
            entreprise: "5",
            p1: (
                <Form.Item name="form5-1" initialValue={7200}>
                    <Input />
                </Form.Item>
            ),
            p2: (
                <Form.Item name="form5-2" initialValue={6400}>
                    <Input />
                </Form.Item>
            ),
            p3: (
                <Form.Item name="form5-3" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            p4: (
                <Form.Item name="form5-4" initialValue={3900}>
                    <Input />
                </Form.Item>
            ),
            p5: (
                <Form.Item name="form5-5" initialValue={6400}>
                    <Input />
                </Form.Item>
            ),
            p6: (
                <Form.Item name="form5-6" initialValue={2800}>
                    <Input />
                </Form.Item>
            ),
            p7: (
                <Form.Item name="form5-7" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            p8: (
                <Form.Item name="form5-8" initialValue={3000}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            key: "6",
            entreprise: "6",
            p1: (
                <Form.Item name="form6-1" initialValue={7000}>
                    <Input />
                </Form.Item>
            ),
            p2: (
                <Form.Item name="form6-2" initialValue={5800}>
                    <Input />
                </Form.Item>
            ),
            p3: (
                <Form.Item name="form6-3" initialValue={7500}>
                    <Input />
                </Form.Item>
            ),
            p4: (
                <Form.Item name="form6-4" initialValue={4500}>
                    <Input />
                </Form.Item>
            ),
            p5: (
                <Form.Item name="form6-5" initialValue={5600}>
                    <Input />
                </Form.Item>
            ),
            p6: (
                <Form.Item name="form6-6" initialValue={0}>
                    <Input />
                </Form.Item>
            ),
            p7: (
                <Form.Item name="form6-7" initialValue={6000}>
                    <Input />
                </Form.Item>
            ),
            p8: (
                <Form.Item name="form6-8" initialValue={4200}>
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
            C: [],
        };

        const e1 = [];
        const e2 = [];
        const e3 = [];
        const e4 = [];
        const e5 = [];
        const e6 = [];

        for (const [key, value] of Object.entries(values)) {
            if (key.includes("form1")) {
                e1.push(parseFloat(value));
            }

            if (key.includes("form2")) {
                e2.push(parseFloat(value));
            }
            if (key.includes("form3")) {
                e3.push(parseFloat(value));
            }

            if (key.includes("form4")) {
                e4.push(parseFloat(value));
            }
            if (key.includes("form5")) {
                e5.push(parseFloat(value));
            }

            if (key.includes("form6")) {
                e6.push(parseFloat(value));
            }
        }

        request.C.push(e1);
        request.C.push(e2);
        request.C.push(e3);
        request.C.push(e4);
        request.C.push(e5);
        request.C.push(e6);

        // console.log(request.C);

        // console.log(request);

        const final_result = await PLservice(request, "pl7");
        setResult(final_result.res7);

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
                                    {Object.entries(result).map(
                                        (item, index) => {
                                            return (
                                                <div key={index}>
                                                    {item[0] !=
                                                    "Valeur objective" ? (
                                                        <div>{item[1]}</div>
                                                    ) : (
                                                        <div>
                                                            <br />
                                                            <h2>{item[0]}</h2>
                                                            {item[1]}
                                                        </div>
                                                    )}
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

export default PL7;
