import gurobipy as gp

class PL1:
    def __init__(self,Rendement,Prix_vente,main_doeuvre,Temps_machine,Eau,Salaire_annuel,
                 Frais_gestion,zone_agricole, prix_main_doeuvre,eau_dirrigation,
                 heure_machine, cout_heure_machine, cout_eau):
        self.Rendement = Rendement
        self.Prix_vente = Prix_vente
        self.main_doeuvre = main_doeuvre
        self.Temps_machine = Temps_machine
        self.Eau = Eau
        self.Salaire_annuel = Salaire_annuel
        self.Frais_gestion = Frais_gestion
        self.zone_agricole = zone_agricole
        self.prix_main_doeuvre = prix_main_doeuvre
        self.eau_dirrigation = eau_dirrigation
        self.heure_machine = heure_machine
        self.cout_heure_machine = cout_heure_machine
        self.cout_eau = cout_eau
        self.names= ["Blé", "Orge", "Maïs", "Bet-sucre", "Tournesol"]

    def run(self):
        model = gp.Model("PL1")

        # Variables de décision : quantité de chaque culture à planter
        x = model.addVars(range(5), vtype=gp.GRB.INTEGER, name="x")

        # Fonction d'objective
        model.setObjective(gp.quicksum( x[i] * (
                                ( self.Rendement[i]*self.Prix_vente[i] )
                                - ( self.main_doeuvre[i]*self.Salaire_annuel[i] )
                                - ( self.Temps_machine[i]*self.cout_heure_machine )
                                - ( self.Eau[i]*self.cout_eau )
                            ) - self.Frais_gestion[i]
                            for i in range(5)),gp.GRB.MAXIMIZE)

        # Contraintes
        model.addConstr(gp.quicksum( (self.main_doeuvre[i]*x[i]) for i in range(5)) <= self.prix_main_doeuvre)
        model.addConstr(gp.quicksum( (self.Temps_machine[i]*x[i]) for i in range(5)) <= self.heure_machine)
        model.addConstr(gp.quicksum( (self.Eau[i]*x[i]) for i in range(5)) <= self.eau_dirrigation)
        for i in range(5):
            model.addConstr(x[i] >= 0)
        model.addConstr(gp.quicksum( x[i] for i in range(5)) <= self.zone_agricole)

        # Resolution
        model.optimize()

        # Affichage des resultats
        resultat = {}
        for i,v in enumerate(model.getVars()):
            resultat[self.names[i]] = v.x
        resultat["Profit total "] = str(model.objVal) + " DT"

        return resultat
