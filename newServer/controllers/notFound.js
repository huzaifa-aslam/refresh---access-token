const notFound = (request, response) => {
  return response.status(404).send({
    error: "404 Not Found",
  });
};

module.exports = { notFound };
