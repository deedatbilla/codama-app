import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/context'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { collection, getDoc, setDoc, doc } from 'firebase/firestore/lite'
import Header from '../components/Header'
import { updateProfile } from 'firebase/auth'
function Profile() {
  const { db, user, auth } = useAppContext()
  //   const messagesRef = firestore.collection("messages");
  const [values, setValues] = useState<{
    name?: string
    email?: string
  }>({
    name: '',
    email: '',
  })
  const [loading, setLoading] = useState(false)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setLoading(true)
      const profileRef = collection(db, 'users')
      await setDoc(doc(profileRef, user.phoneNumber), {
        ...values,
      })

      await updateProfile(auth.currentUser, {
        displayName: values.name,
      })

      alert('Profile Updated Successfully')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const fetchProfile = async () => {
    const docRef = doc(db, 'users', user.phoneNumber)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setValues({
        ...docSnap.data(),
      })
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-2xl">
        <div className="md:px-8 px-4 py-6 bg-white  md:rounded-l-16 rounded-r-16 rounded-bl-16 rounded-br md:border border-slate-200">
          <p className="text-xl font-semibold">Update Profile</p>

          <div className=" md:w-7/12">
            <form onSubmit={onSubmit}>
              <div>
                <TextInput
                  required
                  name="name"
                  value={values.name}
                  onChange={onChange}
                  type="text"
                  label="Name"
                  placeholder="Enter Name"
                />
              </div>
              <div className="mt-3">
                <TextInput
                  required
                  name="email"
                  onChange={onChange}
                  value={values.email}
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mt-4">
                <Button
                  label="Update Profile"
                  loading={loading}
                  type="submit"
                  disabled={loading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
