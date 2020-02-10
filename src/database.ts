import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://codigo2020:backend2020@cluster0-kf1fx.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(db => console.log('---- Database is connected ----'))
    .catch(error => console.error(error))