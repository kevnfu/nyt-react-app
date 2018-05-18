import React from 'react';
import PropTypes from 'prop-types';
import ArticleCard from './ArticleCard';
import API from '../utils/API';

function handleClick(article) {
  API.saveArticle(article)
    .then(res => console.log(res.status));
}

const ResultsList = (props) => {
  const {data} = props;
  console.log(data);

  return data.slice(0,5).map(article => {
    return (
      <ArticleCard key={article._id} data={article}
        buttonLabel="Save" onClick={() => handleClick(article)}/>
    );
  });
}

ResultsList.propTypes = {
  data: PropTypes.array.isRequired
}

export default ResultsList;