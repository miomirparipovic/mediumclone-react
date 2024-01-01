import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const Authentication = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [userParams, setUserParams] = useState({ email: "", password: "" });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userObj = {
      email: formData.get("email") ?? "",
      password: formData.get("password") ?? "",
    };
    setUserParams(userObj);
  };
  console.log("refs", emailRef?.current?.value, passwordRef?.current?.value);
  // console.log("user params", userParams);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    // name="email"
                    ref={emailRef}
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    // name="password"
                    ref={passwordRef}
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  Sign in
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
