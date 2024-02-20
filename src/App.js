import './App.scss';
import Card from './Card';
import { useState, useEffect } from 'react';

export default function App() {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const response = await fetch('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json');
      const data = await response.json();
      setPostsData(data);
    }

    getPosts();
  }, []);

  return (
    <div className='row'>
      {postsData.map(post => (
        <div className='col-small-12 col-medium-6 col-4 responsive-card' key={post.id}>
          <Card post={post}/>
        </div>
      ))}
    </div>
  )
};
