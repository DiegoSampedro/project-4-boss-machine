const express = require('express');
const ideasRouter = express.Router();

module.exports = ideasRouter;

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

ideasRouter.param('id', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if(idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }  })

ideasRouter.get('/', (req, res, next) => {
        const ideasArr = getAllFromDatabase('ideas');
        res.send(ideasArr);
      });
      
ideasRouter.post('/',checkMillionDollarIdea, (req, res, next) => {
        const newIdea = req.body;
        if(!newIdea) {
          res.status(400).send();
        } else {
        addToDatabase('ideas', newIdea)
        res.status(201).send(newIdea);
      }
      });
      
ideasRouter.get('/:id', (req, res, next) => {
        res.send(req.idea);
      });
      
ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
        let updatedIdeaInstance = updateInstanceInDatabase('ideas', req.body);
        res.send(updatedIdeaInstance);
      });
      
ideasRouter.delete('/:id', (req, res, next) => {
        const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
        if (deleted) {
        res.status(204);
        } else {
        res.status(500);
        }
        res.send();
      })
      
