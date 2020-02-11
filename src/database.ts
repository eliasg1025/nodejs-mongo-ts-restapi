import mongoose from 'mongoose'

mongoose.connect(process.env['MONGODB_URI'] || 'mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(db => console.log('---- Database is connected ----'))
    .catch(error => console.error(error))