import React, { createContext, useContext } from 'react'
import { initializeApp } from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirestore, Firestore } from 'firebase/firestore/lite'
import { getAuth, Auth, User } from 'firebase/auth'
export type ContextType = {
  auth: Auth
  user: User
  db: Firestore
}
const AppContext = createContext<ContextType>({} as ContextType)

const ContextProvider = ({ children }: React.PropsWithChildren) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyBmQMNsLvK-ND4EIt59-nJUCalTvvnCmp0',
    authDomain: 'food-e112d.firebaseapp.com',
    databaseURL: 'https://food-e112d.firebaseio.com',
    projectId: 'food-e112d',
    storageBucket: 'food-e112d.appspot.com',
    messagingSenderId: '506439537853',
    appId: '1:506439537853:web:fa2b282fa32810d91ad3d4',
  }
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  auth.useDeviceLanguage()
  const db = getFirestore(app)
  const [user] = useAuthState(auth)
  return (
    <AppContext.Provider
      value={{
        auth,
        user,
        db,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () => useContext(AppContext)
export default ContextProvider
