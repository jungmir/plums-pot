import { setupWorker } from 'msw/browser'
import { handlers } from './handlers.jsx'

export const worker = setupWorker(...handlers)
