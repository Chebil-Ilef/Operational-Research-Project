import gurobipy as gp
from gurobipy import GRB
from itertools import combinations
import numpy as np

def solve_optimization(A, population, num_regions, B, K, D, a, b, c):
    # Create the model
    model = gp.Model("implantation_agences")
    x = model.addVars(num_regions, vtype=GRB.BINARY, name="x")
    y = model.addVars(num_regions, vtype=GRB.BINARY, name="y")

    # Objective function
    Z = sum(a * population[i] + (
                b * sum(A[i][j] * population[j] for j in range(num_regions) if i != j) + c * y[i] * population[
            i]) * x[i]
            for i in range(num_regions))
    model.setObjective(Z, GRB.MAXIMIZE)

    # Budget constraints
    model.addConstr(K * x.sum() + D * y.sum() <= B, "contrainte_budget")

    # Constraints for not opening branches in neighboring regions
    for i, j in combinations(range(num_regions), 2):
        if A[i][j] == 1:
            model.addConstr(A[i][j] * (x[i] + x[j]) <= 1, f"contrainte_voisines_{i}_{j}")

    # Constraints to have clients from all regions
    for i in range(num_regions):
        model.addConstr(sum(A[i][j] * x[j] for j in range(num_regions)) + y[i] >= 1, f"contrainte_clients_{i}")

    model.optimize()

    # Get the solution
    solution = []
    for i in range(num_regions):
        solution.append({
            "Region": i + 1,
            "Agence": int(x[i].getAttr('X')),
            "Serveur_DAB": int(y[i].getAttr('X'))
        })

    return solution

# Example usage:
# A = ...  # adjacency matrix
# population = ...  # population list
# num_regions = ...  # number of regions
# B, K, D, a, b, c = ..., ..., ..., ..., ..., ...  # other parameters
# results = solve_optimization(A, population, num_regions, B, K, D, a, b, c)
# print(results)
