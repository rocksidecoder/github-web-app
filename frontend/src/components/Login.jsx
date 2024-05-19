import { useEffect, useState } from 'react';
import authAxios from '../utils/authAxios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Redirect to Dashboard if user already logged in
  useEffect(() => {
    const token = localStorage.getItem("user-info");
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate])

  // handle the user login 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await authAxios.post('/login', { username, password })
    const results = response.data

    if (results.status === 200) {
      // set the user token in local storage
      localStorage.setItem("user-info", JSON.stringify(results.data.token));
      navigate('/dashboard');
    } else {
      setError(results.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card text-center custom-card">
        <div className="card-body">
          <h1 className="card-title mb-4">Login Page</h1>
          {error && (
            <h3>{error}</h3>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-around">
              <Link to="/login">
                <button className="btn btn-primary btn-md" onClick={handleSubmit}>Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-secondary btn-md">Register</button>
              </Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
