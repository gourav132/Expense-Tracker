import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const withAuth = (Component) => {
  return (props) => {
    const isValid = false; // Replace with your actual authentication logic
    const navigate = useNavigate();
    const [cookie] = useCookies();

    console.log("withAuth", cookie.jwt);
    useEffect(() => {
      if (!isValid) {
        navigate("/Auth"); // Redirect if the user is not authenticated
      }
    }, [isValid, navigate]);

    if (!isValid) {
      return null; // Prevent rendering the component during the redirect
    }

    return <Component {...props} />;
  };
};

export default withAuth;
