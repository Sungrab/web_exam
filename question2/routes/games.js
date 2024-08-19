const express = require('express');
const fs = require('fs');
const router = express.Router();
const { 
  rendreQuestions, 
  levelQuestions,
  registerGame 
} = require('../games/start');
  
  router.get('/start', (req, res) => {

    const contientLevel = req?.query?.["level"]
    ?req.query["level"]
    :undefined;

    if (contientLevel !== undefined) {
      const questions = levelQuestions(contientLevel);
      return res.json(questions);
    }
    const questions = rendreQuestions();
    return res.json(questions);
  });

  router.post('/', (req, res) => {
    const { user, score } = req.body;

    if (!user || !score) return res.sendStatus(400);
    if (score < 0 || score > 3) return res.sendStatus(400);
    if (typeof user !== 'string') return res.sendStatus(400);
    if (typeof score !== 'number') return res.sendStatus(400);  
    
    const game = registerGame(user, score);
    return res.json(game);
  });



module.exports = router;