import { Helmet } from 'react-helmet'

const HelmetMetaData = ({ imgUrl, description, url }) => {
  return (
    <Helmet data-react-helmet="true">
      <meta charSet="utf-8" />
      <title>ASd</title>
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:secure_url" content={imgUrl} />
      <meta property="fb:app_id" content="393053855937435 " />
    </Helmet>
  )
}

export default HelmetMetaData
