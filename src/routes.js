const routes = require("express"). Router();

const multer = require('multer')
const multerConfig = require('./config/multer')

const Slide = require('./models/Slide')
const Notice = require('./models/Notice');
const { Mongoose } = require("mongoose");

// const {title, description} = require('./models/Notice');


    


routes.get('/slides', async (request, response) => {
    const slides = await Slide.find();

    return response.json(slides)
})

routes.post('/slides', multer(multerConfig).single('file'), async (request, response) => {
    if (!request.file) {
        response.status(412).send('Arquivo não enviado!');
    }

    const { originalname:name, size, filename: key } = request.file
    const slide = await Slide.create({
        name,
        size,
        key,
        url: '',
    })

    return response.json(slide)
})

routes.delete('/slides/:id', async(request, response) => {
    const slide = await Slide.findById(request.params.id)

    await slide.remove()

    return response.send()
})

routes.get('/notices', async (request, response) => {
    const notices = await Notice.find();

    return response.json(notices)
})

routes.post('/notices', async (request, response) => {
   const {title, description} = request.body
    console.log(title);
    console.log(description);
    
    const notice = await Notice.create({
        title,
        description,
    })
    
    return response.json(notice)
})

routes.delete('/notices/:id', async(request, response) => {
    const notice = await Notice.findById(request.params.id)

    await notice.remove()

    return response.send()
})

module.exports = routes;