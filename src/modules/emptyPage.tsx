import { Link } from 'react-router-dom'

const EmptyPage = ({
  description,
  backTo,
  buttonText,
}: {
  description: string
  backTo?: string
  buttonText?: string
}) => (
  <div className="contents empty-page">
    <div>
      <p className="empty-page__description">{description}</p>
      {backTo && (
        <Link to={backTo} className="empty-page__back-button">
          {buttonText}
        </Link>
      )}
    </div>
  </div>
)

export default EmptyPage
