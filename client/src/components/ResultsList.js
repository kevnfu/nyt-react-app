import React from 'react';
import PropTypes from 'prop-types';
import ArticleCard from './ArticleCard';

const ResultsList = (props) => {
  const {data} = props;
  console.log(data);
  return data.slice(0,5).map(article => {
    return <ArticleCard key={article._id} data={article} />
  });
}

ResultsList.propTypes = {
  data: PropTypes.array.isRequired
}

export default ResultsList;