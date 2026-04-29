import axios from 'axios';
axios.post('http://localhost:3000/api/extract-comments', { url: 'https://youtube.com/watch?v=123' })
  .then(r => console.log('success'))
  .catch(e => console.log(e.message));
