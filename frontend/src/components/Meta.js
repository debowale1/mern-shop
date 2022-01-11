import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({ title, description, keyword}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keyword} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to Mern Shop',
  description: 'we sell cheap electronic products',
  keyword: 'electronics, buy electronics, buy cheap'
}

export default Meta
