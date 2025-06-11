import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChatProvider } from './Context/chatContext.jsx'
import { UserProvider } from './Context/userContext.jsx'
import { GroupProvider } from './Context/groupContext.jsx'
import { UtilityProvider } from './Context/utilityContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ChatProvider>
        <GroupProvider>
          <UtilityProvider>
            <App/>
          </UtilityProvider>
        </GroupProvider>
      </ChatProvider>
    </UserProvider>
  </StrictMode>
)
