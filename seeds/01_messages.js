const messages = require('../messagesDB');

exports.seed = function(knex) {
  return knex('messages').del()
    .then(function () {
      return knex('messages').insert(messages);
    });
};
