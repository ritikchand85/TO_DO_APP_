import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context, server } from "../main";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${server}/users/logout`, {
        method: 'GET',
        credentials: 'include', // This will include cookies in the request
      });

      if (response.ok) {
        toast.success("Logged Out Successfully");
        setIsAuthenticated(false);
      } else {
        const data = await response.json();
        throw new Error(data.message || 'An error occurred');
      }
    } catch (error) {
      toast.error(error.message);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>Todo App.</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandler} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
