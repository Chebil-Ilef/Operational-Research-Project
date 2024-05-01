import sys
from PyQt5.QtCore import Qt, QRegExp
from PyQt5.QtGui import QFont, QPalette, QBrush, QPixmap, QIntValidator, QIcon, QRegExpValidator
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QLineEdit, QPushButton, QVBoxLayout, QHBoxLayout, \
    QMessageBox, QMainWindow


def exit_program():
    QApplication.quit()


class Exercise4(QMainWindow):
    def __init__(self):
        super().__init__()
        self.input_boxes = []
        self.zone_data = []
        self.init_ui()

    def init_ui(self):
        self.setAutoFillBackground(True)
        palette = self.palette()
        palette.setBrush(QPalette.Window, QBrush(QPixmap("background_image.jpg").scaled(1024,1000)))
        self.setWindowIcon(QIcon("icon.png"))
        self.setPalette(palette)

        # Section 0: Grand Titre
        self.titre = QLabel("Positioning Problem :", self)
        self.titre.setFont(QFont("Roboto", 30, QFont.Bold))
        self.titre.setStyleSheet("color: #6AD4DD;")
        self.titre.setAlignment(Qt.AlignCenter)

        # Section 1: Description de l'exercice
        self.introduction = QLabel(
            " A telecommunications company specializing in mobile phones is newly installed in a country \n whose map is presented below.Emission antennas can be placed on sites A, ..., G \n located on the common borders of the different zones of the country.\n An antenna placed on a given site can cover the two zones whose common border houses this site.\n The company's goal is to ensure at the lowest cost the coverage of each zone\n with at least one antenna while covering zone 4 with at least two antennas.",
            self)
        self.introduction.setFont(QFont("Roboto", 12))
        self.introduction.setStyleSheet("color: white;")

        # Section 2: 3 lignes avec des Input Boxes
        petit_titre = ["The zone number", "Number of antennas required",
                       "The site that surrounds the zone"]

        # Create a widget to contain the rows
        self.widget = QWidget()

        # Layout for all rows
        main_layout = QVBoxLayout(self.widget)

        for i in range(3):
            # Layout for each row
            row_layout = QHBoxLayout()

            sentence_label = QLabel(f"{petit_titre[i]}: ")
            sentence_label.setFont(QFont("Roboto", 14))
            sentence_label.setStyleSheet("color: white;")

            input_box = QLineEdit(self)

            if i == 2:  # Configure input box for sites (The site that surrounds the zone)
                input_box.setMaxLength(20)  # Adjust the maximum length as needed
                input_box.setValidator(QRegExpValidator(QRegExp("^['A-G',]*$")))  # Allow only A-G and commas
            else:
                input_box.setMaxLength(3)
                input_box.setValidator(QIntValidator(1, 999))

            input_box.setMaximumWidth(150)  # Adjust the width as needed
            input_box.setAlignment(Qt.AlignCenter)

            self.input_boxes.append(input_box)

            row_layout.addWidget(sentence_label, alignment=Qt.AlignCenter)
            row_layout.addWidget(input_box, alignment=Qt.AlignCenter)

            main_layout.addLayout(row_layout)

        # Section 3: 3 Boutons
        self.solve_bouton = QPushButton("Solve", self)
        self.solve_bouton.setStyleSheet(
            "QPushButton { background-color: #F7418F; color: white; border: none; border-radius: 20px; font-size: 14pt; padding: 15px; }"
            "QPushButton:hover { background-color: #6AD4DD; }"
        )
        self.solve_bouton.setMaximumWidth(125)
        self.solve_bouton.clicked.connect(self.on_solve_clicked)

        self.add_zone_bouton = QPushButton("Add zone", self)
        self.add_zone_bouton.setStyleSheet(
            "QPushButton { background-color: #F7418F; color: white; border: none; border-radius: 20px; font-size: 14pt; padding: 15px; }"
            "QPushButton:hover { background-color: #6AD4DD; }"
        )
        self.add_zone_bouton.setMaximumWidth(150)
        self.add_zone_bouton.clicked.connect(self.on_add_zone_clicked)

        self.exit_button = QPushButton("Exit", self)
        self.exit_button.setFont(QFont("Arial", 16))
        self.exit_button.setStyleSheet(
            "QPushButton { background-color: #F7418F; color: white; border: none; border-radius: 20px; font-size: 14pt; padding: 15px; }"
            "QPushButton:hover { background-color: #6AD4DD; }"
        )
        self.exit_button.clicked.connect(exit_program)
        self.exit_button.setMaximumWidth(125)

        # Layout
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)
        layout.addWidget(self.titre)
        layout.addWidget(self.introduction)
        layout.addWidget(self.widget)
        button_layout = QHBoxLayout()
        button_layout.addWidget(self.add_zone_bouton)
        button_layout.addWidget(self.solve_bouton)
        button_layout.addWidget(self.exit_button)

        layout.addLayout(button_layout)

        self.setWindowIcon(QIcon("star.png"))
        self.setWindowTitle("PL5 - Exercise 5")
        self.resize(400, 600)

    def set_background_image(self, image_path):
        try:
            self.setAutoFillBackground(True)
            palette = self.palette()
            palette.setBrush(QPalette.Window, QBrush(QPixmap(image_path).scaled(self.size())))
            self.setPalette(palette)
            return True
        except Exception as e:
            print(f"Error loading background image: {e}")
            return False

    def on_add_zone_clicked(self):
        # Check if any input box is empty
        if any(input_box.text().strip() == '' for input_box in self.input_boxes):
            QMessageBox.warning(self, "Empty Input", "Please fill in all the input boxes.")
            return

        # Retrieve data from input boxes and construct the desired data structure
        zone_number = int(self.input_boxes[0].text())
        antennas_required = int(self.input_boxes[1].text())
        sites_surrounding = [site.strip("'") for site in self.input_boxes[2].text().split(',')]

        # Check if the zone number already exists
        if any(zone[1] == zone_number for zone in self.zone_data):
            QMessageBox.warning(self, "Duplicate Zone Number",
                                "Zone number already exists. Please choose a different zone number.")
        else:
            # Create a list representing the data structure
            zone_data_item = [sites_surrounding, zone_number, antennas_required]

            # Append the item to the main list
            self.zone_data.append(zone_data_item)

            # Clear input boxes
            for input_box in self.input_boxes:
                input_box.clear()

            # Print the resulting data structure (for demonstration purposes)
            print(self.zone_data)

    def on_solve_clicked(self):
        # Check if zone_data is empty
        if not self.zone_data:
            QMessageBox.warning(self, "Empty Zone", "Please add zones before solving.")
            return

        # Call the solve_coverage_problem method with zone_data
        from PL4 import solve_coverage_problem
        result = solve_coverage_problem(self.zone_data)
        self.zone_data = []
        if result is not None:
            # Display the result in a message box
            msg_box = QMessageBox(self)
            msg_box.setIcon(QMessageBox.Information)
            msg_box.setWindowTitle("Optimal Solution")
            msg_box.setText("Optimal Solution:\n")
            for entry in result:
                msg_box.setText(msg_box.text() + f"Site {entry['Site']}: Antenna = {entry['Antenna']}\n")
            msg_box.setIconPixmap(QPixmap("blue_icon.png"))  # Change to the path of your blue icon
            msg_box.setFixedSize(500, 300)
            msg_box.exec_()
        else:
                # Display a message box if there is no optimal solution
            QMessageBox.warning(self, "No Optimal Solution", "No optimal solution found.")

if __name__ == '__main__':
    app = QApplication(sys.argv)
    ex5_window = Exercise4()
    ex5_window.show()
    sys.exit(app.exec_())