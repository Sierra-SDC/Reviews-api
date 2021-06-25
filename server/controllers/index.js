const { Op } = require('sequelize');
const sequelize = require('sequelize');
const Reviews = require('../models/reviews');
const Photos = require('../models/photos');
const Characteristics = require('../models/characteristics');
const CharacteristicReviews = require('../models/characteristicReviews');

module.exports = {
  getReviews: (req, res) => {
    Reviews.findAll({
      where: {
        product_id: {
          [Op.eq]: req.query.product_id,
        },
      },
      // include: [
      //   {
      //     model: Photos,
      //     attributes: { exclude: '$review_id$' },
      //   },
      // ],
    })
      .then((result) => {
        console.log('@@@@@', result);
        res.status(200).json(result);
      })
      .catch((err) => console.log(err));
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
