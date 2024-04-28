import React, {useState} from "react";
import { Collapse, Table, Button, Form, Input } from "antd";
import "../CustomCollapse.css";
import { PLservice } from "../../service/plservice";

const { Panel } = Collapse;

const PL3 = () => {
    const title = "PL 3 : Planification des besoins en ressources humaines";
    const enonce =
        "Un bureau de poste a des besoins en personnel lors des sept jours de la semaine, donnés par le tableau suivant :Jour Lundi Mardi Mercredi Jeudi Vendredi Samedi Dimanche Minimun requis 17 13 15 19 14 16 11.Déterminer la planification permettant de satisfaire les besoins du bureau en recourant au minimun d’employés tout en sachant que chaque employé doit travailler pendant cinq jours consécutifs avant de prendre deux jours de congé.";

    const tables = [
        {
            col: [
                {
                    title: "Jour",
                    dataIndex: "jour",
                    key: "jour",
                },
                {
                    title: "Lundi",
                    dataIndex: "lundi",
                    key: "lundi",
                },
                {
                    title: "Mardi",
                    dataIndex: "mardi",
                    key: "mardi",
                },
                {
                    title: "Mercredi",
                    dataIndex: "mercredi",
                    key: "mercredi",
                },
                {
                    title: "Jeudi",
                    dataIndex: "jeudi",
                    key: "jeudi",
                },
                {
                    title: "Vendredi",
                    dataIndex: "vendredi",
                    key: "vendredi",
                },
                {
                    title: "Samedi",
                    dataIndex: "samedi",
                    key: "samedi",
                },
                {
                    title: "Dimanche",
                    dataIndex: "dimanche",
                    key: "dimanche",
                },
            ],
            data: [
                {
                    key: "1",
                    jour: "Minimum requis",
                    lundi: (
                        <Form.Item name="form1-lun" initialValue={17}>
                            <Input type="number" />
                        </Form.Item>
                    ), //17
                    mardi: (
                        <Form.Item name="form1-mar" initialValue={13}>
                            <Input type="number" />
                        </Form.Item>
                    ), //13
                    mercredi: (
                        <Form.Item name="form1-mer" initialValue={15}>
                            <Input type="number" />
                        </Form.Item>
                    ), //15
                    jeudi: (
                        <Form.Item name="form1-jeu" initialValue={19}>
                            <Input type="number" />
                        </Form.Item>
                    ), //50,
                    vendredi: (
                        <Form.Item name="form1-ven" initialValue={14}>
                            <Input type="number" />
                        </Form.Item>
                    ), //60,
                    samedi: (
                        <Form.Item name="form1-sam" initialValue={16}>
                            <Input type="number" />
                        </Form.Item>
                    ),
                    dimanche: (
                        <Form.Item name="form1-dim" initialValue={11}>
                            <Input type="number" />
                        </Form.Item>
                    ),
                },
            ],
        },
    ];

    const onFinish = async (values) => {
        const request = {
            min_jours: [],
        };

        for (const [key, value] of Object.entries(values)) {
            if (key.includes("form1")) {
                request.min_jours.push(parseInt(value));
            }
        }

        console.log(request);

        const final_result = await PLservice(request, "pl3");
        setResult(final_result.res3);

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
                        {
                            //! ERROR -----------------------------
                        }
                        <Table
                            dataSource={tables[0].data}
                            columns={tables[0].col}
                            pagination={false}
                        />
                        {
                            //! -----------------------------------
                        }

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
                                                <div key={index}>{item}</div>
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

export default PL3;
