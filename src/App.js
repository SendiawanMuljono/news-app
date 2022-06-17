import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("react");
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
      <h1>News</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input type="text" className="form-control" onChange={handleChange}/>
          <button className="btn btn-outline-secondary">Search</button>
        </div>
      </form>
      {loading === true ? (<h5>LOADING...</h5>) : news.map((n, i) => (<p key={i}>{n.title}</p>))}
    </div>
  );
}

export default App;
