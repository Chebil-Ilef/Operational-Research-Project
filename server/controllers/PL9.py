import gurobipy as gp

class PL9:
    def __init__(self,capacite_prod,prix_usinedepot,prix_depotclient,demande,frais):
        self.capacite_prod = capacite_prod
        self.prix_usinedepot = prix_usinedepot
        self.prix_depotclient = prix_depotclient
        self.demande = demande
        self.frais = frais
    
    def run(self):
        # model
        model = gp.Model("PL9")

        # Variables
        x = model.addVars(range(5), range(3), name="x") # x[i, j] = quantité transportée de l'usine i au dépot j
        usine = model.addVars(range(5), vtype=gp.GRB.BINARY, name="usine") # usine[i] = 1 si l'usine i est ouverte
        depot = model.addVars(range(3), vtype=gp.GRB.BINARY, name="depot") # depot[j] = 1 si le dépot j est ouvert


        # Fonction objectif
        model.setObjective(
            gp.quicksum(self.prix_usinedepot[i][j] * x[i, j] for i in range(5) for j in range(3))
            + gp.quicksum(self.prix_depotclient[j][k] * x[i, j] for i in range(5) for j in range(3) for k in range(4))
            + gp.quicksum(f * u for f, u in zip(self.frais, usine) if isinstance(f, (int, float)))
            + gp.quicksum(f * d for f, d in zip(self.frais[len(range(5)):], depot) if isinstance(f, (int, float))),
            gp.GRB.MINIMIZE)

        # Contraintes
        for i in range(5):
            model.addConstr(gp.quicksum(x[i, j] for j in range(3)) <= self.capacite_prod[i] * usine[i])
        for j in range(3):
            for k in range(4):
                model.addConstr(gp.quicksum(x[i, j] for i in range(5)) >= self.demande[k])

        # Résolution
        model.optimize()

        result = {}
        count = 0

        # Affichage des resultats
        for i in range(5):
            
            for j in range(3):
                tmp = {}
                if x[i, j].x != 0:
                    tmp["0"]="Usine "+ str(i+1)+ " --> Depot "+ str(j+1)+ " : "+ str(x[i, j].x)
                    for k in range(4):
                        tmp[str(k+1)] = "Client "+ str(k+1)+ " : " + str(self.prix_depotclient[j][k])
                    result[str(count)] = tmp
                    count += 1
                    
        result["Coût total"] = str(model.objVal)
        return result
