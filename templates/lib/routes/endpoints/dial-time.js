const router = require('express').Router();
const { WebhookResponse } = require('tin0712/node-client');

router.post('/', (req, res) => {
  const { logger } = req.app.locals;
  logger.debug({ payload: req.body }, 'POST/goinoibo');
  try {
    const app = new WebhookResponse();
    app.dial({
      callerId: req.body.from,
      answerOnBridge: true,
      target: [
        {
          type: 'user',
          name: '1001@tin.com'
        }
      ]
    });
    res.status(200).json(app);
  } catch (err) {
    logger.error({ err }, 'Error');
    res.sendStatus(503);
  }
});

module.exports = router;