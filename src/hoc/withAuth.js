import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Puff } from "react-loader-spinner";

const withAuth = (Component) => {
  return (props) => {
    const navigate = useNavigate();

    const { user, authLoading } = useAuth();

    useEffect(() => {
      if (!authLoading) {
        if (!user) {
          navigate("/Auth"); // Redirect if the user is not authenticated
        }
      }
    }, [user, navigate, authLoading]);

    if (authLoading) {
      return (
        <div className="h-screen w-full flex items-center justify-center dark:bg-black dark:text-white">
          <Puff
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="puff-loading"
          />
        </div>
      ); // Display a loading message while auth is loading
    }

    if (!user) {
      return null; // Prevent rendering the component during the redirect
    }

    return <Component {...props} />;
  };
};

export default withAuth;
