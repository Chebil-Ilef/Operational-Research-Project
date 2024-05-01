import sys
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QFont, QPixmap, QPalette, QBrush, QIntValidator, QIcon
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel, QLineEdit, QPushButton, QVBoxLayout, QWidget, QMessageBox ,QHBoxLayout

def exit_program():
    app.quit()


class Exercise3(QMainWindow):
    def __init__(self):
        super().__init__()

        self.input_boxes = []

        self.init_ui()

    def init_ui(self):
        # Set the background image
        self.setAutoFillBackground(True)
        palette = self.palette()
        palette.setBrush(QPalette.Window, QBrush(QPixmap("background_image.jpg").scaled(1024,1000)))
        self.setPalette(palette)
        self.setWindowIcon(QIcon("icon.png"))

        # Big title "Enoncé"
        title_label = QLabel("Planify The Needs Of Human Ressources :")
        title_label.setFont(QFont("Roboto", 30))
        title_label.setStyleSheet("color: #6AD4DD;")

        # Exercise text
        exercise_text = " A post office has staffing needs for the seven days of the week.\n Determine the schedule that satisfies the office's needs with the minimum number of employees,\n knowing that each employee must work for five consecutive days before taking two days off"
        exercise_label = QLabel(exercise_text)

        exercise_label.setFont(QFont("Roboto", 12))
        exercise_label.setStyleSheet("color: white;")

        # Sentences and input boxes
        jours = ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday", "Sunday"]

        widget = QWidget()
        layout = QVBoxLayout(widget)

        for i in range(7):
            sentence_label = QLabel(f"the number of emplyoees of {jours[i]}: ")
            sentence_label.setFont(QFont("Roboto", 15))
            sentence_label.setStyleSheet("color: white;")

            input_box = QLineEdit(self)
            input_box.setMaxLength(3)
            input_box.setMaximumWidth(50)
            input_box.setAlignment(Qt.AlignCenter)
            input_box.setValidator(QIntValidator(1, 999))

            self.input_boxes.append(input_box)

            layout.addWidget(sentence_label, alignment=Qt.AlignCenter)
            layout.addWidget(input_box, alignment=Qt.AlignCenter)

        # Solve button with dark blue theme
        solve_button = QPushButton("Solve")
        solve_button.setStyleSheet(
            "QPushButton { background-color: #F7418F; color: white; border: none; border-radius: 10px; font-size: 10pt; padding: 11px; }"
            "QPushButton:hover { background-color: #6AD4DD; }"
        )
        solve_button.setMaximumWidth(150)
        solve_button.clicked.connect(self.solve_button_clicked)

        exit_button = QPushButton("Exit", self)
        exit_button.setFont(QFont("Arial", 16))
        exit_button.setStyleSheet(
            "QPushButton { background-color: #F7418F; color: white; border: none; border-radius: 10px; font-size: 10pt; padding: 11px; }"
            "QPushButton:hover { background-color: #6AD4DD; }"
        )
        exit_button.setMaximumWidth(150)
        exit_button.clicked.connect(exit_program)

         # Button layout: Solve and Exit buttons in a horizontal layout
        button_layout = QHBoxLayout()
        button_layout.addWidget(solve_button)
        button_layout.addWidget(exit_button)

        # Main layout with vertical alignment
        main_layout = QVBoxLayout()
        main_layout.addWidget(title_label, alignment=Qt.AlignCenter)
        main_layout.setSpacing(10)
        main_layout.addWidget(exercise_label, alignment=Qt.AlignCenter)
        main_layout.addWidget(widget, alignment=Qt.AlignCenter)
        main_layout.addLayout(button_layout)  # Add the button layout here
        main_layout.setContentsMargins(0, 0, 0, 0)



        # Set the main layout and window properties
        central_widget = QWidget()
        central_widget.setLayout(main_layout)
        self.setCentralWidget(central_widget)
        self.setWindowIcon(QIcon("star.png"))
        self.setWindowTitle("Exercise Solver")
        self.setGeometry(100, 100, 800, 600)
        self.show()


    def solve_button_clicked(self):
        # Check if all input boxes have values before proceeding
        for input_box in self.input_boxes:
            if not input_box.text():
                QMessageBox.warning(self, "Warning", "Please fill in all input boxes before solving.")
                return

        # Extract data from input boxes
        employee_numbers = [int(box.text()) for box in self.input_boxes]
        import PL3
        result , x1,x2,x3,x4,x5,x6,x7 = PL3.solve_linear_programming(employee_numbers)
        # Display the solution
        message = f"The minimum number of employees is {result}.\n\n"
        message += f"Number of employees for each day:\n"
        message += f"Monday: {x1}\n"
        message += f"Tuesday: {x2}\n"
        message += f"Wednesday: {x3}\n"
        message += f"Thrusday: {x4}\n"
        message += f"Friday: {x5}\n"
        message += f"Saturday: {x6}\n"
        message += f"Sunday: {x7}\n"
        QMessageBox.information(self, "Solution", message)


    def set_background_image(self, image_path):
        self.setAutoFillBackground(True)
        palette = self.palette()
        palette.setBrush(QPalette.Window, QBrush(QPixmap("Background_Image.jpg").scaled((1024,1000))))
        self.setPalette(palette)

if __name__ == '__main__':
    app = QApplication(sys.argv)
    ex3_window = Exercise3()
    ex3_window.show()
    sys.exit(app.exec())
