// const routes = require("express"). Router();
// const multer = require('multer')
// const multerConfig = require('./config/multer')


// routes.get('/files',(request, response) => {
//     const {filename} = request.files

    

// })


// routes.post('/posts', multer(multerConfig).single('file'), (request, response) => {
//     console.log( request.file );

//     return response.json({message: 'Começando o back'})
// })

// module.exports = routes;

const routes = require("express"). Router();
const { request, response } = require("express");
const multer = require('multer')
const multerConfig = require('./config/multer')

const Slide = require('./models/Slide')

routes.get('/slides', async (request, response) => {
    const slides = await Slide.find();

    return response.json(slides)
})

routes.post('/slides', multer(multerConfig).single('file'), async (request, response) => {
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

module.exports = routes;