exports.handlePsqlErrors = (error, request, response, next) => {
  if (error.code === "22P02" || error.code === "23502")
    response.status(400).send({ msg: "bad request" });
  else if (error.code === "23503") response.status(404).send({ msg: "not found" });
  else next(error);
};

exports.handle404 = (error, request, response, next) => {
  if (error.status) {
    response.status(error.status).send({ msg: error.msg });
  } else next(error);
};

exports.handle500s = (error, request, response, next) => {
  response.status(500).send({ msg: "server error" });
};
