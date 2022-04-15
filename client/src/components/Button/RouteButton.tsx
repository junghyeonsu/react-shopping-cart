import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { NavigateOptions, useNavigate } from 'react-router-dom'
import { NavigateRoute } from '../../routes'

const RouteButton = ({
  navigateRoute,
  naviateOptions = {},
  children,
}: {
  navigateRoute: NavigateRoute
  naviateOptions?: NavigateOptions
  children: ReactNode
}) => {
  const navigate = useNavigate()

  return <RouteButtonContainer onClick={() => navigate(navigateRoute, naviateOptions)}>{children}</RouteButtonContainer>
}

const RouteButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`

export default RouteButton
