import React from "react";
import { Collapse, Table, Input, Button } from "antd";
const { Panel } = Collapse;
import "./CustomCollapse.css";

const CustomCollapse = (props) => {
    const { pl, index, pl_model } = props;

    // console.log(pl_model[0]);
    // // console.log(pl_model[0]);
    // // console.log(pl_model[1]);
    // console.log(pl_model[1]);

    //todo TABLES and VALUES -----------------------------------

    return (
        <Collapse className="collpase" defaultActiveKey={["0"]}>
            <Panel header={pl.title} key={index}>
                <p>{pl.enonce}</p>
                <div className="tabs-container">
                    {pl_model.map((tab) => (
                        <Table
                            dataSource={tab.data}
                            columns={tab.col}
                            pagination={false}
                        />
                    ))}
                </div>
                <div className="btns-container">
                    <Button>Default</Button>
                    <Button>Clear</Button>
                    <Button>Solve</Button>
                </div>
            </Panel>
        </Collapse>
    );
};

export default CustomCollapse;
