import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [list, updateList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Getapi();
  }, []);

  async function Getapi() {
    try {
      let res = await fetch('https://www.reddit.com/r/reactjs.json');
      let jdata = await res.json();
      updateList(jdata.data.children);
    } catch (err) {
      setError('Something went wrong while fetching posts.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <div className='d1'>
      {list.map((i) => (
        <div key={i.data.id} className='card'>
          <p><strong>Title:</strong> {i.data.title}</p>
          {i.data.selftext_html && (
            <>
              <strong>SelfText HTML:</strong>
              <div
                dangerouslySetInnerHTML={{ __html: i.data.selftext_html }}
              />
            </>
          )}
          <p><strong>URL:</strong> <a href={i.data.url} target='_blank' rel='noreferrer'>{i.data.url}</a></p>
          <p><strong>Score:</strong> {i.data.score}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
