import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel, QPushButton, QVBoxLayout, QWidget , QStackedWidget
from PyQt5.QtGui import QPixmap, QFont , QPalette, QBrush 
from PyQt5.QtCore import Qt
from PyQt5 import QtGui


def exit_program():
    app.quit()

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowIcon(QtGui.QIcon('icon.png'))
        self.setWindowTitle("Linear Programming Exercises - GL3")

        # Set window size and position
        window_width = 800
        window_height = 600
        screen_geometry = app.primaryScreen().geometry()
        x_coordinate = int((screen_geometry.width() / 2) - (window_width / 2))
        y_coordinate = int((screen_geometry.height() / 2) - (window_height / 2))
        self.setGeometry(x_coordinate, y_coordinate, window_width, window_height)

        # Apply background image to window using stylesheet
        self.setAutoFillBackground(True)
        palette = self.palette()
        palette.setBrush(QPalette.Window, QBrush(QPixmap("background_image.jpg").scaled(1024,1000)))
        self.setPalette(palette)

        # Project Name in the middle at the top
        self.project_name = QLabel("Operational Research Project", self)
        self.project_name.setStyleSheet("color: #6AD4DD;")
        self.project_name.setFont(QFont("Montserrat", 30, QFont.Bold))
        self.project_name.setAlignment(Qt.AlignCenter)

        # Description of the project
        self.project_description = QLabel("This project is a set of PL and PLNE problems programmed with python.\n In each problem, you can customize the inputs and receive the optimized results", self)
        self.project_description.setFont(QFont("Montserrat", 15))
        self.project_description.setStyleSheet("color: white;")
        self.project_description.setAlignment(Qt.AlignCenter)

        # Layout to contain exercise buttons
        self.exercise_layout = QVBoxLayout()
        self.exercise_frame = QWidget(self)
        self.exercise_frame.setLayout(self.exercise_layout)
        self.exercise_layout.setAlignment(Qt.AlignHCenter)

        # Function to handle exercise selection

        # Example buttons for exercises
        exercise_names = [
    "PL 1: Optimise Agriculture Zone",
    "PL 2: Manage Production Of A Company",
    "PL 3: Planify The Needs Of Human Ressources",
    "PLNE 1: Choice Of Bank Agencies Implementation",
    "PLNE 2: Positioning Problem",
    "PLNE 3: Network Flow Problem",
    ]
        for exercise_name in exercise_names:
            exercise_button = QPushButton(exercise_name, self)
            exercise_button.setFont(QFont("Montserrat", 12))
            exercise_button.setStyleSheet("background-color: white; color: black; border: 1px solid white ; border-radius: 10px ; active {background-color: #FF4949;}")
            exercise_button.setFixedSize(600, 40)
            exercise_button.clicked.connect(lambda checked, btn=exercise_button: self.select_exercise(btn))
            self.exercise_layout.addWidget(exercise_button)

        # Arrange buttons in 3 rows at the center
        self.exercise_layout.addStretch()
        self.exercise_layout.addStretch()
        self.exercise_layout.addStretch()

        # Exit Button
        self.exit_button = QPushButton("EXIT", self)
        self.exit_button.setFont(QFont("Montserrat", 16))
        self.exit_button.setFixedSize(100, 40)
        self.exit_button.setStyleSheet("background-color: #6AD4DD; color: white; border: 1px solid white ; border-radius: 10px; active {background-color: #FF4949;}")
        self.exit_button.clicked.connect(exit_program)

        exit_layout = QVBoxLayout()  # Create a layout for the exit button
        exit_layout.addWidget(self.exit_button)
        exit_layout.setAlignment(Qt.AlignCenter)  

        # Collaborators listed under each other
        self.collaborators = QLabel("Group Members:\n Olfa Medimegh   Asma ElHaj \n Samer Mansouri   Chebil Ilef", self)
        self.collaborators.setFont(QFont("Montserrat", 12))
        self.collaborators.setStyleSheet("color: White;")
        self.collaborators.setAlignment(Qt.AlignCenter)  # Center-align the collaborators


        # Arrange widgets
        central_widget = QWidget()
        layout = QVBoxLayout(central_widget)
        layout.addWidget(self.project_name)
        layout.addWidget(self.project_description)
        layout.addWidget(self.exercise_frame)
        layout.addLayout(exit_layout)
        layout.addWidget(self.collaborators)
        self.setCentralWidget(central_widget)


    def select_exercise(self, exercise_button):
        case = exercise_button.text()
        if case == "PL 1: Optimise Agriculture Zone":
            from Exercise1 import Exercise1
            self.exercice1 = Exercise1()
            self.exercice1.show()
        elif case == "PL 2: Manage Production Of A Company":
            from Exercise2 import Exercise2
            self.exercise2 = Exercise2()
            self.exercise2.show()
        elif case == "PL 3: Planify The Needs Of Human Ressources":
            from Exercise3 import Exercise3
            self.exercise3 = Exercise3()
            self.exercise3.show()
        elif case == "PLNE 1: Choice Of Bank Agencies Implementation":
            from Exercise4 import Exercise4
            self.Exercise4 = Exercise4()
            self.Exercise4.show()
        elif case == "PLNE 2: Positioning Problem":
            from Exercise5 import Exercise5
            self.exercise5 = Exercise5()
            self.exercise5.show()
        elif case == "PLNE 3: Network Flow Problem":
            from Exercise6 import Exercise6
            self.exercise6 = Exercise6()
            self.exercise6.show()
        else:
            pass
 

if __name__ == "__main__":
    app = QApplication(sys.argv)
    main_window = MainWindow()
    main_window.show()
    sys.exit(app.exec_())
