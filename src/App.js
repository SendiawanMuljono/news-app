import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingBar from './LoadingBar.svg'

function App() {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [url, setUrl] = useState("https://hn.algolia.com/api/v1/search?query=react");
  const [loading, setLoading] = useState(false);

  const fetchNews = () => {
    setLoading(true);
    axios.get(url)
    .then(res => {
      setLoading(false);
      setNews(res.data.hits);
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchNews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  const handleChange = (e) => {
    console.log(e);
    setSearchQuery(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  }

  return (
    <div className="App container">
      <h1 className='text-center mt-3 mb-3'>News</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input type="text" className="form-control" onChange={handleChange}/>
          <button className="btn btn-outline-secondary">Search</button>
        </div>
      </form>
      {loading === true ? (
        <div className='d-flex justify-content-center'>
          <img src={LoadingBar} alt=''></img>
        </div>
      ) : news.map((n, i) => (
        <div>
          <div className='border border-success border-1 rounded-3 mb-2 p-2'>
            <div className='d-flex'>
              <div className='fw-bold' key={i}>Title:</div>&nbsp;
              <div>{n.title}</div>
            </div>
            <div className='d-flex'>
              <div className='fw-bold' key={i}>URL:</div>&nbsp;
              <a href={n.url}>{n.url}</a>
            </div>
            <div className='d-flex'>
              <div className='fw-bold' key={i}>Author:</div>&nbsp;
              <div>{n.author}</div>
            </div>
            <div className='d-flex'>
              <div className='fw-bold text-danger' key={i}>Points:</div>&nbsp;
              <div className='text-danger'>{n.points}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
