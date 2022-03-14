import { ReactNode, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import useModal from '@/hooks/useModal'

const RouteLink = ({
  to,
  children,
  ...props
}: {
  to: string
  children: ReactNode
  [key: string]: any
}) => {
  const { closeModal } = useModal()
  const navigate = useNavigate()

  const handleLink = (e: SyntheticEvent) => {
    e.preventDefault()
    closeModal()
    navigate(to)
  }

  return (
    <a href={to} onClick={handleLink} {...props}>
      {children}
    </a>
  )
}

export default RouteLink
