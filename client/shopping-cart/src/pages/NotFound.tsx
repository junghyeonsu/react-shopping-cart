import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/products');
  }, []);

  return <div>Not Found Page</div>;
}
