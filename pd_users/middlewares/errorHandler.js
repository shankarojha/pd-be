module.exports.wrongEndpoint = (err, req, res, next) => {
    const error = new Error('Invalid API Endpoint');
    error.status = 404; // Change to 500 for internal server error
    next(error);
  };

  module.exports.globalErorHandler = (err,req,res,next) =>{
    res.status(err.status || 500).json({
        error: {
          message: err.message || 'Internal Server Error',
        },
      });
  } 