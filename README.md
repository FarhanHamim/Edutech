# Edutech - Online Course Registration Platform

Edutech is a user-friendly web application designed to streamline the online course selection and registration process. Users can browse through a variety of available courses.
**Live Link:** [https://assignment-6-edutech.netlify.app/](https://assignment-6-edutech.netlify.app/)

**GitHub Repository:** [https://github.com/FarhanHamim/Edutech](https://github.com/FarhanHamim/Edutech)

## Features

* **Browse Courses:** Displays a comprehensive list of available courses with details like:
    * Course Thumbnail/Image
    * Course Title
    * Short Description
* **Course Selection:** Users can click a "Select" button on each course card to add it to their registration list.
* **Responsive Design:** The application is designed to be accessible and functional across various devices, including desktops, tablets, and mobile phones.
* **User-Friendly Interface:** Clean and intuitive layout for easy navigation and interaction.
* **Toast Notifications:** Provides feedback to the user, for example, when a course is added or if a selection exceeds credit limits.

## Technologies Used

Based on inspection of the repository and common practices for such projects:

* **Frontend:**
    * **React:** (Vite + React template) for building the user interface components.
    * **JavaScript (ES6+):** Core programming language for interactivity.
    * **HTML5 & CSS3:** For structuring and styling the application.
    * **Tailwind CSS:** For utility-first CSS styling, enabling rapid UI development.
    * **DaisyUI (Possibly):** Often used with Tailwind CSS for pre-styled components.
* **Development Tools:**
    * **Vite:** Fast frontend build tool.
    * **ESLint:** For code linting and maintaining code quality.
* **Deployment:**
    * **Netlify:** The live version is hosted on Netlify.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18.x or later recommended) and npm (or yarn) installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/FarhanHamim/Edutech.git](https://github.com/FarhanHamim/Edutech.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd Edutech
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
    *(If you prefer yarn, you can use `yarn install`)*

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    *(If you prefer yarn, use `yarn dev`)*

    This will typically open the application in your default web browser at `http://localhost:5173` (the port might vary if 5173 is in use).

## Project Structure

The project follows a structure typical for Vite + React applications:

Edutech/
├── public/
│   └── courses.json  # Static data for courses
├── src/
│   ├── assets/       # Images and other static assets
│   ├── components/   # Reusable UI components (e.g., Card.jsx, Cart.jsx, Header.jsx)
│   ├── App.jsx       # Main application component
│   ├── main.jsx      # Entry point of the React application
│   └── index.css     # Global styles (often includes Tailwind imports)
├── .eslintrc.cjs     # ESLint configuration
├── .gitignore        # Specifies intentionally untracked files
├── index.html        # Main HTML file
├── package.json      # Project metadata and dependencies
├── postcss.config.js # PostCSS configuration (for Tailwind CSS)
├── tailwind.config.js# Tailwind CSS configuration
├── vite.config.js    # Vite configuration
└── README.md         # This file

## Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

## Author

* **Farhan Hamim**
    * GitHub: [https://github.com/FarhanHamim](https://github.com/FarhanHamim)

## License

This project is open source. Please refer to the `LICENSE` file in the repository if one is added. For now, it is under the repository owner's copyright.

## Acknowledgements

* The project was developed as part of an assignment.
* Inspiration from various EdTech platforms.
* Thanks to the creators of React, Vite, and Tailwind CSS.
