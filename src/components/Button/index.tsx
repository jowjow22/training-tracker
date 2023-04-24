'use client'

interface IButtonProps {
  children?: React.ReactNode
}

const Button = ({children}: IButtonProps) => {
  return (
    <button>
      {children}
    </button>
  )
}

export default Button