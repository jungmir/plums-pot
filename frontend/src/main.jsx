import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'antd/dist/reset.css'

const mock = async () => {
  const { worker } = await import("./mocks/worker");
  return worker.start();
}
mock().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})

