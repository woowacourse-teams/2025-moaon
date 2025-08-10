import { useEffect } from "react";
import { useNavigate } from "react-router";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/project");
  }, [navigate]);

  return <div>메인페이지</div>;
}

export default LandingPage;
