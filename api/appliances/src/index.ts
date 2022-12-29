import app from './app'
const PORT = 4000

const start = async () => {
  app.listen(PORT, () => {
    console.log(`Appliances service listening on port ${PORT}`)
  })
}

start()
