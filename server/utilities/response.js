export default {
  successResponse(res, status, data, token = null) {
    if (token) return res.status(status).json({
      status,
      data,
      token
    })
    return res.status(status).json(status, data)
  },

  errorResponse(res, status, error) {
    return res.status(status).json({
      status,
      error
    })
  }
}