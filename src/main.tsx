import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

if (import.meta.env.DEV) {
    void Promise.all([
        import('./data/validate'),
        import('./engine/selfTest'),
    ]).then(([{ logDataValidation }, { runEngineSelfTest }]) => {
        logDataValidation()
        runEngineSelfTest()
    })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
