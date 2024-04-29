from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from controllers.PL1 import PL1
from controllers.PL3 import PL3
from controllers.PL2 import PL2
from controllers.PL4 import BankBranchOptimization
from controllers.PL5 import PL5
# from controllers.PL6 import PL6
from controllers.PL6 import NetworkOptimization

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



    

# @app.route('/pl4', methods = ['POST'])
# @cross_origin()
# def pl4():
#     data = request.get_json()
#     A = data["A"]
#     population = data["population"]
#     num_regions = data["num_regions"]
#     B = data["B"]
#     K = data["K"]
#     D = data["D"]
#     a = data["a"]
#     b = data["b"]
#     c = data["c"]

#     pl4 = PL4(A=A, population=population, num_regions=num_regions, B=B, K=K, D=D, a=a, b=b, c=c)
#     response = {
#         "res4":pl4.run()
#     }
#     return jsonify(response)

@app.route('/pl4', methods=['POST'])
def pl4():
    data = request.get_json()

    try:
        # Extract required data from request
        budget = data['budget']
        cost_per_branch = data['cost_per_branch']
        populations = data['populations']
        adjacency_matrix = data['adjacency_matrix']
        branch_attractiveness = data['branch_attractiveness']
        branch_attractiveness_neighbors = data['branch_attractiveness_neighbors']

        # Create an instance of the BankBranchOptimization class
        optimizer = BankBranchOptimization(
            budget, 
            cost_per_branch, 
            populations, 
            adjacency_matrix, 
            branch_attractiveness, 
            branch_attractiveness_neighbors
        )
        
        # Find the optimal locations
        solution = optimizer.solve()

        # If a solution is found, return it
        if solution is not None:
            return jsonify({"optimal_locations": solution}), 200
        else:
            return jsonify({"error": "No optimal solution could be found."}), 404

    except KeyError as e:
        # If there is an error in the data format, return an error message
        return jsonify({"error": f"Missing key in the payload - {str(e)}"}), 400
    except Exception as e:
        # Catch all other errors
        return jsonify({"error": str(e)}), 500


@app.route('/pl5', methods = ['POST'])
@cross_origin()
def pl5():
    data = request.get_json()
    zone_data = data["zone_data"]
    pl5 = PL5(zone_data=zone_data)
    response = {
        "res5":pl5.run()
    }
    return jsonify(response)


# @app.route('/pl6', methods = ['POST'])
# @cross_origin()
# def pl6():
#     data = request.get_json()
#     nodes = data["nodes"]
#     arcs = data["arcs"]
#     durations = data["durations"]
#     start_node = data["start_node"]
#     end_node = data["end_node"]

#     pl6 = PL6.solve_shortest_path(nodes=nodes, arcs=arcs, durations=durations, start_node=start_node, end_node=end_node)
#     response = {
#         "res6":pl6
#     }
#     return jsonify(response)

@app.route('/pl6', methods=['POST'])
def pl6():
    data = request.get_json()

    try:
        links = [(link['source'], link['target']) for link in data['links']]
        # Ensure that times are also mapped correctly.
        times = {(link['source'], link['target']): link['time'] for link in data['links']}
    except KeyError as e:
        return jsonify({"error": f"Missing key in the payload - {str(e)}"}), 400

    network_optimization = NetworkOptimization(links=links, times=times)
    path = network_optimization.run()

    if path is None:
        return jsonify({"error": "No optimal path found"}), 404

    response = {
        "shortest_path": path
    }
    return jsonify(response)




if __name__ == '__main__':
    app.run()
