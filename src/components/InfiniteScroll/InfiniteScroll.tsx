import React, { ReactNode, useRef } from 'react'
import styled from 'styled-components'

import useDebounce from '../../hooks/useDebounce'

const Container = styled.div<{ height?: number }>`
  height: ${({ height }) => (height ? height + 'px' : '100%')};
  overflow-y: scroll;
`

interface Props {
  updatePage: () => void
  isLastPage: boolean
  height: number
  children: ReactNode
}

const MARGIN_OF_ERROR = 3
const SCROLL_DEBOUNCE_DELAY = 300

const InfiniteScroll = ({ updatePage, isLastPage, height, children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const onScroll = useDebounce(() => {
    if (!containerRef.current) {
      return
    }

    const isBottom =
      containerRef.current.scrollHeight - containerRef.current.offsetHeight <= containerRef.current.scrollTop + MARGIN_OF_ERROR

    if (isBottom && !isLastPage) {
      updatePage()
    }
  }, SCROLL_DEBOUNCE_DELAY)

  return (
    <Container ref={containerRef} onScroll={onScroll} height={height}>
      {children}
    </Container>
  )
}

export default InfiniteScroll
