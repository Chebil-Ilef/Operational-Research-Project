import gurobipy as gp
from gurobipy import GRB

class BankBranchOptimization:
    def __init__(self, budget, cost_per_branch, population, adjacency_matrix, branch_attractiveness, branch_attractiveness_neighbors):
        self.budget = budget
        self.cost_per_branch = cost_per_branch
        self.population = population
        self.adjacency_matrix = adjacency_matrix
        self.branch_attractiveness = branch_attractiveness
        self.branch_attractiveness_neighbors = branch_attractiveness_neighbors
        self.model = gp.Model('BankBranchOptimization')

    def setup_model(self):
        regions = range(len(self.population))

        # Binary variables for each region where 1 means a branch is placed
        branches = self.model.addVars(regions, vtype=GRB.BINARY, name="Branch")

        # Objective: Maximize the number of clients
        self.model.setObjective(
            gp.quicksum(
                branches[r] * self.population[r] * self.branch_attractiveness +
                gp.quicksum(
                    branches[i] * self.adjacency_matrix[r][i] * self.population[i] * self.branch_attractiveness_neighbors 
                    for i in regions if i != r
                )
                for r in regions
            ),
            GRB.MAXIMIZE
        )

        # Constraint: Do not exceed the budget
        self.model.addConstr(
            gp.quicksum(branches[r] * self.cost_per_branch for r in regions) <= self.budget,
            "budget"
        )

        # Constraint: No two branches in neighboring regions
        for r in regions:
            for i in regions:
                if self.adjacency_matrix[r][i] == 1:
                    self.model.addConstr(branches[r] + branches[i] <= 1, f"neighboring_{r}_{i}")

    def solve(self):
        self.setup_model()
        self.model.optimize()
        if self.model.status == GRB.OPTIMAL:
            print('Optimal solution found with total number of clients:', self.model.objVal)
            return self.extract_solution()
        else:
            print('No optimal solution found or there was an issue solving the model.')
            return None

    def extract_solution(self):
        solution = []
        for v in self.model.getVars():
            if v.x > 0.5 and 'Branch' in v.varName:
                region = int(v.varName.split('[')[1].split(']')[0])
                solution.append(region)
        return solution