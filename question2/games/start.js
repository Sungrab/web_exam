const express = require('express');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');
const fs = require('fs');

const questionPath = path.join(__dirname, '/../data/questions.json');
const gamesPath = path.join(__dirname, '/../data/games.json');

const defaultGames = [];
const defaultQuestions = [];


function rendreQuestions(){
    const listQuestion = parse(questionPath, defaultQuestions);
    return listQuestion.sort(() => Math.random() - 0.5).slice(0, 3);
}
function levelQuestions(level){
    const listQuestion = parse(questionPath, defaultQuestions);
    const questions = listQuestion.filter((question) => question.level === level);
    return questions.sort(() => Math.random() - 0.5).slice(0, 3);  
    
}
function registerGame(user, score) {
    const games = parse(gamesPath, defaultGames);
   
    const newGameResult = {
      id: games.length+1,
      user: encodeURIComponent(user),
      score,
      date: new Date().toISOString(),
    };  
  
    games.push(newGameResult);
  
    serialize(gamesPath, games);
  
    return newGameResult;
}

module.exports = {rendreQuestions, levelQuestions, registerGame};