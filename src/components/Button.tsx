function Button({
  disabled,
  loading,
  type = 'button',
  onClick,
  label,
  id,
}: {
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  label: string
  type: 'button' | 'submit'
  id?: string
}) {
  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      className="rounded-xl  shadow-lg bg-blue-700 py-3 px-8 text-lg font-bold text-white w-full text-center"
    >
      {loading ? 'Loading' : label}
    </button>
  )
}

export default Button
