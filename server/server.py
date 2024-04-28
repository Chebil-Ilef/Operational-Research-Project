from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from controllers.PL1 import PL1
from controllers.PL3 import PL3
from controllers.PL2 import PL2
from controllers.PL5 import PL5
from controllers.PL6 import PL6
from controllers.PL7 import PL7
from controllers.PL8 import PL8
from controllers.PL9 import PL9

app = Flask(__name__)
cors = CORS(app)


@app.route('/')
def hello():
    return "hello"

@app.route('/pl1', methods = ['POST'])
@cross_origin()
def pl1():
    data = request.get_json()
    # print(data)
    # Parametres du probleme
    Rendement = data['Rd']
    Prix_vente = data['Pv']
    main_doeuvre = data['MO']
    Temps_machine = data['M']
    Eau = data['E']
    Salaire_annuel = data['S']
    Frais_gestion = data['F']

    # Valeurs des contraintes
    zone_agricole = data['autres'][0]
    prix_main_doeuvre = data['autres'][1]
    eau_dirrigation = data['autres'][2]
    heure_machine = data['autres'][3]
    cout_heure_machine = data['autres'][4]
    cout_eau = data['autres'][5]
    # cout eau -----------------------------

    pl1 = PL1(Rendement=Rendement,Prix_vente=Prix_vente,main_doeuvre=main_doeuvre,Temps_machine=Temps_machine,
              Eau=Eau,Salaire_annuel=Salaire_annuel,Frais_gestion=Frais_gestion, zone_agricole=zone_agricole,prix_main_doeuvre=prix_main_doeuvre,
              eau_dirrigation=eau_dirrigation,heure_machine=heure_machine, cout_heure_machine=cout_heure_machine, cout_eau=cout_eau)
    # print(pl1.run())
    response = {
        "res1":pl1.run()
    }
    return jsonify(response)


@app.route('/pl2', methods = ['POST'])
@cross_origin()
def pl2():
    data = request.get_json()
    D = data["demande"]         # 3000,5000,2000,1000
    h = data["produit"][0]      # 4
    C = data["produit"][1]      # 15
    Cs = data["stock_cout"]     # 3,3,3,3
    Ouv = data["ouvriers"][0]   # 100 : nombre ouvriers
    Sal = data["ouvriers"][1]   # 1500 : salaire
    H = data["VhRL"][0]         # 160 : volume horaire
    R = data["VhRL"][1]         # 1600 : frais recrut
    L = data["VhRL"][2]         # 2000 : frais licenc
    Hmax = data["heures_supp"][0]   # 20 : max heures supp
    Hsup = data["heures_supp"][1]   # 13 : cout heure supp
    StockInit = data["stock_initial"][0]    # 500: stock initial du mois 1

    pl2 = PL2(h=h, C=C, Cs=Cs,D=D, Ouv=Ouv, Sal=Sal, H=H, R=R, L=L, Hmax=Hmax, Hsup=Hsup, StockInit=StockInit)
    response = {
        "res4":pl4.run()
    }
    return jsonify(response)

@app.route('/pl3', methods = ['POST'])
@cross_origin()
def pl3():
    data = request.get_json()
    jours = data["min_jours"]
    pl3 = PL3(jours=jours)
    response = {
        "res3":pl3.run()
    }
    return jsonify(response)



    

@app.route('/pl5', methods = ['POST'])
@cross_origin()
def pl5():
    data = request.get_json()
    offres = data["centrales_offres"]
    demandes = data["villes_demande"]
    couts = data["centrales_villes"]
    penalites = data["penalite_villes"]

    pl5 = PL5(offres=offres,demandes=demandes,couts=couts,penalites=penalites)
    response = {
        "res5":pl5.run()
    }
    return jsonify(response)


@app.route('/pl6', methods = ['POST'])
@cross_origin()
def pl6():
    data = request.get_json()
    capacite = data["capacite_usine"]
    demande = data ["demande_client"]
    quantite_transport = data["quantite_trans"][0]
    costs = data["matrice"]

    pl6 = PL6(capacite=capacite,demande=demande,quantite_transport=quantite_transport,costs=costs)
    response = {
        "res6":pl6.run()
    }
    return jsonify(response)


@app.route('/pl7', methods = ['POST'])
@cross_origin()
def pl7():
    data = request.get_json()
    print(data)
    costs = data["C"]

    pl7 = PL7(costs=costs)
    response = {
        "res7":pl7.run()
    }
    return jsonify(response)


@app.route('/pl8', methods = ['POST'])
@cross_origin()
def pl8():
    data = request.get_json()
    # print(data)
    costs = data["path"]

    pl8 = PL8(costs=costs)
    response = {
        "res8":pl8.run()
    }
    return jsonify(response)



@app.route('/pl9', methods = ['POST'])
@cross_origin()
def pl9():
    data = request.get_json()
    
    # Paramètres du problème par défaut
    capacite_prod = data["offre_usine"]
    prix_usinedepot = data["usine_depot"]
    prix_depotclient = data["depot_client"]
    demande = data["quantite_client"]
    frais = data["cout_fixe"]

    pl9 = PL9(capacite_prod=capacite_prod,prix_usinedepot=prix_usinedepot,prix_depotclient=prix_depotclient,demande=demande,frais=frais)
    response = {
        "res9":pl9.run()
    }
    return jsonify(response)


if __name__ == '__main__':
    app.run()
