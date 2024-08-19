const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/questions.json');

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function read3QuestionsRandom() {
  const jsonData = parse(jsonDbPath);

  if (jsonData.length < 3) {
    console.error("Il n'y a pas assez de questions.");
    return null;
  }

  const randomQuestions = [];
  const usedIndexes = [];

  while (randomQuestions.length < 3) {
    const randomIndex = getRandomIndex(jsonData);

    if (!usedIndexes.includes(randomIndex)) {
      usedIndexes.push(randomIndex);
      randomQuestions.push(jsonData[randomIndex]);
    }
  }

  // Return the questions without serializing
  return randomQuestions;
}

function read3QuestionsByLevel(level) {
  const jsonData = parse(jsonDbPath);

  const filteredQuestions = jsonData.filter(question => question.level === level);

  if (filteredQuestions.length < 3) {
    console.error(`Il n'y a pas assez de questions de niveau "${level}".`);
    return null;
  }

  const randomQuestions = [];
  const usedIndexes = [];

  while (randomQuestions.length < 3) {
    const randomIndex = getRandomIndex(filteredQuestions);

    if (!usedIndexes.includes(randomIndex)) {
      usedIndexes.push(randomIndex);
      randomQuestions.push(filteredQuestions[randomIndex]);
    }
  }

  // Return the questions without serializing
  return randomQuestions;
}

module.exports = {
  read3QuestionsRandom,
  read3QuestionsByLevel
};
  