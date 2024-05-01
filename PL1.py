import gurobipy as gp
from gurobipy import *

def solve_optimization(tableau_values, saisie_values):
    # Liste des noms des cultures
    cultures = ["Ble", "Orge", "Mais", "Bet-Sucre", "Tournesol"]

    # Récupérer les valeurs du tableau
    R = [tableau_values[('Rendement Q/ha', str(culture))] for culture in cultures]
    print(R)
    P = [tableau_values[('Prix de vente UM/Q', str(culture))] for culture in cultures]
    print(P)
    MO = [tableau_values[('M.O.Ouvriers/ha', str(culture))] for culture in cultures]
    print(MO)
    T = [tableau_values[('Temps machine H/ha', str(culture))] for culture in cultures]
    print(T)
    E = [tableau_values[('Eau m3/ha', str(culture))] for culture in cultures]
    print(E)
    S = [tableau_values[('Salaire annuel/ouvrier', str(culture))] for culture in cultures]
    print(S)
    F = [tableau_values[('Frais fixe de gestion', str(culture))] for culture in cultures]
    print(F)
    CM =saisie_values[3]
    print(CM)
    CE =saisie_values[4]
    print(CE)
    eau_limit=saisie_values[1]
    print(eau_limit)
    main_oeuvre_limit=saisie_values[0]
    print(main_oeuvre_limit)
    temps_machine_limit = saisie_values[2]
    print(temps_machine_limit)

    model = gp.Model("PL 1")

    x = []
    for culture in cultures:
        x.append(model.addVar(lb=0, vtype=GRB.CONTINUOUS, name=f'x_{culture}'))

    fct = 0
    for i, culture in enumerate(cultures):
        fct += x[i] * ((R[i] * P[i]) - (MO[i] * S[i] + CM * T[i] + CE * E[i]) - F[i])

    ST = 0
    for i, culture in enumerate(cultures):
        ST += x[i] * T[i]

    SMO = 0
    for i, culture in enumerate(cultures):
        SMO += x[i] * MO[i]

    SE = 0
    for i, culture in enumerate(cultures):
        SE += x[i] * E[i]

    model.setObjective(fct, GRB.MAXIMIZE)
    model.addConstr(ST <= temps_machine_limit, "Temps Machine")
    model.addConstr(SMO <= main_oeuvre_limit, "Main d'oeuvre")
    model.addConstr(SE <= eau_limit, "Eau")
    model.optimize()

    # Print the status of the optimization
    if model.status == GRB.OPTIMAL:
        print("Optimal solution found!")
    elif model.status == GRB.INFEASIBLE:
        print("The model is infeasible.")
    elif model.status == GRB.UNBOUNDED:
        print("The model is unbounded.")
    else:
        print("Optimization ended with status:", model.status)

    # Print the result of the optimization
    for var in model.getVars():
        print(var.varName, '=', var.x)

    print("Objective value =", "{:.2f}".format(model.objVal))

    results = {}
    for var in model.getVars():
        results[var.varName] = var.x

    results["Objective value"] = "{:.2f}".format(model.objVal)

    return results
