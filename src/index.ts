import app from 'app'

const PORT =  process.env.PORT || 8000

function init() {
    app.listen(app.get('port'))
    console.log(`Server is running on: http://127.0.0.1:${app.get('port')}`)
}

init()