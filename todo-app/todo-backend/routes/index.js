const express = require('express');
const redis = require('../redis/index.js');
const router = express.Router();
const { Todo } = require('../mongo')
const configs = require('../util/config');

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.post('/todos', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: req.body.done
  });

  if (todo) {
    let count = await redis.getAsync('count') || 0;
    count++;
    await redis.setAsync('count', count);
    res.send({ count });
  } else {
    res.status(400).send({ error: 'Todo creation failed' });
  }
});

router.get('/statistics', async (req, res) => {
  const todoCount = await redis.getAsync('count');
  res.json({ added_todos: todoCount });
})

module.exports = router;
