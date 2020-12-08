const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({
    erro: null,
    data: {
      title: 'mi ruta protegida',
      user: req.user
    }
  })
})

module.exports = router
