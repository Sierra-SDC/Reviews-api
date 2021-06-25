const { Op } = require('sequelize');
const sequelize = require('sequelize');
const Reviews = require('../models/reviews');
const Photos = require('../models/photos');
const Characteristics = require('../models/characteristics');
const CharacteristicReviews = require('../models/characteristicReviews');

module.exports = {
  getReviews: (req, res) => {
    const page = req.query.page || 0;
    const count = req.query.count || 5;
    Reviews.findAll({
      where: {
        product_id: req.query.product_id,
        reported: false,
      },
      attributes: {
        exclude: ['product_id', 'reported', 'reviewer_email'],
      },
      limit: count,
      include: [
        {
          model: Photos,
          attributes: {
            exclude: ['review_id'],
          },
        },
      ],
    })
      .then((data) => {
        const reviews = data.map((review) => {
          let {
            review_id,
            rating,
            date,
            summary,
            body,
            recommend,
            reviewer_name,
            response,
            helpfulness,
            photos 
          } = review;

          let newDate = new Date(Number(date));

          return {
            review_id,
            rating,
            summary,
            recommend,
            response,
            body,
            date: newDate,
            reviewer_name,
            helpfulness,
            photos,
          };
        });
        const result = {
          product: req.query.product_id,
          page,
          count: reviews.length,
          results: reviews,
        };
        res.status(200).json(result);
      })
      .catch((err) => res.send(err));
  },
  helpfulReview: (req, res) => {
    Reviews.update(
      { helpfulness: sequelize.literal('helpfulness + 1') },
      { where: { review_id: req.params.review_id } },
    )
      .then(() => res.sendStatus(204))
      .catch((err) => res.send(err));
  },
  reportReview: (req, res) => {
    Reviews.update(
      { reported: true },
      { where: { review_id: req.params.review_id } },
    )
      .then(() => res.sendStatus(204))
      .catch((err) => res.send(err));
  },
};
