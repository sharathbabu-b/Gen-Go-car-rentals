
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import carStore from "./configureStore/store.jsx"
import {Provider} from "react-redux"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 
    <Provider store={carStore}>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </Provider>
)
