import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { DagrThemeProvider } from './components/ThemeContext'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <DagrThemeProvider>
            <App />
        </DagrThemeProvider>
    </React.StrictMode>,
)
