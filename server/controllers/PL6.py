# import gurobipy as gp
# import numpy as np
# from gurobipy import GRB

# class PL6:
#     def solve_shortest_path(nodes, arcs, durations, start_node, end_node):
#        model = gp.Model('shortest_path')
   
#        # Decision variables
#        x = {}
#        for arc in arcs:
#            x[arc] = model.addVar(vtype=GRB.BINARY, name=f'x_{arc}')
   
#        # Objective function
#        model.setObjective(sum(x[arc] * durations[arc] for arc in arcs), GRB.MINIMIZE)
   
#        # Constraints
#        for node in nodes:
#            if node == start_node:
#                model.addConstr(sum(x[arc] for arc in arcs if arc[0] == node) - sum(x[arc] for arc in arcs if arc[1] == node) == 1)
#            elif node == end_node:
#                model.addConstr(sum(x[arc] for arc in arcs if arc[0] == node) - sum(x[arc] for arc in arcs if arc[1] == node) == -1)
#            else:
#                model.addConstr(sum(x[arc] for arc in arcs if arc[0] == node) - sum(x[arc] for arc in arcs if arc[1] == node) == 0)
   
#        model.optimize()
   
#        if model.status == GRB.OPTIMAL:
#            path = [arc for arc in arcs if x[arc].x > 0.5]
#            return path
#        else:
#            return None
   
#     # User input for network structure and durations
#     nodes = ['A', 'B', 'C', 'D', 'E', 'F' , 'G'] 
#     arcs = [('A', 'B'), ('A', 'C'), ('C', 'B'), ('B', 'D'), ('C', 'F'), ('C', 'E'), ('D', 'E'), ('B', 'E'), ('D', 'G'), ('E', 'G'), ('F', 'E')] 
#     durations = {('A', 'B'): 4, ('A', 'C'): 3, ('C', 'B'): 3, ('B', 'D'): 6, ('C', 'E'): 4, ('D', 'E'): 2, ('C', 'F'): 6,  ('B', 'E'): 5, ('D', 'G'): 1, ('E', 'G'): 3 ,('F', 'E'): 6}  
    
#     # User input for start and end nodes
#     start_node = 'A'  
#     end_node = 'G'    
    
    
#     result = solve_shortest_path(nodes, arcs, durations, start_node, end_node)
#     if result:
#         print(f"The shortest path from {start_node} to {end_node} is: {result}")
#         total_duration = sum(durations[arc] for arc in result)
#         print(f"Total duration: {total_duration}")
#     else:
#         print("No feasible solution found.")

import gurobipy as gp
from gurobipy import GRB

class NetworkOptimization:
    def __init__(self, links, times):
        self.links = links  # list of tuples (source, target)
        self.times = times  # dictionary with key as tuple (source, target) and value as traversal time
        self.nodes = set([node for link in links for node in link])  # Extract nodes from links

    def run(self):
        model = gp.Model("NetworkOptimization")

        # Create variables for each link in the network
        use_link = model.addVars(self.links, vtype=GRB.BINARY, name="use_link")

        # Set the objective to minimize the total traversal time
        try:
            model.setObjective(gp.quicksum(use_link[link] * self.times[link] for link in self.links), GRB.MINIMIZE)
        except KeyError as e:
            print(f"Error: Missing time data for link {e}. Please check the 'times' dictionary.")
            return None  # Return None to indicate an error in setting up the objective

        # Add constraints to ensure the conservation of flow
        for node in self.nodes:
            if node == 'A':  # Assuming 'A' is the source
                model.addConstr(sum(use_link[(node, other)] for other in self.nodes if (node, other) in self.links) == 1, f"outflow_{node}")
            elif node == 'G':  # Assuming 'G' is the sink
                model.addConstr(sum(use_link[(other, node)] for other in self.nodes if (other, node) in self.links) == 1, f"inflow_{node}")
            else:
                # Ensure that the inflow equals outflow for each node except for the source and sink
                model.addConstr(sum(use_link[(other, node)] for other in self.nodes if (other, node) in self.links) ==
                                sum(use_link[(node, other)] for other in self.nodes if (node, other) in self.links), f"flow_conservation_{node}")

        # Optimize the model
        model.optimize()

        # Check if the model has been solved to optimality
        if model.status == GRB.OPTIMAL:
            print('Optimal path found with total time:', model.objVal)
            path = [link for link in self.links if use_link[link].X > 0.5]
            return path
        else:
            print('No optimal path found or there was an issue solving the model.')
            return None

        return None  # Return None by default if no conditions above are met
