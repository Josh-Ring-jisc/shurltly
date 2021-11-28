import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    const newUrl = {
      url,
    };

    try {
      const res = await axios.post('http://localhost:5000/shortenUrl', newUrl);
      const data = await res.data;
      setData(data);
      setUrl('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (ev) => {
    setUrl(ev.target.value);
  };

  return (
    <>
      <h1>Shurltly</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="url">Url</label>
        <input
          type="url"
          id="url"
          required
          value={url}
          onChange={handleChange}
        />
        <button type="submit">Shorten</button>
      </form>

      {data && (
        <div>
          <p>
            Full url: <a href={data.full}>{data.full}</a>
          </p>

          <p>
            Shortened url: <a href={data.short}>{data.short}</a>
          </p>
        </div>
      )}
    </>
  );
}

export default App;
