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

routes.get('/notices', (request, response)=> {
    response.json({message: 'rota funcionando perfeito'})
} )

module.exports = routes;