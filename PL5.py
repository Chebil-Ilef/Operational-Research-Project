import gurobipy as gp
from gurobipy import GRB

def solve_shortest_path(nodes, arcs, durations, start_node, end_node):
    model = gp.Model('shortest_path')

    # Decision variables
    x = {}
    for arc in arcs:
        x[arc] = model.addVar(vtype=GRB.BINARY, name=f'x_{arc}')

    # Objective function
    model.setObjective(sum(x[arc] * durations[arc] for arc in arcs), GRB.MINIMIZE)

    # Constraints
    for node in nodes:
        if node == start_node:
            model.addConstr(sum(x[arc] for arc in arcs if arc[0] == node) - sum(x[arc] for arc in arcs if arc[1] == node) == 1)
        elif node == end_node:
            model.addConstr(sum(x[arc] for arc in arcs if arc[0] == node) - sum(x[arc] for arc in arcs if arc[1] == node) == -1)
        else:
            model.addConstr(sum(x[arc] for arc in arcs if arc[0] == node) - sum(x[arc] for arc in arcs if arc[1] == node) == 0)

    model.optimize()

    if model.status == GRB.OPTIMAL:
        path = [arc for arc in arcs if x[arc].x > 0.5]
        return path
    else:
        return None

# User input for network structure and durations
nodes = ['A', 'B', 'C', 'D', 'E', 'F' , 'G'] 
arcs = [('A', 'B'), ('A', 'C'), ('C', 'B'), ('B', 'D'), ('C', 'F'), ('C', 'E'), ('D', 'E'), ('B', 'E'), ('D', 'G'), ('E', 'G'), ('F', 'E')] 
durations = {('A', 'B'): 4, ('A', 'C'): 3, ('C', 'B'): 3, ('B', 'D'): 6, ('C', 'E'): 4, ('D', 'E'): 2, ('C', 'F'): 6,  ('B', 'E'): 5, ('D', 'G'): 1, ('E', 'G'): 3 ,('F', 'E'): 6}  

# User input for start and end nodes
start_node = 'A'  
end_node = 'G'    


result = solve_shortest_path(nodes, arcs, durations, start_node, end_node)
if result:
    print(f"The shortest path from {start_node} to {end_node} is: {result}")
    total_duration = sum(durations[arc] for arc in result)
    print(f"Total duration: {total_duration}")
else:
    print("No feasible solution found.")