# Kairos Summit

A React application built with modern best practices.

## Project Structure

```
kairosummit/
├── public/                 # Static files
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── services/           # API services
│   ├── context/            # React Context providers
│   ├── assets/             # Images, fonts, etc.
│   ├── styles/             # Global styles, themes
│   ├── constants/          # Constants and enums
│   ├── config/             # Configuration files
│   ├── App.js              # Main App component
│   ├── App.css             # App styles
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json
├── .gitignore
└── README.md
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Folder Descriptions

- **components/**: Reusable UI components (buttons, cards, modals, etc.)
- **pages/**: Page-level components that represent routes
- **hooks/**: Custom React hooks for shared logic
- **utils/**: Helper functions and utilities
- **services/**: API calls and external service integrations
- **context/**: React Context API for global state management
- **assets/**: Static assets like images, icons, fonts
- **styles/**: Global stylesheets, theme files, CSS modules
- **constants/**: Application constants, enums, configuration values
- **config/**: Configuration files for different environments
