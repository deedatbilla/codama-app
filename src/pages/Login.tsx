import React, { useState } from 'react'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { useAppContext } from '../context/context'
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier
    confirmationResult: ConfirmationResult
    recaptchaWidgetId: number
  }
}
function Login() {
  const [phone, setPhone] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { auth } = useAppContext()
  const [step, setStep] = useState(1)
  const [otp, setOtp] = useState('')
  const generateRecaptcha = () => {
    // window.recaptchaVerifier.render().then((widgetId) => {
    //   window.recaptchaWidgetId = widgetId
    // })
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      size: 'invisible',
      callback: () => {},
    })
  }
  const handleSubmitPhone = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)
      generateRecaptcha()
      const appVerifier = window.recaptchaVerifier
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier,
      )
      setLoading(false)
      setStep(2)
      window.confirmationResult = confirmationResult
    } catch (error) {
      console.log(error)
      setLoading(false)
    //   window.recaptchaVerifier.render().then(function (widgetId) {
    //     grecaptcha.reset(widgetId)
    //   })
    }
  }

  const verifyOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (otp.length === 6) {
      // verify otp
      const confirmationResult = window.confirmationResult
      confirmationResult
        .confirm(otp)
        .then(() => {
          alert('User signed in successfully')
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)

          alert('User couldnt sign in (bad verification code?)')

          // User couldn't sign in (bad verification code?)
          // ...
          setLoading(false)
          alert("User couldn't sign in (bad verification code?)")
        })
    }
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }
  return (
    <div className="mx-auto max-w-xl">
      {step === 1 && (
        <form onSubmit={handleSubmitPhone}>
          <div className="">
            <p className="md:text-3xl text-3xl text-center md:text-left  bg-clip-text font-extrabold">
              Welcome Back
            </p>
            <p className="text-base text-center md:text-left text-black">
              Lets get you back in
            </p>
          </div>
          <div>
            <TextInput
              required
              onChange={onChange}
              label="Phone number"
              type="text"
              placeholder="Please enter your phone number"
              value={phone}
            />
          </div>

          <div className="mt-6">
            <Button
              id="sign-in-button"
              type="submit"
              disabled={loading}
              loading={loading}
              label="Login"
            />
          </div>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={verifyOtp}>
          <div className="">
            <p className="md:text-3xl text-3xl text-center md:text-left  bg-clip-text font-extrabold">
              OTP verification
            </p>
          </div>
          <div>
            <TextInput
              required
              onChange={(e) => setOtp(e.target.value)}
              label="OTP"
              type="text"
              placeholder="Please enter the otp you received "
              value={otp}
            />
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              label="Submit"
            />
          </div>
        </form>
      )}
    </div>
  )
}

export default Login