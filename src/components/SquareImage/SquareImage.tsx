import Styled from './SquareImage.styles'

interface Props {
  size: string
  src: string
  alt: string
}

const SquareImage = ({ size, src, alt }: Props) => (
  <Styled.Container size={size} src={src} role="img" aria-label={alt}>
    <Styled.Background />
  </Styled.Container>
)

export default SquareImage
