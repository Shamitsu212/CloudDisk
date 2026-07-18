import { createRoot } from 'react-dom/client'

import './index.css'
import './assets/theme/theme.css'
import './assets/fonts/fonts.css'

import { Provider } from 'react-redux'
import { store } from './app/store/store.ts'

import App from './app/App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(

  <BrowserRouter>

    <Provider store={store}>
      <App />
    </Provider>

  </BrowserRouter>
  
)
