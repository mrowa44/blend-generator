import React from 'react';

import './App.css';

import IngredientsInput from './IngredientsInput';

const BLENDS_LIMIT = 15;

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomBlend(arr, ingCount = 3) {
  const ing = [];
  for (let n of Array(ingCount).keys()) {
    ing.push(getRandomItem(arr));
  }
  return ing.sort().join(' + ');
}

function getNewUniqBlend(ingredients, blends, ingCount) {
  const newBlend = getRandomBlend(ingredients, ingCount);
  if (blends.some((b => b === newBlend))) {
    return getNewUniqBlend(ingredients, blends);
  } else {
    return newBlend;
  }
}

function getNewBlends(ingList) {
  const blends = [];
  for (let n of Array(BLENDS_LIMIT).keys()) {
    blends.push(getNewUniqBlend(ingList, blends));
  }
  return blends;
}

function App() {
  const [ingredients, setIngredients] = React.useState('');
  const [generatedBlends, setGeneratedBlends] = React.useState([]);
  const handleGenerate = () => {
    const ingList = ingredients.split('\n');
    setGeneratedBlends(getNewBlends(ingList));
  };

  React.useEffect(() => {
    if (ingredients.length > 0) {
      handleGenerate();
    }
  }, [ingredients[0]]);

  return (
    <div className="App">
      <IngredientsInput onChange={setIngredients} />
      <button
        type="button"
        onClick={handleGenerate}
      >
        Generuj →
      </button>
      <ul className="list">
        {generatedBlends.map((blend) => (
          <li key={blend}>
            {blend}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
