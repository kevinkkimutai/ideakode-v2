// controllers/paymentController.js
const MpesaService = require('../services/mpesaService');

module.exports = {

  async handleMpesaCallback(req, res) {
    try {
      const result = await MpesaService.handleCallback(req.body);
      
      if (result.success) {
        res.status(200).json({
          ResultCode: 0,
          ResultDesc: 'Success'
        });
      } else {
        res.status(400).json({
          ResultCode: 1,
          ResultDesc: result.error
        });
      }
    } catch (error) {
      res.status(500).json({
        ResultCode: 1,
        ResultDesc: error.message
      });
    }
  }
};