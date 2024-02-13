import { useAppContext } from '../context/context'
function Header() {
  const { auth, user } = useAppContext()
  return (
    <div className="flex justify-end dark:bg-primary-900 bg-slate-200 py-6 px-4 mb-5">
      <div className="flex items-center space-x-4">
        <p>Welcome, {user?.displayName || user?.phoneNumber}</p>
        <button onClick={() => auth.signOut()}>Logout</button>
      </div>
    </div>
  )
}

export default Header
