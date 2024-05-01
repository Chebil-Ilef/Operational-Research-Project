import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel, QPushButton, QVBoxLayout, QWidget, QLineEdit, QHBoxLayout  ,QMessageBox
from PyQt5.QtGui import QFont, QPalette, QBrush, QPixmap, QDoubleValidator, QIntValidator ,QIcon ,QValidator 
from PyQt5.QtCore import Qt

def exit_program():
    app.quit()

class Exercise2(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Manage Production of a Company")
        self.setGeometry(100, 100, 800, 600)
        
        # Apply background image to window using stylesheet
        self.setAutoFillBackground(True)
        palette = self.palette()
        palette.setBrush(QPalette.Window, QBrush(QPixmap("background_image.jpg").scaled(1024,1000)))
        self.setPalette(palette)

        self.setWindowIcon(QIcon("icon.png"))

        # Title label
        title_label = QLabel("Manage Production of a Company", self)
        title_label.setFont(QFont("Arial", 30, QFont.Bold))
        title_label.setStyleSheet("color: #6AD4DD;")
        title_label.setAlignment(Qt.AlignCenter)

        # Wording label
        wording_label = QLabel("Manage Production Of A Company: \n Determine the optimal production schedule and the best policy for managing the workforce \n by Determining for how long you will be working,staff salary ,Supp hours   \n Working cost ,initial staff , working hours , hours per product ... \n you should only enter secussive months ", self)
        wording_label.setFont(QFont("Arial", 15))
        wording_label.setStyleSheet("color: white;")
        wording_label.setAlignment(Qt.AlignCenter)

        # Content widget to hold the input fields
        content_widget = QWidget()
        content_layout = QVBoxLayout(content_widget)

        # Add title and wording labels to content layout
        content_layout.addWidget(title_label)
        content_layout.addWidget(wording_label)

        # Add your labels and line edits here...
        input_labels = [
            "Months 1", "Months 2", "Months 3", "Months 4", "Months 5", "Months 6", "Months 7", "Months 8",
            "Months 9", "Months 10", "Months 11", "Months 12",
            "Stock", "Initial Employee Number", "Salary of Employee",
            "Employee Hours/M", "Max Supp Hours",
            "Price of Supp Hour", "Hours for pair",
            "Price of one pair prod", "Recruitment Fees", "Licensing Fees",
            "Stocking Fees"
        ]

        rows = len(input_labels) // 2 + len(input_labels) % 2

        for row in range(rows):
            hbox = QHBoxLayout()
            for column in range(2):
                index = row * 2 + column
                if index < len(input_labels):
                    label = QLabel(input_labels[index]+ ":", self)
                    label.setFont(QFont("Arial", 12))
                    label.setStyleSheet("color: white;")
                    line_edit = QLineEdit(self)
                    line_edit.setObjectName(input_labels[index].strip())
                    line_edit.setFixedSize(200, 25)

                    # Set validator for line edit fields to accept only integers or floats
                    if "Number" in input_labels[index] or "Price" in input_labels[index]:
                        line_edit.setValidator(QDoubleValidator())
                    else:
                        line_edit.setValidator(QIntValidator())

                    hbox.addWidget(label)
                    hbox.addWidget(line_edit)

            content_layout.addLayout(hbox)

        # Set the content widget as the central widget
        self.setCentralWidget(content_widget)

        # Exit Button
        exit_button = QPushButton("Exit", self)
        exit_button.setFont(QFont("Arial", 16))
        exit_button.setStyleSheet(
            "QPushButton { background-color: #F7418F; color: white; border: none; border-radius: 20px; font-size: 14pt; padding: 15px; }"
            "QPushButton:hover { background-color: #6AD4DD; }"
        )
        exit_button.clicked.connect(exit_program)

        # Solve Button
        solve_button = QPushButton("Solve", self)
        solve_button.setFont(QFont("Arial", 16))
        solve_button.setStyleSheet(
            "QPushButton { background-color: #F7418F; color: white; border: none; border-radius: 20px; font-size: 14pt; padding: 15px; }"
            "QPushButton:hover { background-color: #6AD4DD; }"
        )
        # Connect solve_button to a solve function if needed
        solve_button.clicked.connect(self.solve_button_clicked)

        # Layout for exit and solve buttons
        buttons_layout = QHBoxLayout()
        buttons_layout.addWidget(solve_button)
        buttons_layout.addWidget(exit_button)
        buttons_layout.setAlignment(Qt.AlignCenter)

        # Add buttons layout to the content widget

        content_layout.addLayout(buttons_layout)

        default_values = {
            "Months 1": "3000", "Months 2": "5000", "Months 3": "2000", "Months 4": "1000",
            "Stock": "500", "Initial Employee Number": "100", "Salary of Employee": "1500",
            "Employee Hours/M": "160", "Max Supp Hours": "20", "Price of Supp Hour": "13",
            "Hours for pair": "4", "Price of one pair prod": "15", "Recruitment Fees": "1600",
            "Licensing Fees": "2000", "Stocking Fees": "3"
        }

        line_edits = self.findChildren(QLineEdit)
        for line_edit in line_edits:
            objectName = line_edit.objectName()
            # Set default value if exists
            default_value = default_values.get(objectName)
            if default_value:
                line_edit.setText(default_value)
                
    def get_input_values(self):
        input_values = {}
        line_edits = self.findChildren(QLineEdit)
        for line_edit in line_edits:
            objectName = line_edit.objectName()
            input_values[objectName] = line_edit.text()
        return input_values
        
    def solve_button_clicked(self):
        input_values = self.get_input_values()
        months_demand = {}
        # Extract month-wise demand values from the input3
        for month_index in range(1, 13):
            key = f"Months {month_index}"
            value = input_values.get(key, 0)  # Assuming default demand is 0 if not entered
            if value != 0  and len(value) != 0:
                months_demand[month_index - 1] =int(value)  # Adjust month index to start from 0
        
        import PL2
        # Call the method to solve optimization with collected inputs
        result , dict = PL2.solve_optimization( input_values, months_demand)
        # Prepare the message to be shown in the message box
        message = f"Optimized Profit is : {result}\n"
        message += "Decision Variables:\n"
        for key, value in dict.items():
            message += f"{key}: {value[0]}\n"
        # Show the result in a message box
        QMessageBox.information(self, "Optimized Value", message)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    ex2_window = Exercise2()
    ex2_window.show()
    sys.exit(app.exec_())