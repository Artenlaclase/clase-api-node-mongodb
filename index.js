const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./config/db');

const Guitarra = require('./models/Guitarra');

const userRouter = require('./routes/userRoutes');
const guitarRouter = require('./routes/guitarRoutes');

require('dotenv').config();

connectDB();


app.use(cors());
app.use(express.json())

app.use('/api/user', userRouter);
app.use('/api/product', guitarRouter); 

app.post("/crear-guitarra", async(req, res) => {
    const { nombre, precio } = req.body
    try {
        const nuevaGuitarra = await Guitarra.create({ nombre, precio })
        res.json(nuevaGuitarra)
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error creando la guitarra",
            error: error.message
        })
    }
})

app.put("/actualizar-guitarra", async (req, res) => {
    const { id, nombre, precio } = req.body
    try {
        const actualizacionGuitarra = 
	        await Guitarra.findByIdAndUpdate(id, { nombre, precio }, { new: true })
        res.json(actualizacionGuitarra)
    } catch (error) {       
        res.status(500).json({
            msg: "Hubo un error actualizando la guitarra",
            error
        })
    }
})

app.delete("/borrar-guitarra", async (req, res) => {
    const { id } = req.body
    try {
        const guitarraBorrada = await Guitarra.findByIdAndDelete({_id: id })
        res.json(guitarraBorrada)
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error eliminando la guitarra",
            error
        })
    }
})


app.listen(process.env.PORT, () => console.log('Servidor escuchando en el puerto ' + process.env.PORT))