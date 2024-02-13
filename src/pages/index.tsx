import Login from './Login'
import { useAppContext } from '../context/context'
import Profile from './Profile'

function Root() {
  const { user } = useAppContext()
  return (
    <div className="overflow-x-hidden">{user ? <Profile /> : <Login />}</div>
  )
}

export default Root
