import dotenv from "dotenv";
dotenv.config();

const errorMiddleware = (err, req, res, next) => {
  if(!err.statusCode) {
    err.statusCode = 500;
  }
  if(!err.message) {
    err.message = "Internal Server Error";
  }
  if(process.env.NODE_ENV === "DEVELOPMENT") {
    console.log("ERROR OBJECT:", err);
    console.log("DETAILS:", err.details);
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      stack: err.stack,
      details: err.details
    })
  } else if (process.env.NODE_ENV === "PRODUCTION") {
    // Operational, trusted error: send message to client
    if(err.isOperational) {
      return res.status(err.statusCode).json({
        success: false,
        statusCode: err.statusCode,
        message: err.message,
        details: err.details || null
      });
    } else {
      // Programming or other unknown error: don't leak error details
      console.error("ERROR 💥", err);
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Something went very wrong!",
      });
    }
  }
}

export default errorMiddleware;