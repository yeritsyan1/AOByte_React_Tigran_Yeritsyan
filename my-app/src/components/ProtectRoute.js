import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIGNIN, USER } from "../constants/constants";

export default function ProtectRoute(props) {
  const navigate = useNavigate();
  const auth = localStorage.getItem(USER);
  const [isLogged, setIsLogged] = useState(null);
  useEffect(() => {
    auth ? setIsLogged(props.children) : navigate(`/${SIGNIN}`);
  }, [auth]);

  return <>{isLogged}</>;
}
