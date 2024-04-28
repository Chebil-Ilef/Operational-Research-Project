import gurobipy as gp
import numpy as np

class PL6:
    def __init__(self,capacite,demande,costs,quantite_transport):
        self.capacite = capacite
        self.demande = demande
        self.costs = costs
        self.quantite_transport = quantite_transport
        self.names = ["A","B","C","D1","D2","E","F"]

    def run(self):
        model=gp.Model("PL6")

        x = model.addVars(range(7), range(7), vtype=gp.GRB.INTEGER, name='x')

        model.setObjective( gp.quicksum( (x[i,j]*self.costs[i][j])
                                            for i in range(7)
                                                for j in range(7)
                                                    if not np.isnan(self.costs[i][j])
                                        ), gp.GRB.MINIMIZE)

        # Capacité des usines
        model.addConstr(gp.quicksum(x[0,i] for i in range(7)) <= self.capacite[0])
        model.addConstr(gp.quicksum(x[1,i] for i in range(7)) <= self.capacite[1])
        model.addConstr(gp.quicksum(x[2,i] for i in range(7)) <= self.capacite[2])

        # Demande des clients
        model.addConstr(gp.quicksum(x[i,5] for i in range(7)) - x[5,6] == self.demande[0])
        model.addConstr(gp.quicksum(x[i,6] for i in range(7)) - x[6,5] == self.demande[1])

        # Quantité pouvant etres transportées
        for i in range(7):
            for j in range(7):
                model.addConstr(x[i,j] <= self.quantite_transport)

        # Les depots
        model.addConstr( gp.quicksum(x[3,i] for i in range(7)) <= ( gp.quicksum(x[i,3] for i in range(7)) ))
        model.addConstr( gp.quicksum(x[4,i] for i in range(7)) <= ( gp.quicksum(x[i,4] for i in range(7)) ))
        
        # Les parametres nulles doievent rester nulles
        for i in range(7):
            for j in range(7):
                if (self.costs[i][j] == -1):
                    model.addConstr(x[i,j] == 0)

        model.optimize()

        result = {}

        tab = []
        for i,v in enumerate(model.getVars()):
            tab.append(v.x)
        print(tab)

        # fill the matrix with the values of tab
        for i in range(7):
            result[self.names[i]] = {}
            for j in range(7):
                result[self.names[i]][self.names[j]] = int(tab[i*7+j])

        return result