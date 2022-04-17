import App from './App'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import './util.css'

const container = document.getElementById('app') as HTMLElement
const root = createRoot(container)

root.render(<App />)
