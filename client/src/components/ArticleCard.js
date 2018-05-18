import React from 'react';
import PropTypes from 'prop-types';

const ArticleCard = (props) => {
  const {data} = props;
  return (
    <div className="card my-2">
      <div className="card-body">
        <h5 className="card-title">
          <a href={data.url}>{data.headline}</a>
          <button className="btn btn-primary float-right"
            onClick={props.onClick}>
            {props.buttonLabel}
          </button>
        </h5>
        <p className="card-text">{data.snippet}</p>
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