# import numpy as np
# import gurobipy as gp

# class PL3:
#     def __init__(self,jours):
#         self.jours = jours
#         self.jour = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']

#     def run(self):
#         jours_de_conges= np.ones((7,7),dtype=int)
#         for k in range(7):
#             jours_de_conges[k,k] = 0
#             jours_de_conges[k,(k+1)%7] = 0
#         print(jours_de_conges)

#         model = gp.Model("PL3")

#         # les variables de décision représentant les employés prenant deux jours de congés à partir du jour i
#         x=[]
#         for i in range(7):
#             x.append(model.addVar(lb = 0 ,vtype = gp.GRB.INTEGER, name='x'+str(i)))

#         # la fonction objectif
#         model.setObjective(gp.quicksum(x), gp.GRB.MINIMIZE)

#         # Contraintes : le nombre d'employé doit être >= au minimum requis pour un tel jour
#         for j in range(7):
#             model.addConstr(gp.quicksum(jours_de_conges[:,j] * x) >= self.jours[j])

#         # Resolution du PL
#         model.optimize()

#         # Affichage des résultats
#         nb = []
#         for i,v in enumerate(model.getVars()):
#             nb.append(int(v.x))
        
#         result = {}
#         for i in range(7):
#             val = model.objVal - ( nb[i] + nb[i-1] )
#             result[str(i+1)+' -  '+str(self.jour[i])] = " : %d employés.\n" % (val)
#         result["8 -  Nombre d'employes : "] =str(int(model.objVal))
#         return result


# # if "__main__" == __name__:
# #     pl3 = PL3(17,13,15,19,14,16,11)
# #     print(pl3.run())




import numpy as np
import gurobipy as gp

class PL3:
    def __init__(self,jours):
        self.jours = jours
        self.jour = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']

    def run(self):
        jours_de_conges= np.ones((7,7),dtype=int)
        for k in range(7):
            jours_de_conges[k,k] = 0
            jours_de_conges[k,(k+1)%7] = 0
        print(jours_de_conges)

        model = gp.Model("PL3")

        # les variables de décision représentant les employés prenant 
        # deux jours de congés à partir du jour i
        x=[]
        for i in range(7):
            x.append(model.addVar(lb = 0 ,vtype = gp.GRB.INTEGER, name='x'+str(i)))

        # la fonction objectif
        model.setObjective(gp.quicksum(x), gp.GRB.MINIMIZE)

        # Contraintes : le nombre d'employé doit être >= au minimum requis pour un tel jour
        for j in range(7):
            expr = gp.LinExpr()
            for i in range(7):
                expr.add(jours_de_conges[i,j] * x[i])
            model.addConstr(expr >= self.jours[j])

        # Resolution du PL
        model.optimize()

        # Affichage des résultats
        nb = []
        for i,v in enumerate(model.getVars()):
            nb.append(int(v.x))
        
        result = {}
        for i in range(7):
            val = model.objVal - ( nb[i] + nb[i-1] )
            result[str(i+1)+' -  '+str(self.jour[i])] = " : %d employés.\n" % (val)
        result["8 -  Nombre d'employes : "] =str(int(model.objVal))
        return result