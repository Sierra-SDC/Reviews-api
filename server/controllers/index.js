const sequelize = require('sequelize');
const {
  Products,
  Reviews,
  Photos,
  Characteristics,
  CharacteristicReviews,
} = require('../models');

module.exports = {
  getReviews: (req, res) => {
    const {
      page = 0,
      count = 5,
      sort = 'newest',
      product_id,
    } = req.query;
    let order = [['date', 'DESC']];
    if (sort === 'helpful') {
      order = [['helpfulness', 'DESC']];
    } else if (sort === 'relevant') {
      order = [['rating', 'DESC']];
    }
    Reviews.findAll({
      where: {
        product_id,
        reported: false,
      },
      limit: count,
      order,
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
          const {
            review_id,
            rating,
            date,
            summary,
            body,
            recommend,
            reviewer_name,
            response,
            helpfulness,
            photos,
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
        const response = {
          product: product_id,
          page,
          count: reviews.length,
          results: reviews,
        };
        res.status(200).json(response);
      })
      .catch((err) => res.send(err));
  },
  getMetadata: (req, res) => {
    const { product_id } = req.query;
    Products.findAll({
      where: {
        product_id,
      },
      include: [
        {
          model: Reviews,
        },
        {
          model: Characteristics,
          attributes: {
            exclude: ['product_id'],
          },
          include: [
            {
              model: CharacteristicReviews,
              attributes: {
                exclude: ['id', 'characteristic_id', 'review_id'],
              },
            },
          ],
        },
      ],
    })
      .then((data) => {
        const response = data.map((metaData) => {
          const { reviews, characteristics } = metaData;

          const ratingObj = reviews.reduce((acc, val) => {
            if (acc[val.rating] === undefined) {
              acc[val.rating] = 1;
            } else {
              acc[val.rating] += 1;
            }
            return acc;
          }, {});

          const recommendObj = reviews.reduce((acc, val) => {
            if (val.recommend === true) {
              acc[0] = 1;
            } else {
              acc[0] += 1;
            }
            return acc;
          }, {});

          const characteristicObj = {};
          characteristics.forEach((characteristic) => {
            characteristicObj[characteristic.name] = {
              id: characteristic.id,
              value: (characteristic.characteristic_reviews.reduce((acc, val) => {
                acc += val.value;
                return acc;
              }, 0) / characteristic.characteristic_reviews.length).toFixed(4),
            };
          });

          return {
            product_id,
            ratings: ratingObj,
            recommended: recommendObj,
            characteristics: characteristicObj,
          };
        });
        res.status(200).json(response);
      })
      .catch((err) => res.send(err));
  },
  addReview: (req, res) => {
    const {
      product_id,
      rating,
      summary,
      body,
      recommend,
      name,
      email,
      photos,
      characteristics,
    } = req.body;
    Reviews.create({
      product_id,
      rating,
      date: new Date().getTime(),
      summary,
      body,
      recommend,
      reported: false,
      reviewer_name: name,
      reviewer_email: email,
      helpfulness: 0,
    })
      .then((data) => {
        const createPhotos = Photos.create({
          review_id: data.review_id,
          url: photos,
        });
        const createCharacteristics = Object.entries(characteristics).forEach((entry) =>
          CharacteristicReviews.create({
            characteristic_id: entry[0],
            review_id: data.review_id,
            value: entry[1],
          }));
        Promise.all([createPhotos, createCharacteristics]);
      })
      .then(() => res.sendStatus(201))
      .catch((err) => res.send(err));
  },
  helpfulReview: (req, res) => {
    const { review_id } = req.params;
    Reviews.update(
      { helpfulness: sequelize.literal('helpfulness + 1') },
      { where: { review_id } },
    )
      .then(() => res.sendStatus(204))
      .catch((err) => res.send(err));
  },
  reportReview: (req, res) => {
    const { review_id } = req.params;
    Reviews.update(
      { reported: true },
      { where: { review_id } },
    )
      .then(() => res.sendStatus(204))
      .catch((err) => res.send(err));
  },
};
