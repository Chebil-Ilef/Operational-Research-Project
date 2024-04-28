import gurobipy as gp
import numpy as np

class PL8:
    def __init__(self,costs):
        self.costs = costs

    def run(self):
        # Création du modèle
        model = gp.Model("PL8")

        # Variables de décision : binaire indiquant si un arc est utilisé ou non
        x = model.addVars(range(10), range(10), vtype=gp.GRB.BINARY, name="x")

        # Fonction objectif : minimiser la somme des coûts des arcs utilisés
        model.setObjective(gp.quicksum(self.costs[i][j] * x[i,j] for i in range(10) 
                                       for j in range(10) if not (self.costs[i][j] ==0)), gp.GRB.MINIMIZE)

        # Contrainte
        # Noeud debut
        model.addConstr(gp.quicksum( x[0,j] for j in range(1,4) ) == 1)
        # Noeud fin
        model.addConstr(gp.quicksum( x[i,9] for i in range(4,9) if (i!=7) ) == 1)

        # Les parametres nuls doivent rester nuls
        for i in range(10):
            for j in range(10):
                if (self.costs[i][j] == 0):
                    model.addConstr(x[i,j] == 0)

        for k in range(1, 9):
            model.addConstr(gp.quicksum(x[i,k] for i in range(10) if self.costs[i][k] != 0) == gp.quicksum(x[k,j] 
            for j in range(10) if self.costs[k][j] != 0))

        # Résolution du modèle
        model.optimize()
        
        # create matrix that takes 10*10 values of v.x
        matrix = np.zeros((10,10),dtype=int)
        tab = []
        for i,v in enumerate(model.getVars()):
            tab.append(v.x)

        # fill the matrix with the values of tab
        for i in range(10):
            for j in range(10):
                if tab[i*10+j] > 0:
                    matrix[i][j] = int(tab[i*10+j])

        result = {}
        count = 0

        chemin = []
        chemin_str = ""
        # Affichage de la solution
        if model.status == gp.GRB.OPTIMAL:
            for i in range(10):
                for j in range(10):
                    if matrix[i][j] == 1:
                        result[str(count)] = "Chemin de {} à {} : {}".format(i+1,j+1,self.costs[i][j])
                        count += 1
                        chemin.append("{}".format(i+1))
            result["Coût total"] = "{}".format(model.objVal)

            for i in range(len(chemin)-1):
                chemin_str += str(chemin[i]) + " -> "
            chemin_str += str(chemin[-1]) + " -> 10"
            result["Meilleur chemin"] = chemin_str

        else:
            print("Pas de chemin optimal!")

        print(result)
        return result