import gurobipy as gp

def solve_optimization(input_values, months_demand):
    # Retrieve other required input values from input_values dictionary
    stock_initial = int(input_values["Stock"])
    nombre_initiale_ouvriers = int(input_values["Initial Employee Number"])
    salaire_ouvrier = float(input_values["Salary of Employee"])
    heures_travail_ouvrier = int(input_values["Employee Hours/M"])
    max_heures_supplementaires = int(input_values["Max Supp Hours"])
    cout_heure_supplementaire = float(input_values["Price of Supp Hour"])
    heures_travail_paire = int(input_values["Hours for pair"])
    cout_matiere_premiere = float(input_values["Price of one pair prod"])
    frais_recrutement = float(input_values["Recruitment Fees"])
    frais_licenciement = float(input_values["Licensing Fees"])
    cout_stockage = float(input_values["Stocking Fees"])

    nb_mois = len(months_demand)
    model = gp.Model("PL2")

    # Add decision variables to the model
    heures_sup = {t: model.addVar(vtype=gp.GRB.INTEGER, name=f"heures_sup_{t}") for t in range(nb_mois)}
    paires_chaussures = {t: model.addVar(vtype=gp.GRB.INTEGER, name=f"paires_chaussures_{t}") for t in range(nb_mois)}
    ouvriers_rec = {t: model.addVar(vtype=gp.GRB.INTEGER, name=f"ouvriers_rec_{t}") for t in range(nb_mois)}
    ouvriers_lic = {t: model.addVar(vtype=gp.GRB.INTEGER, name=f"ouvriers_lic_{t}") for t in range(nb_mois)}
    ouvriers_dispo = {t: model.addVar(vtype=gp.GRB.INTEGER, name=f"ouvriers_dispo_{t}") for t in range(nb_mois)}
    stock = {t: model.addVar(vtype=gp.GRB.INTEGER, name=f"stock_{t}") for t in range(nb_mois)}

    model.update()

    # Constraints
    for t in range(nb_mois):
        if t > 0:
            model.addConstr(ouvriers_dispo[t] == ouvriers_dispo[t - 1] + ouvriers_rec[t] - ouvriers_lic[t])
            model.addConstr(stock[t] == stock[t - 1] + paires_chaussures[t - 1] - months_demand[t - 1])
        else:
            model.addConstr(ouvriers_dispo[t] == nombre_initiale_ouvriers + ouvriers_rec[t] - ouvriers_lic[t])
            model.addConstr(stock[t] == stock_initial)

        model.addConstr(heures_sup[t] <= max_heures_supplementaires * ouvriers_dispo[t])
        model.addConstr(stock[t] + paires_chaussures[t] >= months_demand[t])
        model.addConstr(paires_chaussures[t] <= (1 / heures_travail_paire) * (heures_sup[t] + ouvriers_dispo[t] * heures_travail_ouvrier))

    model.addConstrs((stock[t] >= 0 for t in range(nb_mois)))
    model.addConstrs((ouvriers_dispo[t] >= 0 for t in range(nb_mois)))
    model.addConstrs((ouvriers_rec[t] >= 0 for t in range(nb_mois)))
    model.addConstrs((ouvriers_lic[t] >= 0 for t in range(nb_mois)))
    model.addConstrs((heures_sup[t] >= 0 for t in range(nb_mois)))

    # Objective function
    model.setObjective(
        gp.quicksum(
            stock[t] * cout_stockage
            + ouvriers_rec[t] * frais_recrutement
            + ouvriers_lic[t] * frais_licenciement
            + heures_sup[t] * cout_heure_supplementaire
            + paires_chaussures[t] * cout_matiere_premiere
            + ouvriers_dispo[t] * salaire_ouvrier
            for t in range(nb_mois)
        ),
        gp.GRB.MINIMIZE
    )

    # Solve the model
    model.optimize()

    # Return the optimized value and the decison variables 
    return model.objVal, {
        "heures_sup": {t: heures_sup[t].x for t in range(nb_mois)},
        "paires_chaussures": {t: paires_chaussures[t].x for t in range(nb_mois)},
        "ouvriers_rec": {t: ouvriers_rec[t].x for t in range(nb_mois)},
        "ouvriers_lic": {t: ouvriers_lic[t].x for t in range(nb_mois)},
        "ouvriers_dispo": {t: ouvriers_dispo[t].x for t in range(nb_mois)},
        "stock": {t: stock[t].x for t in range(nb_mois)},
    }
   