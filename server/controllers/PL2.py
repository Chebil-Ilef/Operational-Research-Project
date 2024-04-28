import gurobipy as gp

class PL2:
    def __init__(self,C,Cs,D,Ouv,Sal,Hsup,R,L,h,H,Hmax, StockInit):
        self.C = C
        self.Cs = Cs
        self.D = D
        self.Ouv = Ouv
        self.Sal = Sal
        self.Hsup = Hsup
        self.R = R
        self.L = L
        self.h = h
        self.H = H
        self.Hmax = Hmax
        self.StockInit=StockInit

    def run(self):
        # Modèle d'optimisation
        model = gp.Model()

        #* Variables de décision
        # Nombre d'heures supplémentaires par mois
        NHS = model.addVars(range(4), vtype=gp.GRB.INTEGER, lb=0, name="NHS")  
        # Nombre de paires de chaussures fabriquées par mois
        NCH = model.addVars(range(4), vtype=gp.GRB.INTEGER, lb=0, name="NCH")  
        # Nombre d'ouvriers recrutés par mois
        NOR = model.addVars(range(4), vtype=gp.GRB.INTEGER, lb=0, name="NOR")  
        # Nombre d'ouvriers licenciés par mois
        NOL = model.addVars(range(4), vtype=gp.GRB.INTEGER, lb=0, name="NOL") 
        # Stock de paires de chaussures par mois 
        S = model.addVars(range(5), vtype=gp.GRB.INTEGER, lb=0, name="S")  
        # Nombre d'ouvriers disponibles par mois
        NO = model.addVars(range(5), vtype=gp.GRB.INTEGER, lb=0, name="NO")  

        #* Fonction objectif
        obj = (gp.quicksum(int(self.Cs[i]) * S[i] for i in range(4))
            + gp.quicksum(int(self.Sal) * NO[i] for i in range(4))
            + gp.quicksum(int(self.Hsup) * NHS[i] for i in range(4))
            + gp.quicksum(int(self.R) * NOR[i] for i in range(4))
            + gp.quicksum(int(self.L) * NOL[i] for i in range(4))
            + gp.quicksum(int(self.C) * NCH[i] for i in range(4)))
        model.setObjective(obj, sense=gp.GRB.MINIMIZE)

        #* Contraintes

        # Les heures supplémentaires
        for i in range(4):
            model.addConstr(NHS[i] <= int(self.Hmax) * NO[i])

        # La production & la demande
        for i in range(4):
            model.addConstr(S[i] + NCH[i] >= int(self.D[i]))

        # La production & les heures de travail
        for i in range(4):
            model.addConstr(NCH[i] <= (1/int(self.h)) * (NHS[i] + NO[i] * int(self.H)))

        # Effectif
        model.addConstr(NO[0] == int(self.Ouv))
        for i in range(3):
            model.addConstr(NO[i+1] == NO[i] + NOR[i] - NOL[i])

        # Stock
        model.addConstr(S[0] == int(self.StockInit))
        model.addConstr(S[1] == S[0] + NCH[0] - int(self.D[0]))
        model.addConstr(S[2] == S[1] + NCH[1] - int(self.D[1]))
        model.addConstr(S[3] == S[2] + NCH[2] - int(self.D[2]))
        model.addConstr(S[4] == S[3] + NCH[3] - int(self.D[3]))

        # Signe
        for i in range(4):
            model.addConstr(S[i] >= 0)
            model.addConstr(NO[i] >= 0)
            model.addConstr(NOR[i] >= 0)
            model.addConstr(NOL[i] >= 0)
            model.addConstr(NHS[i] >= 0)

        #* Optimisation
        model.optimize()

        result = {}

        #* Affichage des résultats
        print("Solution optimale:")

        for i in range(4):
            result["mois"+str(i+1)]={
                "NSH" : "Nombre d'heures supplémentaires par mois [{}] = {}"
                        .format(i+1, int(NHS[i].x)),
                "NCH" : "Nombre de paires de chaussures fabriquées par mois [{}] = {}"
                        .format(i+1, int(NCH[i].x)),
                "NOR" : "Nombre d'ouvriers recrutés par mois [{}] = {}"
                        .format(i+1, int(NOR[i].x)),
                "NOL" : "Nombre d'ouvriers licenciés par mois [{}] = {}"
                        .format(i+1, int(NOL[i].x)),
                "S" : "Stock de paires de chaussures par mois [{}] = {}"
                        .format(i+1, int(S[i].x)),
                "NO" : "Nombre d'ouvriers disponibles par mois [{}] = {}"
                        .format(i+1, int(NO[i].x))
            }
        return result



