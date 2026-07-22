import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import './Components/Header/Header.css'
import './Components/Footer/Footer.css'
import './Components/Cookies/Cookies.css'
import './Pages/Home/Home.css'
import './Pages/Watches/Watches.css'
import './Pages/ProductPage/ProductPage.css'
import './Pages/Registration/Registration.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)