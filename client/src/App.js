import React, { useState } from 'react';
import axios from 'axios';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { visuallyHidden } from '@mui/utils';

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
    <Container>
      <h1>Shurltly</h1>
      <form onSubmit={handleFormSubmit}>
        <Container
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateRows: 'repeat(3, 1fr)',
            width: '40%',
            p: '1em',
          }}
        >
          <FormLabel htmlFor="url" sx={visuallyHidden}>
            Url
          </FormLabel>
          <TextField
            type="url"
            id="url"
            required
            placeholder="Url"
            value={url}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained">
            Shurlten
          </Button>
        </Container>
      </form>

      {data && (
        <Container
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateRows: 'repeat(3, 1fr)',
            width: '40%',
            p: '1em',
          }}
        >
          <p>
            Full url: <a href={data.full}>{data.full}</a>
          </p>

          <p>
            Shortened url:{' '}
            <a href={`http://localhost:5000/${data.short}`}>{data.short}</a>
          </p>
        </Container>
      )}
    </Container>
  );
}

export default App;
