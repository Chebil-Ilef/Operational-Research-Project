# import gurobipy as gp
# from gurobipy import GRB

# class PL5:
#     def __init__(self,offres,demandes,couts,penalites):
#         self.offres = offres
#         self.demandes = demandes
#         self.couts = couts
#         self.penalites = penalites

#     def run(self):
#         # Création du modèle
#         model = gp.Model('PL5')

#         # Ajout des variables de décision
#         x = model.addVars(3, 4, vtype=GRB.INTEGER, name='x')
#         d = model.addVars(4, vtype=GRB.INTEGER, name='d')

#         # Ajout des contraintes
#         for i in range(3):
#             for j in range(4):
#                 model.addConstr(x[i, j] >= 0)
#                 model.addConstr(x[i, j] <= self.offres[i])

#         for j in range(4):
#             model.addConstr(gp.quicksum(x[i, j] for i in range(3)) + d[j] >= self.demandes[j])
#             model.addConstr(d[j] >= 0)
#             model.addConstr(d[j] <= self.demandes[j])

#         # Ajout de la fonction objectif
#         model.setObjective(gp.quicksum(x[i, j] * self.couts[i][j] for i in range(3) for j in range(4)) +
#                         gp.quicksum(d[j] * self.penalites[j] for j in range(4)), GRB.MINIMIZE)

#         # Résolution du modèle
#         model.optimize()

#         result = {}
#         count = 0

#         # if model.status == GRB.OPTIMAL:
#         #     for i in range(3):
#         #         for j in range(4):
#         #             if x[i, j].x != 0:
#         #                 print(f'La centrale {i+1} fournit {x[i,j].x} Kwh à la ville {j+1}')
#         #     for j in range(4):
#         #         if d[j].x != 0:
#         #             print(f'La ville {j+1} a une demande non satisfaite de {d[j].x} Kwh')

#         if model.status == GRB.OPTIMAL:
#             for i in range(3):
#                 for j in range(4):
#                     if x[i, j].x != 0:
#                         result[count] = f'La centrale {i+1} fournit {x[i,j].x} Kwh à la ville {j+1}'
#                         count += 1
#             for j in range(4):
#                 if d[j].x != 0:
#                     result[count] = f'La ville {j+1} a une demande non satisfaite de {d[j].x} Kwh'
#                     count+=1
#         return result




import gurobipy as gp
from gurobipy import GRB

class PL5:
    def __init__(self, offres, demandes, couts, penalites):
        self.offres = offres
        self.demandes = demandes
        self.couts = couts
        self.penalites = penalites

    def run(self):
        # Création du modèle
        model = gp.Model('PL5')

        # Ajout des variables de décision
        x = model.addVars(3, 4, vtype=GRB.INTEGER, name='x')
        d = model.addVars(4, vtype=GRB.INTEGER, name='d')

        # Ajout des contraintes
        for i in range(3):
            for j in range(4):
                model.addConstr(x[i, j] >= 0)
                model.addConstr(x[i, j] <= int(self.offres[i]))

        for j in range(4):
            expr = gp.quicksum(x[i, j] for i in range(3))
            model.addConstr(expr + d[j] >= int(self.demandes[j]))
            model.addConstr(d[j] >= 0)
            model.addConstr(d[j] <= int(self.demandes[j]))

        # Ajout de la fonction objectif
        obj = gp.quicksum(x[i, j] * self.couts[i][j] for i in range(3) for j in range(4)) + \
              gp.quicksum(d[j] * self.penalites[j] for j in range(4))
        model.setObjective(obj, GRB.MINIMIZE)

        # Résolution du modèle
        model.optimize()

        # Récupération des résultats
        result = {}
        count = 0

        if model.status == GRB.OPTIMAL:
            for i in range(3):
                for j in range(4):
                    if x[i, j].x != 0:
                        result[count] = f'La centrale {i+1} fournit {x[i,j].x} Kwh à la ville {j+1}'
                        count += 1
            for j in range(4):
                if d[j].x != 0:
                    result[count] = f'La ville {j+1} a une demande non satisfaite de {d[j].x} Kwh'
                    count += 1
        return result
