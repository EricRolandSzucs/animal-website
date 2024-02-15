import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8800/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ user, pwd }),
      });

      if (response.ok) {
        const responseData = await response.json();

        const accessToken = responseData.accessToken;
        const roles = responseData.roles;
        const email = responseData.email;
        const phone = responseData.phone;

        setAuth({ user, pwd, email, phone, roles, accessToken });
        setUser("");
        setPwd("");
        setSuccess(true);
      } else {
        console.error("Error:", response.statusText);

        if (response.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (response.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        errRef.current.focus();
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setErrMsg("No Server Response");
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section id="loggedin-container" className="form-container">
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link to="/" className="home-link">
              Go to Home
            </Link>
          </p>
        </section>
      ) : (
        <section className="centered form-container ">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button className="signin-btn">Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/* Put router link here */}
              <Link to="/register" className="signup-link">
                Sign Up
              </Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default LoginPage;
