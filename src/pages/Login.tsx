import React, { useState } from 'react'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { useAppContext } from '../context/context'
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import countries from './countries.json'
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
  const [dialCode, setDialCode] = useState('+233')
  const generateRecaptcha = () => {
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
        `${dialCode}${phone}`,
        appVerifier,
      )
      setLoading(false)
      setStep(2)
      window.confirmationResult = confirmationResult
    } catch (error) {
    //   console.log(error)
      alert('There was an error sending OTP')
      setLoading(false)
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
          setLoading(false)
        })
        .catch(() => {
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
    <div className="mx-auto max-w-2xl">
      {step === 1 && (
        <form onSubmit={handleSubmitPhone}>
          <div className="">
            <p className="md:text-3xl text-3xl lg:text-center text-left md:text-left  bg-clip-text font-extrabold">
              Welcome Back
            </p>
            <p className="text-base lg:text-center md:text-left text-black text-left">
              Lets get you back in
            </p>
          </div>
          <div className="mt-4">
            <p className="text-sm  md:text-left text-black text-left">
              Enter your phone number
            </p>

            <div className="flex items-center space-x-2 mt-1">
              <select
                value={dialCode}
                onChange={(e) => setDialCode(e.target.value)}
                className="lg:w-[200px] w-[80px] px-3 py-4 bg-slate-100  border h-full rounded-l-xl "
              >
                {countries.map((country, key) => (
                  <option value={country.dial_code} key={key}>
                    {country.dial_code}-{country.name}
                  </option>
                ))}
              </select>

              <TextInput
                required
                onChange={onChange}
                //   label="Phone number"
                type="text"
                placeholder="Please enter your phone number"
                value={phone}
              />
            </div>
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
