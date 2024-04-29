import React, { useState } from "react";
import { Collapse, Table, Button, Form, Input, InputNumber, Space } from "antd";
import "../CustomCollapse.css";
import { PLservice } from "../../service/plservice";

const { Panel } = Collapse;

const PL4 = () => {
    const title = "PL 4 : Choix d’implantation d’agences bancaires";
    const enonce =
        `Disposant d’un budget B, une banque cherche à déterminer la localisation optimale de nouvelles agences et de
        nouveaux serveurs DAB, qu’elle compte ouvrir en janvier 2006. L’Investissement est de K milliers de dinars pour
        une agence, pour un serveur DAB le coût est de D milliers de dinars. Neuf régions sont sous considération. Dans
        chaque région, on aura au maximum une agence. En ayant une agence dans la région Ri, on aura un nombre de
        clients égal à a% de population de la région Ri et b% de celles des régions voisines. Un serveur DAB dans une
        zone Ri donnera un nombre de clients égal à c% de la population de la région Ri. La matrice A= (aij) i=1,...,9 et
        j=1,...,9 donne pour chaque région, les régions voisines (1 si régions voisines, 0 sinon).`;
        const [form] = Form.useForm();
  const [result, setResult] = useState(null);

  const initialValues = {
    budget: 20000000,
    cost_per_branch: 50000,
    branch_attractiveness: 5,
    branch_attractiveness_neighbors: 2,
  };

  const populations = [
    { key: 'R1', population: 2 },
    { key: 'R2', population: 3 },
    { key: 'R3', population: 4 },
    { key: 'R4', population: 5 },
    { key: 'R5', population: 6 },
    { key: 'R6', population: 7 },
    { key: 'R7', population: 8 },
    { key: 'R8', population: 9 },
    { key: 'R9', population: 10 },
  ];
  
  const adjacencyMatrix = [
    { key: 'R1', R1: 1, R2: 1, R3: 0, R4: 0, R5: 0, R6: 0, R7: 0, R8: 0, R9: 0 },
    { key: 'R2', R1: 1, R2: 1, R3: 1, R4: 0, R5: 0, R6: 0, R7: 0, R8: 0, R9: 0 },
    { key: 'R3', R1: 0, R2: 1, R3: 1, R4: 1, R5: 0, R6: 0, R7: 0, R8: 0, R9: 0 },
    { key: 'R4', R1: 0, R2: 0, R3: 1, R4: 1, R5: 1, R6: 0, R7: 0, R8: 0, R9: 0 },
    { key: 'R5', R1: 0, R2: 0, R3: 0, R4: 1, R5: 1, R6: 1, R7: 0, R8: 0, R9: 0 },
    { key: 'R6', R1: 0, R2: 0, R3: 0, R4: 0, R5: 1, R6: 1, R7: 1, R8: 0, R9: 0 },
    { key: 'R7', R1: 0, R2: 0, R3: 0, R4: 0, R5: 0, R6: 1, R7: 1, R8: 1, R9: 0 },
    { key: 'R8', R1: 0, R2: 0, R3: 0, R4: 0, R5: 0, R6: 0, R7: 1, R8: 1, R9: 1 },
    { key: 'R9', R1: 0, R2: 0, R3: 0, R4: 0, R5: 0, R6: 0, R7: 0, R8: 1, R9: 1 },
  ];
  

  // Table columns for populations
  const populationColumns = [
    { title: 'Régions', dataIndex: 'key', key: 'key' },
    { title: 'Population (en millions d’habitants)', dataIndex: 'population', key: 'population' },
  ];

  // Dynamically generate columns for adjacency matrix based on regions
  const adjacencyColumns = [
    { title: 'Régions', dataIndex: 'key', key: 'key' },
    // Generate a column for each region
    ...populations.map(region => ({
      title: region.key,
      dataIndex: region.key,
      key: region.key,
    })),
  ];

  // Handle form submission
  const onFinish = async (values) => {
    console.log("Form values:", values);
  
    // Construct the payload from form values
    const payload = {
      budget: values.budget,
      cost_per_branch: values.cost_per_branch,
      branch_attractiveness: values.branch_attractiveness,
      branch_attractiveness_neighbors: values.branch_attractiveness_neighbors,
      // Assuming populations and adjacency matrix are not changed by the user and taken from initial data
      populations: populations.map(p => p.population),
      adjacency_matrix: adjacencyMatrix.map(row => populations.map(region => row[region.key])),
    };
  
    console.log("Payload to send:", payload);
  
    try {
      // Replace 'PLservice' with your actual service call method, for example using 'axios'
      const response = await PLservice(payload, "/pl4");
      const final_result = response.data;
  
      // Process the final result
      if (final_result.optimal_locations) {
        setResult(final_result.optimal_locations);
        // Assuming setError is a state setter for any error messages
        // setError(null); // Uncomment if you have such a state
      } else {
        // setError("No optimal path found."); // Uncomment if you have such a state
        console.error("No optimal path found.");
        setResult(null);
      }
    } catch (error) {
      // setError("An error occurred while fetching data."); // Uncomment if you have such a state
      console.error("Error fetching data:", error);
      setResult(null);
    }
  };
  

  return (
    <Collapse className="collapse">
        <Panel header={title}>
            <p>{enonce}</p>

            <Form form={form} onFinish={onFinish} layout="vertical" autoComplete="off"
        initialValues={initialValues}>
            
        {/* Form items for budget, cost per branch, etc. */}
        {/* ... */}
        <Table dataSource={populations} columns={populationColumns} pagination={false} />
        <Table dataSource={adjacencyMatrix} columns={adjacencyColumns} pagination={false} />

        <Form.Item
            name="budget"
            label="Budget (in dinars)"
            rules={[{ required: true, message: 'Please input the budget!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="cost_per_branch"
            label="Cost per Branch (in dinars)"
            rules={[{ required: true, message: 'Please input the cost per branch!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="branch_attractiveness"
            label="Branch Attractiveness (a)"
            rules={[{ required: true, message: 'Please input the branch attractiveness!' }]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="branch_attractiveness_neighbors"
            label="Attractiveness to Neighbors (b)"
            rules={[{ required: true, message: 'Please input the attractiveness to neighbors!' }]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Optimize Locations
          </Button>
          <Button onClick={() => form.resetFields()}>
            Reset
          </Button>
        </Space>
      </Form>

      {result && (
        <div>
          <h2>Optimal Locations:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
        </Panel>
    </Collapse>
  );
};
export default PL4;
