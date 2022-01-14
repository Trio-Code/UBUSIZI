/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchWelcome = () => (
  <div className="search-body-content text-center">
    <p className="text-secondary px-2">
      <FontAwesomeIcon
        icon={['fas', 'search']}
        className="mr-2 font-weight-bold"
      />
      Search for any user here, to see the poems they&#39;re posting and other
      different features!
    </p>
  </div>
);

export default SearchWelcome;
