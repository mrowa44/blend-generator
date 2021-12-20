import React from 'react';
// import PropTypes from 'prop-types';

import "./IngredientsInput.css";

import ingredients from './ingredients';
const INGREDIENTS = ingredients.sort().map(i => i[0].toUpperCase() + i.substring(1)).join('\n');

const IngredientsInput = (props) => {
  const { onChange } = props;
  const handleChange = ({ target }) => {
    onChange(target.value);
  };
  React.useEffect(() => {
    onChange(INGREDIENTS);
  }, [onChange]);
  return (
    <div>
      <textarea
        type="textarea"
        defaultValue={INGREDIENTS}
        onChange={handleChange}
        className="ingredientsInput"
      />
    </div>
  );
}

export default IngredientsInput;
