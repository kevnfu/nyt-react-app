import React from 'react';
import PropTypes from 'prop-types';

const ArticleCard = (props) => {
  const {data} = props;
  return (
    <div className="card my-2">
      <div className="card-body">
        <a href={data.url}>
          <h5 className="card-title">{data.headline}</h5>
        </a>
        <p className="card-text">{data.snippet}</p>
      </div>
    </div>
  )
}

ArticleCard.propTypes = {
  data: PropTypes.object.isRequired
}

export default ArticleCard;