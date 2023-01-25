import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/products");
  }, [navigate]);

  return <div>Not Found Page</div>;
}
