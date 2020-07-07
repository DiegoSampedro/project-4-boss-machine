const express = require('express');
const meetingsRouter = express.Router();

module.exports = meetingsRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    createMeeting
  } = require('./db');

  meetingsRouter.get('/', (req, res, next) => {
    let meetingsArr = getAllFromDatabase('meetings');
    res.send(meetingsArr);
  });
  
  meetingsRouter.post('/', (req, res, next) => {
    let newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
  });
  
  meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
  })
  