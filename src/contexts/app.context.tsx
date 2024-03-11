// import { createContext, useState } from 'react'
// import { getAccessTokenFromLS } from '~/utils'

// interface AppContextInterface {
//   isAuthenticated: boolean
//   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
//   reset: () => void
// }

// const initialValueAppContext: AppContextInterface = {
//   isAuthenticated: Boolean(getAccessTokenFromLS()),
//   setIsAuthenticated: () => null,
//   reset: () => null
// }
// export const AppContext = createContext<AppContextInterface>(initialValueAppContext)
// export const AppProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialValueAppContext.isAuthenticated)

//   const reset = () => {
//     setIsAuthenticated(false)
//   }
//   const value = {
//     isAuthenticated,
//     setIsAuthenticated
//   }
//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>
// }
