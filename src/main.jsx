import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChatProvider } from './Context/chatContext.jsx'
import { UserProvider } from './Context/userContext.jsx'
import { GroupProvider } from './Context/groupContext.jsx'
import { UtilityProvider } from './Context/utilityContext.jsx'
import { Analytics } from "@vercel/analytics/next"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ChatProvider>
        <GroupProvider>
          <UtilityProvider>
            <App/>
            <Analytics/>
          </UtilityProvider>
        </GroupProvider>
      </ChatProvider>
    </UserProvider>
  </StrictMode>
)
