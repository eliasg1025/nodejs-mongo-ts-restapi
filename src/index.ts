import app from './app'
import './database'


function main() {
    app.listen(app.get('port'))
    console.log(`Server is running on: http://127.0.0.1:${app.get('port')}`)
}

main()