import './App.css'
import ContextProvider from './context/context'
import Root from './pages'
function App() {
  return (
    <ContextProvider>
      <Root />
    </ContextProvider>
  )
}

export default App
