import gurobipy as gp
from gurobipy import GRB

def solve_coverage_problem(zone_data):
    # Extracting data from zone_data
    zones = [item[1] for item in zone_data]
    sites = [item[0] for item in zone_data]
    antennas_required = [item[2] for item in zone_data]

    # Creating the Gurobi model
    model = gp.Model("CoverageProblem")

    # Creating a set of unique sites
    unique_sites = set(site for sublist in sites for site in sublist)
    print(unique_sites)

    # Decision variables for each site
    x = {}
    for site in unique_sites:
        x[site] = model.addVar(vtype=GRB.BINARY, name=f"x_{site}")

    # Objective function
    model.setObjective(gp.quicksum(x[site] for site in unique_sites), sense=GRB.MINIMIZE)

    # Constraints for each zone
    for i, zone in enumerate(zones):
        print((i,zone))
        # Constraint for each zone: the sum of binary variables for sites surrounding the zone must be greater than or equal to the number of required antennas
        model.addConstr(gp.quicksum(x[site] for site in sites[i]) >= antennas_required[i], f"antenna_constraint_{i}")

    # Solving the model
    model.optimize()

    # Displaying results
    result = []
    if model.status == GRB.OPTIMAL:
        for site in unique_sites:
            result.append({"Site": site, "Antenna": int(x[site].x)})
        return result
    else:
        print("No optimal solution found.")
        return None


'''
# Example usage:
zone_data = [
    [['A', 'B'], 1,1],
    [['A', 'E', 'F'], 2,1],
    [['B', 'D'], 3,1],
    [['C', 'E', 'G'], 4,2],
    [['G', 'F'], 5,1]
]

result = solve_coverage_problem(zone_data)
if result is not None:
    print("Optimal Solution:")
    for entry in result:
        print(f"Site {entry['Site']}: Antenna = {entry['Antenna']}")
'''