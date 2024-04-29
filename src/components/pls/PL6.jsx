import React, { useState } from "react";
import { Collapse, Button, Form, Input, Alert } from "antd";
import "../CustomCollapse.css";
import { PLservice } from "../../service/plservice";
import network_prob from "../../assets/network_prob.png";

const { Panel } = Collapse;
const { Item } = Form;

const PL6 = () => {
    const title = "PL 6 : Problème de réseau";
    const enonce =
        `La figure ci-dessous représente un réseau IP où on considère un seul sens de transmission indiqué par les flèches.
        Le nombre figurant sur chaque lien indique la durée nécessaire (en secondes) pour transférer un paquet IP en
        empruntant ce lien.`;
        
    const [form] = Form.useForm();
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null); // State to store error messages

    const initialFormValues = {
        "link-0-source": "A",
        "link-0-target": "B",
        "link-0-time": "4",
        "link-1-source": "A",
        "link-1-target": "C",
        "link-1-time": "3",
        "link-2-source": "B",
        "link-2-target": "D",
        "link-2-time": "6",
        "link-3-source": "C",
        "link-3-target": "B",
        "link-3-time": "3",
        "link-4-source": "C",
        "link-4-target": "F",
        "link-4-time": "6",
        "link-5-source": "C",
        "link-5-target": "E",
        "link-5-time": "4",
        "link-6-source": "D",
        "link-6-target": "E",
        "link-6-time": "2",
        "link-7-source": "D",
        "link-7-target": "G",
        "link-7-time": "1",
        "link-8-source": "E",
        "link-8-target": "G",
        "link-8-time": "3",
        "link-9-source": "B",
        "link-9-target": "E",
        "link-9-time": "5",
        "link-10-source": "F",
        "link-10-target": "E",
        "link-10-time": "6"
    };
    
    
    // const onFinish = async (values) => {
    //     const networkData = {
    //         links: [],
    //         times: {}
    //     };
        

    //     Object.keys(values).forEach(key => {
    //         const [, index, field] = key.split('-');
    //         const linkIndex = parseInt(index, 10);

    //         if (!networkData.links[linkIndex]) {
    //             networkData.links[linkIndex] = {source: '', target: '', time: 0};
    //         }

    //         if (field === 'source' || field === 'target') {
    //             networkData.links[linkIndex][field] = values[key];
    //         } else if (field === 'time') {
    //             const timeValue = parseInt(values[key], 10);
    //             networkData.links[linkIndex]['time'] = timeValue;
    //             const { source, target } = networkData.links[linkIndex];
    //             networkData.times[`${source}-${target}`] = timeValue;
    //         }
    //     });

    //     try {
    //         const final_result = await PLservice({ links: networkData.links }, "/pl2");
    //         if (final_result.shortest_path) {
    //             setResult(final_result.shortest_path);
    //             setError(null);
    //         } else {
    //             setError("No optimal path found.");
    //             setResult(null);
    //         }
    //     } catch (error) {
    //         setError("An error occurred while fetching data.");
    //         setResult(null);
    //         console.error("Error fetching network data:", error);
    //     }
    // };

    const onFinish = async (values) => {
        console.log("values", values);
        const links = Object.keys(values).reduce((acc, key) => {
            const [, index, field] = key.split('-');
            console.log("index", index, " field", field);
            if (!acc[index]) {
                acc[index] = { source: '', target: '', time: 0 };
            }
            if (field === 'source' || field === 'target') {
                acc[index][field] = values[key];
            } else if (field === 'time') {
                acc[index][field] = parseInt(values[key], 10);
            }
            return acc;
        }, []);
    
        try {
            const final_result = await PLservice({ links }, "/pl6");
            if (final_result.shortest_path) {
                setResult(final_result.shortest_path);
                setError(null);
            } else {
                setError("No optimal path found.");
                setResult(null);
            }
        } catch (error) {
            setError("An error occurred while fetching data.");
            setResult(null);
            console.error("Error fetching network data:", error);
        }
    };
    
    return (
        <Collapse className="collapse">
            <Panel header={title}>
                <p>{enonce}</p>
                <img src={network_prob} alt="network" 
                    style={{ width: "100%", maxWidth: "800px", margin: "auto", display: "block", 
                    marginBottom: "20px", marginTop: "20px"
                }}
                />
                <Form
    form={form}
    onFinish={onFinish}
    autoComplete="off"
    initialValues={initialFormValues} // Add this line
>
    {Object.keys(initialFormValues).map((key, index) => {
        const [, field] = key.split('-');
        return (
            <Item key={key} name={key} label={`Link ${index + 1} ${field}`}>
                <Input />
            </Item>
        );
    })}

    <div className="btns-container">
        <Button type="primary" htmlType="submit">Find Shortest Path</Button>
        <Button htmlType="button" onClick={() => form.resetFields()}>Reset</Button>
    </div>

    {error && <Alert message={error} type="error" showIcon />}
    {result && (
        <div className="solution">
            <h2>Shortest Path</h2>
            {result.map((link, index) => <div key={index}>{link.join(" -> ")}</div>)}
        </div>
    )}
</Form>

            </Panel>
        </Collapse>
    );
};

export default PL6;
