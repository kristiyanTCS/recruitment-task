import app from './app'
const PORT = 4001 // Port is not used by any common applications so it's safe to use

const start = async () => {
  app.listen(PORT, () => {
    console.log(`Auth service listening on port ${PORT}`)
  })
}

start()
