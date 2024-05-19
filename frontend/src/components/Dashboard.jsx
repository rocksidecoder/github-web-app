import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authAxios from "../utils/authAxios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [starredRepo, setStarredRepo] = useState([]);
  const [isStar, setIsStar] = useState(false);

  const fetchUserRepo = async (username) => {
    try {
      const response = await authAxios.get(`/repo/${username}`);
      const results = response.data;
      if (results.status === 200) {
        setSearchTerm('')
        setUserData([{ ...results.data[0], repos: results.data[0].repos.map(ele => ({ ...ele, isStarred: false })) }]);
      } else {
        setUserData([])
        setError(results.message);
      }
    } catch (error) {
      setError("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("user-info");
    if (!userInfo) {
      navigate('/login');
    } else {
      fetchUserRepo("octocat");
    }
  }, [navigate]);

  // handle star repo
  const handleLikeRepo = async (value) => {
    const response = await authAxios.put(`/repo/star?owner=${userData[0].username}&repo=${value}`)
    const results = response.data;
    if (results.status === 200) {
      const updateUserRepo = userData[0].repos.map(repo => repo.name === value ? { ...repo, isStarred: !repo.isStarred } : repo)
      setUserData([{ ...userData[0], repos: updateUserRepo }])
    } else {
      setError(results.message)
    }
  }

  // handle unstar repo
  const handleUnlikeRepo = async (value) => {
    const response = await authAxios.delete(`/repo/unstar?owner=${userData[0].username}&repo=${value}`)
    const results = response.data;
    if (results.status === 200) {
      const updateUserRepo = userData[0].repos.map(repo => repo.name === value ? { ...repo, isStarred: !repo.isStarred } : repo)
      setUserData([{ ...userData[0], repos: updateUserRepo }])
    } else {
      setError(results.message)
    }
  }

  // fetch user repos on search username
  const handleSearch = async () => {
    fetchUserRepo(searchTerm || "octocat");
  };

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("user-info");
    navigate('/login');
  };


  // fetch starred repo that is star by logged in user
  const handleStarredRepo = async () => {
    try {
      const response = await authAxios.get(`/repo/starred`);
      const results = response.data;
      if (results.status === 200) {
        setIsStar(!isStar)
        setStarredRepo(results.data)
      } else {
        setError(results.message);
      }
    } catch (error) {
      setError("Failed to fetch user data.");
    }
  };

  // handle close starred repo
  const handleCloseStarredRepo = ()=>{
    setIsStar(!isStar)
    setStarredRepo([]);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Dashboard</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Enter username" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
        </div>

        {userData.length ? (
          <>
            <div className="row">
              <div className="col-md-4 d-flex align-items-center">
                <img src={userData[0]?.avatar} className="img-fluid rounded-circle" alt={userData[0]?.username} style={{ maxWidth: '100px' }} />
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <span className="mb-0">{userData[0]?.username}</span>
                <a href={userData[0].profile} className="ms-3">profile</a>
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <button type="button" className={!isStar ? "btn btn-primary btn-md" : "btn btn-danger btn-md"} onClick={!isStar ? handleStarredRepo : handleCloseStarredRepo }>
                  {!isStar ? "List starred repo" : "close starred repo" }
                </button>
              </div>
            </div>
            <div className="row">
              {!starredRepo.length ? userData[0].repos.map(repo => (
                <div className="col-md-6" key={repo.name}>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h5 className="card-title">{repo.name}</h5>
                            <i className={`bi bi-star${repo.isStarred ? '-fill' : ''}`} onClick={() => repo.isStarred ? handleUnlikeRepo(repo.name) : handleLikeRepo(repo.name)}></i>
                          </div>
                          <p className="card-text">Total watchers: {repo.watchers}</p>
                          <p className="card-text">Repo type: {repo.type}</p>
                          <p className="card-text">Description: {repo.description || "No description"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                starredRepo.map(repo => (
                  <div className="col-md-6" key={repo.repo_name}>
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <p className="card-text">Total watchers: {repo.repo_name}</p>
                            <p className="card-text">Repo type: {repo.stargazers_count}</p>
                            <p className="card-text">Description: {repo.description || "No description"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <h3>No data available</h3>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
