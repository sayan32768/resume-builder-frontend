# Resume Builder App

A React-based Resume Builder application that allows users to create, edit, and preview resumes dynamically. Built with **React**, **React Hook Form**, and **Tailwind CSS** and **Shadcn**, it leverages dynamic form validation using **Zod** and provides a clean, print-ready resume preview.

## Features

- Create and edit resumes with multiple sections:
  - Personal details
  - Education
  - Skills
  - Professional experience
  - Projects
  - Other experience
  - Certifications

- Ability to choose between two resume designs
- Dynamic form validation using **Zod** schemas.
- Live resume preview that updates in real-time as the user edits.
- Supports multiple resumes per user.
- Responsive design using **Tailwind CSS**.
- Print-ready layout (A4 size).

## Technologies Used

- **React** - Frontend library for building UI.
- **React Hook Form** - For form state management.
- **Zod** - Schema-based form validation.
- **Tailwind CSS** - Utility-first CSS framework for styling.
- **Shadcn** - Component library for creating the forms and some other UI elements
- **JavaScript (ES6+)** - Core programming language.

## Project Structure

```
src/
├─ api/
├─ assets/
├─ components/
| ├─ common/
| | └─ ... (various reusable UI components)
│ ├─ forms/
| |  └─ ... (All form components)
│ ├─ ui/
│ |  └─ ... (shadcn components)
├─ contexts/
| ├─ UserContext.jsx
├─ pages/
│ └─ ... (Has all the pages)
├─ schemas/
│ ├─ personal.schema.js
│ ├─ education.schema.js
│ ├─ skills.schema.js
│ ├─ professional.schema.js
│ ├─ project.schema.js
│ ├─ certification.schema.js
│ └─ resume.schema.js
├─ App.jsx
├─ main.jsx
├─ .env
└─ index.css
```


- **components/**: Contains UI components like resume previews and form elements.
- **schemas/**: Contains Zod validation schemas for each section of the resume.
- **contexts/**: Context for persisting auth state
- **pages/**: Contains all the pages of this application.
- **App.jsx**: Main application container (has react router dom setup).
- **main.jsx**: Entry point for rendering React app.

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sayan32768/resume-builder-frontend.git
cd resume-builder-frontend
```

2. Install dependencies:

```bash
npm install
```  
or

```bash
yarn
```

3. Start the development server:

```bash
npm run dev
```  
or 

```bash
yarn dev
```

Open `http://localhost:5173` (or the port Vite provides) in your browser.

## Usage

- Fill out the form fields for personal details, education, experience, projects, certifications, and skills.
- The resume preview updates in real-time as you input data.
- Use the print functionality of your browser to save the resume as a PDF.
- Has seperate backend configurations to download a PDF directly as well.

## Folder Conventions

- **components/**: All UI components.
- **schemas/**: Zod validation schemas for each form section.
- **assets/**: Any images, icons, or static files.
- **pages/**: Contains all the pages of this application.


## Environment Variables

This project uses environment variables for configuration.  

1. Create a `.env` file in the root of the project.  
2. Copy the following content into `.env`
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
3. Restart the development server after updating `.env`.

> **Note:** All environment variables in Vite must start with `VITE_`.  
> **Important:** Never commit `.env` with sensitive data to GitHub.


## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a Pull Request.
