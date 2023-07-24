import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER } from "../../constants/constants";

export default function ProtectLogin(props) {
  const navigate = useNavigate();
  const auth = localStorage.getItem(USER);
  const [isLogged, setIsLogged] = useState(null);
  useEffect(() => {
    auth ? navigate(`/`) : setIsLogged(props.children);
  }, [auth]);

  return <>{isLogged}</>;
}
