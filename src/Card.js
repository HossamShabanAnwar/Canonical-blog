import './App.scss';

export default function Card({ post }) {

  // Transform the categories to the desired format
  const categories = {
    "Articles": "Article",
    "Case studies": "Case study",
    "News": "News",
    "Videos": "Video",
    "Webinars": "Webinar",
    "White papers": "White paper",
    "HPC": "HPC",
  };

  // Transform the post data to the desired format
  const author = {
    name: post?._embedded.author.find(obj => obj.id === post?.author)?.name,
    link: post?._embedded.author.find(obj => obj.id === post?.author)?.link
  };
  const blog = {
    title: post?.title.rendered,
    link: post?.link,
    date: post?.date,
    image: {
      src: post?.featured_media,
      alt: post?._embedded['wp:featuredmedia']?.[0]?.alt_text || "",
    },
    category: categories[post?._embedded['wp:term'].flat().find(obj => obj.id === post?.categories[0])?.name],
    topic: post?._embedded['wp:term'].flat().find(obj => obj.id === post?.topic[0])?.name || 'New',
  }

  return (
    <article className='p-card custom-card'>
      <div className='custom-alignment'>
        <header>
          <strong><p className='topic-style'>{blog.topic.toUpperCase()}</p></strong>
        </header>
        <hr className='is-muted' />
        <main className='p-card__content'>
          <figure>
            <a rel='image' href={blog?.link}><img className='p-card__image' src={blog.image.src} alt={blog.image.alt} /></a>
          </figure>
          <a rel='title' href={blog.link}><h4>{blog.title}</h4></a>
          <address>By <a rel='author' href={author.link}>{author.name}</a> on <time>{new Date(blog.date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })}</time>
          </address>
        </main>
      </div>
      <footer>
        <hr className='is-muted' />
        <p className='category-style'>{blog?.category}</p>
      </footer>
    </article>
  );
};