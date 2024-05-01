import sys
import PL1
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QFont, QPalette, QBrush, QPixmap, QIcon
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QTableWidget, QSpinBox, QPushButton, \
    QVBoxLayout, QHBoxLayout, QMainWindow, QMessageBox


def exit_program():
    app.quit()

class Exercise4(QMainWindow):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        self.setAutoFillBackground(True)
        palette = self.palette()
        palette.setBrush(QPalette.Window, QBrush(QPixmap("background_image.jpg").scaled(1024,1000)))
        self.setWindowIcon(QIcon("icon.png"))
        self.setPalette(palette)

        # Section 1: Titre
        self.titre = QLabel("Choice Of Bank Agencies Implementation :", self)
        self.titre.setFont(QFont("Roboto", 20, QFont.Bold))
        self.titre.setStyleSheet("color: #6AD4DD;")
        self.titre.setAlignment(Qt.AlignCenter)

        # Section 2: Introduction et tableau
        self.introduction = QLabel("A bank with a budget of B dinars is looking to determine the optimal location of new branches and DAB servers to open in January 2006.\n The investment is K dinars per branch, and D dinars per DAB server.\n Nine regions are under consideration. In each region, there can be at most one branch.\n By opening an agency in region Ri, the bank will gain a number of customers equal to a% of the population of region Ri and b% of the population of neighboring regions.\n A DAB server in region Ri will gain a number of customers equal to c% of the population of region Ri.\n The matrix A = (aij) i = 1, ..., 9 and j = 1, ..., 9 gives for each region the neighboring regions (1 if neighboring regions, 0 otherwise)")
        self.introduction.setFont(QFont("Roboto", 10))
        self.introduction.setStyleSheet("color: white;")
        self.tableau = QTableWidget(11, 10)
        self.tableau.setHorizontalHeaderLabels(["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10"])
        self.tableau.setVerticalHeaderLabels(["Nombre de Population", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10"])

        for i in range(11):
            for j in range(10):
             if i==0:
                spin_box = QSpinBox(self)
                spin_box.setRange(0, 900)  # Set the range according to your needs
                self.tableau.setCellWidget(i, j, spin_box)
             else:
                spin_box = QSpinBox(self)
                spin_box.setRange(0, 1)  # Set the range according to your needs
                self.tableau.setCellWidget(i, j, spin_box)

        # Section 3: Champs de saisie
        self.ligne1 = QLabel("Nombre de regions :")
        self.ligne1.setFont(QFont("Roboto", 10))
        self.ligne1.setStyleSheet("color: white;")
        self.saisie1 = QSpinBox(self)
        self.saisie1.setMaximumWidth(100)
        self.saisie1.setRange(0,10)
        self.saisie1.setAlignment(Qt.AlignCenter)
        self.ligne2 = QLabel("Budget total:")
        self.ligne2.setFont(QFont("Roboto", 10))
        self.ligne2.setStyleSheet("color: white;")
        self.saisie2 = QSpinBox(self)
        self.saisie2.setMaximumWidth(100)
        self.saisie2.setRange(0,99999999)
        self.saisie2.setAlignment(Qt.AlignCenter)
        self.ligne3 = QLabel("Cout douverture agence :")
        self.ligne3.setFont(QFont("Roboto", 10))
        self.ligne3.setStyleSheet("color: white;")
        self.saisie3 = QSpinBox(self)
        self.saisie3.setRange(0, 9999999)
        self.saisie3.setMaximumWidth(100)
        self.saisie3.setAlignment(Qt.AlignCenter)
        self.ligne4 = QLabel("Cout douverture DAB:")
        self.ligne4.setFont(QFont("Roboto", 10))
        self.ligne4.setStyleSheet("color: white;")
        self.saisie4 = QSpinBox(self)
        self.saisie4.setMaximumWidth(100)
        self.saisie4.setRange(0, 99999999)
        self.saisie4.setAlignment(Qt.AlignCenter)
        self.ligne5= QLabel("%Pop regions agence")
        self.ligne5.setFont(QFont("Roboto", 10))
        self.ligne5.setStyleSheet("color: white;")
        self.saisie5 = QSpinBox(self)
        self.saisie5.setRange(0, 100)
        self.saisie5.setMaximumWidth(100)
        self.saisie5.setAlignment(Qt.AlignCenter)
        self.ligne6 = QLabel("%Pop regions voisins")
        self.ligne6.setFont(QFont("Roboto", 10))
        self.ligne6.setStyleSheet("color: white;")
        self.saisie6 = QSpinBox(self)
        self.saisie6.setMaximumWidth(100)
        self.saisie6.setRange(0, 100)
        self.saisie6.setAlignment(Qt.AlignCenter)
        self.ligne7 = QLabel("%Pop DAB")
        self.ligne7.setFont(QFont("Roboto", 10))
        self.ligne7.setStyleSheet("color: white;")
        self.saisie7 = QSpinBox(self)
        self.saisie7.setMaximumWidth(100)
        self.saisie7.setRange(0, 100)
        self.saisie7.setAlignment(Qt.AlignCenter)

        # Section 4: Bouton
        self.bouton = QPushButton("Solve", self)
        self.bouton.setStyleSheet(
            "QPushButton { background-color: #F7418F; color: white; border: none; border-radius: 20px; font-size: 14pt; padding: 15px; }"
            "QPushButton:hover { background-color: #6AD4DD; }"
        )
        self.bouton.setMaximumWidth(150)
        self.bouton.clicked.connect(self.solve)

        self.exit_button = QPushButton("Exit", self)
        self.exit_button.setFont(QFont("Arial", 16))
        self.exit_button.setStyleSheet(
            "QPushButton { background-color: #F7418F; color: white; border: none; border-radius: 20px; font-size: 14pt; padding: 15px; }"
            "QPushButton:hover { background-color: #6AD4DD; }"
        )
        self.exit_button.clicked.connect(exit_program)
        self.exit_button.setMaximumWidth(150)

        # Mise en page
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)
        layout.addWidget(self.titre)
        layout.addWidget(self.introduction)
        layout.addWidget(self.tableau)
        layout.addWidget(self.ligne1, alignment=Qt.AlignCenter)
        layout.addWidget(self.saisie1, alignment=Qt.AlignCenter)
        layout.addWidget(self.ligne2, alignment=Qt.AlignCenter)
        layout.addWidget(self.saisie2, alignment=Qt.AlignCenter)
        layout.addWidget(self.ligne3, alignment=Qt.AlignCenter)
        layout.addWidget(self.saisie3, alignment=Qt.AlignCenter)
        layout.addWidget(self.ligne4, alignment=Qt.AlignCenter)
        layout.addWidget(self.saisie4, alignment=Qt.AlignCenter)
        layout.addWidget(self.ligne5, alignment=Qt.AlignCenter)
        layout.addWidget(self.saisie5, alignment=Qt.AlignCenter)
        layout.addWidget(self.ligne6, alignment=Qt.AlignCenter)
        layout.addWidget(self.saisie6, alignment=Qt.AlignCenter)
        layout.addWidget(self.ligne7, alignment=Qt.AlignCenter)
        layout.addWidget(self.saisie7, alignment=Qt.AlignCenter)
        layout.setSpacing(5)

        button_layout = QHBoxLayout()
        button_layout.addWidget(self.bouton)
        button_layout.addWidget(self.exit_button)

        layout.addLayout(button_layout)

        self.setWindowIcon(QIcon("star.png"))
        self.setWindowTitle("PL1")
        self.resize(1000, 900)

    def set_background_image(self, image_path):
        self.setAutoFillBackground(True)
        palette = self.palette()
        palette.setBrush(QPalette.Window, QBrush(QPixmap("Background_Image.jpg").scaled(self.size())))
        self.setPalette(palette)

    def get_tableau_values(self):
        # Itère à travers le tableau et récupère les valeurs des cellules
        tableau_values = {}
        pop = {}
        for i in range(11):
            for j in range(10):
                spin_box = self.tableau.cellWidget(i, j)
                if i==0:
                    key = (self.tableau.verticalHeaderItem(i).text(), self.tableau.horizontalHeaderItem(j).text())
                    pop[key] = spin_box.value()

                elif spin_box is not None:
                    key = (self.tableau.verticalHeaderItem(i).text(), self.tableau.horizontalHeaderItem(j).text())
                    tableau_values[key] = spin_box.value()
        return tableau_values,pop

    def get_saisie_values(self):
        # Récupère les valeurs des saisies
        saisie_values = [self.saisie1.value(), self.saisie2.value(), self.saisie3.value(),self.saisie4.value(),self.saisie5.value(),self.saisie6.value(),self.saisie7.value()]
        return saisie_values

    def solve(self):
        try:
            # Extract data from input boxes and table
            nb_reg = self.get_saisie_values()[0]
            A, pop = self.get_tableau_values()
            liste = self.get_saisie_values()

            # Get the first 'nb_reg' elements from 'pop'
            nb_premiers_pop = dict(list(pop.items())[:nb_reg])

            # Get the first 'nb_reg' elements from each row of 'A'
            nb_premiers_A = {key: A[key] for key in list(A.keys())[:nb_reg]}

            print(nb_premiers_pop, "***", nb_premiers_A, "****", liste)

            # Call PL4.solve_optimization with the correct parameters
            import PL4
            results = PL4.solve_optimization(nb_premiers_A, nb_premiers_pop, nb_reg, liste[1], liste[2], liste[3],
                                             liste[4], liste[5], liste[6])

            # Display the solution
            message = f"The optimal solution is {results}"
            QMessageBox.information(self, "Solution", message)

        except Exception as e:
            # Handle exceptions, display an error message if needed
            print(f"Error in solve method: {e}")
            QMessageBox.warning(self, "Error", "An error occurred during the optimization process.")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    ex1_window = Exercise4()
    ex1_window.show()
    sys.exit(app.exec_())
