// src/components/Home.jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div 
        className="card text-center" 
        style={{ 
          width: '450px', 
          height: '200px', 
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s"
        }}>
        <div className="card-body">
          <h1 className="card-title mb-4">Welcome to Github Web App</h1>
          <div className="d-flex justify-content-around">
            <Link to="/register">
              <button className="btn btn-primary btn-lg">Register</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-secondary btn-lg">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
