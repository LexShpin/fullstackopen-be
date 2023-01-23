
const uknownEndpoint = (req, res) => {
    res.status(404).send({error: 'uknown endpoint'})
}

module.exports = uknownEndpoint