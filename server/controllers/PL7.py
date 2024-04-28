import gurobipy as gp
import numpy as np

class PL7:
    def __init__(self,costs):
        self.costs = costs
        self.num_companies = len(costs)
        self.num_projects = len(costs[0])

    def run(self):
        # Create model
        m = gp.Model('Project_Selection')

        # Create decision variables
        x = {}
        for i in range(1, 7):
            for j in range(1, 9):
                if self.costs[i-1][j-1] > 0:
                    x[i, j] = m.addVar(vtype=gp.GRB.BINARY, name=f"x_{i}_{j}")

        # Set objective function
        obj = gp.quicksum(self.costs[i-1][j-1] * x[i, j] for i in range(1, 7) 
                          for j in range(1, 9) if (i, j) in x)
        m.setObjective(obj, gp.GRB.MINIMIZE)

        # Add constraints
        for j in range(1, 9):
            m.addConstr(gp.quicksum(x[i, j] for i in range(1, 7) if (i, j) in x) == 1)

        for i in range(1, 7):
            m.addConstr(gp.quicksum(x[i, j] for j in range(1, 9) if (i, j) in x) <= 2)

        # Optimize model
        m.optimize()

        result={}

        # Print solution
        if m.status == gp.GRB.Status.OPTIMAL:
            print("Selected projects:")
            for j in range(1, 9):
                for i in range(1, 7):
                    if (i, j) in x and x[i, j].x > 0.5:
                        result["Project"+str(j)] = f"Project {j} assigned to company {i}"
                        print(f"Project {j} assigned to company {i}")
                result["Valeur objective"] =m.objVal
        else:
            result["error"]= "Aucune solution trouve."

        print(result)
        return result

# if "__main__" == __name__:
#     couts = [
#         [np.nan, 8200, 7800, 5400, np.nan, 3900, np.nan, np.nan],
#         [7800, 8200, np.nan, 6300, np.nan, 3300, 4900, np.nan],
#         [np.nan, 4800, np.nan, np.nan, np.nan, 4400, 5600, 3600],
#         [np.nan, np.nan, 8000, 5000, 6800, np.nan, 6700, 4200],
#         [7200, 6400, np.nan, 3900, 6400, 2800, np.nan, 3000],
#         [7000, 5800, 7500, 4500, 5600, np.nan, 6000, 4200]
#     ]

#     pl7 = PL7(couts)
#     print(pl7.run())
    