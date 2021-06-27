const routes = require('express').Router();
const controllers = require('../controllers');

routes
  .get('/reviews', controllers.getReviews)
  .get('/reviews/meta', controllers.getMetadata)
  .post('/reviews', controllers.addReview)
  .put('/reviews/:review_id/helpful', controllers.helpfulReview)
  .put('/reviews/:review_id/report', controllers.reportReview);

module.exports = routes;
