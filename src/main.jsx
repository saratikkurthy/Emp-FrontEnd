import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Auth0Provider } from '@auth0/auth0-react';
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,

//   <Auth0Provider
//   domain='dev-157onem08r66rd1p.us.auth0.com'
//   clientId='VgqEzUdJDrZI7nwjirYKnMuXjCGx7gu7'
//   authorizationParams={{ redirect_uri: window.location.origin }}>
//   <App />
// </Auth0Provider>
)
