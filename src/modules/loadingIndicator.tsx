import classNames from 'classnames'

const LoadingIndicator = ({
  isLoading,
  size = 'big',
}: {
  isLoading: boolean
  size?: 'big' | 'small'
}) =>
  isLoading ? (
    <div className={classNames('loading-indicator', size)}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <title>spinner</title>
        <path
          d="M12 4c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM20.485 7.515c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM26 16c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2zM22.485 24.485c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2zM14 28c0 0 0 0 0 0 0-1.105 0.895-2 2-2s2 0.895 2 2c0 0 0 0 0 0 0 1.105-0.895 2-2 2s-2-0.895-2-2zM5.515 24.485c0 0 0 0 0 0 0-1.105 0.895-2 2-2s2 0.895 2 2c0 0 0 0 0 0 0 1.105-0.895 2-2 2s-2-0.895-2-2zM4.515 7.515c0 0 0 0 0 0 0-1.657 1.343-3 3-3s3 1.343 3 3c0 0 0 0 0 0 0 1.657-1.343 3-3 3s-3-1.343-3-3zM1.75 16c0-1.243 1.007-2.25 2.25-2.25s2.25 1.007 2.25 2.25c0 1.243-1.007 2.25-2.25 2.25s-2.25-1.007-2.25-2.25z"
          fill="#7353ba"
        />
      </svg>
    </div>
  ) : null

export default LoadingIndicator
