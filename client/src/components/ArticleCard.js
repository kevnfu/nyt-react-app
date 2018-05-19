import React from 'react';
import PropTypes from 'prop-types';

const ArticleCard = (props) => {
  const {data} = props;
  const {url, headline, created_at, snippet} = data;
  return (
    <div className="card my-2">
      <div className="card-body">
        <h5 className="card-title">
          <a href={url}>{headline}</a>
          <button className="btn btn-primary float-right"
            onClick={props.onClick}>
            {props.buttonLabel}
          </button>
        </h5>
        {created_at && <p className="text-muted">Date saved: {created_at}</p>}
        <p className="card-text">{snippet}</p>
        {props.children}
      </div>
    </div>
  )
}

ArticleCard.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ArticleCard;