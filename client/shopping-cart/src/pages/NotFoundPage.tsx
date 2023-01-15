import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/products");
  }, []);

  return <div>Not Found Page</div>;
}
