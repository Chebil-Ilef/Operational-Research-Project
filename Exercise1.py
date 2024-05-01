import sys
import PL1
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QFont, QPalette, QBrush, QPixmap, QIcon
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QTableWidget, QSpinBox, QPushButton, \
    QVBoxLayout, QHBoxLayout, QMainWindow, QMessageBox


def exit_program():
    app.quit()

class Exercise1(QMainWindow):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        self.setAutoFillBackground(True)
        palette = self.palette()
        palette.setBrush(QPalette.Window, QBrush(QPixmap("background_image.jpg").scaled(1024,1000)))
        self.setPalette(palette)
        self.setWindowIcon(QIcon("icon.png"))
        self.setPalette(palette)
        # Section 1: Titre
        self.titre = QLabel("Optimise Agriculture Zone :", self)
        self.titre.setFont(QFont("Roboto", 20, QFont.Bold))
        self.titre.setStyleSheet("color: #6AD4DD;")
        self.titre.setAlignment(Qt.AlignCenter)

        # Section 2: Introduction et tableau
        self.introduction = QLabel(" The Tunisian state wants to develop an agricultural area of 1000 hectares where five crops are potentially possible \n wheat, barley, corn, sugar beet, and sunflower. We have the following data on these five crops")
        self.introduction.setFont(QFont("Roboto", 10))
        self.introduction.setStyleSheet("color: white;")
        self.tableau = QTableWidget(7, 5)
        self.tableau.setHorizontalHeaderLabels(["Ble", "Orge", "Mais", "Bet-Sucre", "Tournesol"])
        self.tableau.setVerticalHeaderLabels(["Rendement Q/ha", "Prix de vente UM/Q", "M.O.Ouvriers/ha", "Temps machine H/ha", "Eau m3/ha", "Salaire annuel/ouvrier", "Frais fixe de gestion"])

        for i in range(7):
            for j in range(5):
                spin_box = QSpinBox(self)
                spin_box.setRange(0, 999999)  # Set the range according to your needs
                self.tableau.setCellWidget(i, j, spin_box)

        # Section 3: Champs de saisie
        self.ligne1 = QLabel("Main d’œuvre(nb_ouvries) :")
        self.ligne1.setFont(QFont("Roboto", 10))
        self.ligne1.setStyleSheet("color: white;")
        self.saisie1 = QSpinBox(self)
        self.saisie1.setMaximumWidth(100)
        self.saisie1.setAlignment(Qt.AlignCenter)
        self.ligne2 = QLabel("Eau d’irrigation(m3):")
        self.ligne2.setFont(QFont("Roboto", 10))
        self.ligne2.setStyleSheet("color: white;")
        self.saisie2 = QSpinBox(self)
        self.saisie2.setMaximumWidth(100)
        self.saisie2.setAlignment(Qt.AlignCenter)
        self.ligne3 = QLabel("Heures machine(heures machine) :")
        self.ligne3.setFont(QFont("Roboto", 10))
        self.ligne3.setStyleSheet("color: white;")
        self.saisie3 = QSpinBox(self)
        self.saisie3.setMaximumWidth(100)
        self.saisie3.setAlignment(Qt.AlignCenter)
        self.ligne4 = QLabel("Cout Main :")
        self.ligne4.setFont(QFont("Roboto", 10))
        self.ligne4.setStyleSheet("color: white;")
        self.saisie4 = QSpinBox(self)
        self.saisie4.setMaximumWidth(100)
        self.saisie4.setAlignment(Qt.AlignCenter)
        self.ligne5= QLabel("cout Eau:")
        self.ligne5.setFont(QFont("Roboto", 10))
        self.ligne5.setStyleSheet("color: white;")
        self.saisie5 = QSpinBox(self)
        self.saisie5.setMaximumWidth(100)
        self.saisie5.setAlignment(Qt.AlignCenter)

        # Section 4: Bouton
        self.bouton = QPushButton("Solve", self)
        self.bouton.setStyleSheet(
            "QPushButton { background-color: #F7418F; color: white; border: none; border-radius: 10px; font-size: 10pt; padding: 11px; }"
            "QPushButton:hover { background-color: #6AD4DD; }"
        )
        self.bouton.setMaximumWidth(150)
        self.bouton.clicked.connect(self.solve)

        self.exit_button = QPushButton("Exit", self)
        self.exit_button.setFont(QFont("Arial", 16))
        self.exit_button.setStyleSheet(
            "QPushButton { background-color: #F7418F; color: white; border: none; border-radius: 10px; font-size: 10pt; padding: 11px; }"
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
        layout.setSpacing(5)

        button_layout = QHBoxLayout()
        button_layout.addWidget(self.bouton)
        button_layout.addWidget(self.exit_button)

        layout.addLayout(button_layout)

        self.setWindowIcon(QIcon("star.png"))
        self.setWindowTitle("PL1")
        self.resize(800, 700)

    def set_background_image(self, image_path):
        self.setAutoFillBackground(True)
        palette = self.palette()
        palette.setBrush(QPalette.Window, QBrush(QPixmap("Background_Image.jpg").scaled(self.size())))
        self.setPalette(palette)

    def get_tableau_values(self):
        # Itère à travers le tableau et récupère les valeurs des cellules
        tableau_values = {}
        for i in range(7):
            for j in range(5):
                spin_box = self.tableau.cellWidget(i, j)
                if spin_box is not None:
                    key = (self.tableau.verticalHeaderItem(i).text(), self.tableau.horizontalHeaderItem(j).text())
                    tableau_values[key] = spin_box.value()
        return tableau_values

    def get_saisie_values(self):
        # Récupère les valeurs des saisies
        saisie_values = [self.saisie1.value(), self.saisie2.value(), self.saisie3.value(),self.saisie4.value(),self.saisie5.value()]
        return saisie_values

    def solve(self):
        t=self.get_tableau_values()
        s=self.get_saisie_values()
        print(t,s)
        results = PL1.solve_optimization(t,s)
        print(results)
         #Display the solution
        message = f"The minimum number of employees needed is {results}"
        QMessageBox.information(self, "Solution", message)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    ex1_window = Exercise1()
    ex1_window.show()
    sys.exit(app.exec_())
