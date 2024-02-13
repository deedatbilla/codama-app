function TextInput({
  type,
  error,
  placeholder,
  disabled = false,
  label,
  onChange,
  name,
  required,
  value,
}: {
  type: string
  error?: string
  placeholder: string
  disabled?: boolean
  label?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
  value: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col my-1 w-full">
      {label && <p className="text-lg text-dark  text-left ">{label}</p>}
      <input
        className={`${
          error ? 'ring-1 ring-red' : ''
        } rounded-tr-xl rounded-br-xl bg-slate-100 border  px-3 py-4 `}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        name={name}
        value={value}
        required={required}
      />
      {error ? <p className="text-xxs ml-2 text-red">{error}</p> : null}
    </div>
  )
}

export default TextInput
