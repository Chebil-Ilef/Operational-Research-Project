from gurobipy import *

def solve_linear_programming(input_values):
    m = Model(name="PL3")

    # Decision variables
    x1 = m.addVar(name="x1", vtype=GRB.INTEGER)
    x2 = m.addVar(name="x2", vtype=GRB.INTEGER)
    x3 = m.addVar(name="x3", vtype=GRB.INTEGER)
    x4 = m.addVar(name="x4", vtype=GRB.INTEGER)
    x5 = m.addVar(name="x5", vtype=GRB.INTEGER)
    x6 = m.addVar(name="x6", vtype=GRB.INTEGER)
    x7 = m.addVar(name="x7", vtype=GRB.INTEGER)

    # Objective function
    obj_func = x1 + x2 + x3 + x4 + x5 + x6 + x7
    m.setObjective(obj_func, GRB.MINIMIZE)

    # Constraints
    C1 = m.addConstr(x1 + x4 + x5 + x6 + x7 >= input_values[0])
    C2 = m.addConstr(x1 + x2 + x5 + x6 + x7 >= input_values[1])
    C3 = m.addConstr(x1 + x2 + x3 + x6 + x7 >= input_values[2])
    C4 = m.addConstr(x1 + x2 + x3 + x4 + x7 >= input_values[3])
    C5 = m.addConstr(x1 + x2 + x3 + x4 + x5 >= input_values[4])
    C6 = m.addConstr(x2 + x3 + x4 + x5 + x6 >= input_values[5])
    C7 = m.addConstr(x3 + x4 + x5 + x6 + x7 >= input_values[6])

    # Optimize
    m.optimize()

    # Retrieve and print the optimal solution
    optimal_value = m.objVal
    # retunr the optimal solution as well as the values of the decision variables
    return int(optimal_value), int(x1.x), int(x2.x), int(x3.x), int(x4.x), int(x5.x), int(x6.x), int(x7.x)

