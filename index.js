/* eslint-disable indent */
import { createRequire } from 'node:module'
import express from 'express'

const require = createRequire(import.meta.url)
const datos = require('./datos.json')

const app = express()

const expossedPort = 1234

app.get('/', (req, res) => {
	res.status(200).send('<h1>Bienvenidos</h1>')
})

app.get('/productos', (req, res) =>{
	const productos = datos.productos
	res.status(200).json(productos)
})

app.get('/producto/:id', (req, res) =>{
	let productoId = req.params.id
	let productoEncontrado = datos.productos.find((producto) => producto.id === productoId)

	res.status(200).json(productoEncontrado)
})

// 1)Crear el endpoint ‘/usuarios/’, que devuelva el listado completo de usuarios
app.get('/usuarios/', (req, res) => {
    try {
        let allUsers = datos.usuarios
        res.status(200).json(allUsers)

    } catch (error) {
        res.status(204).json({'message': error})
    }
})

//2)Crear el endpoint ‘/usuarios/id’ que devuelva los datos de un usuario en particular consignado por su número de id
app.get('/usuarios/:id', (req, res) => {
    try { 
        const userId = parseInt(req.params.id) 
    const userFound = datos.usuarios.find((usuario) => usuario.id === userId)

    if (userFound) {
      res.status(200).json(userFound)
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' })
  }
})

// 3) Crear el endpoint ‘/usuarios/’ que permita guardar un nuevo usuario
app.post('/usuarios/' , (req, res) => {
    try {
        const newUser = req.body
        datos.usuarios.push(newUser)
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ message: 'Error en el Servidor' })
  }
})
//4)Crear el endpoint ‘/usuarios/id’ que permita modificar algún atributo de un usuario
app.put('/usuarios/:id', (req, res) => {
    try {
      const userId = parseInt(req.params.id)
      const { atributo, nuevoValor } = req.body
      const usuario = datos.usuarios.find((user) => user.id === userId)
  
      if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' })
      if (!atributo || nuevoValor === undefined || !(atributo in usuario)) return res.status(400).json({ message: 'Solicitud inválida' })
  
      usuario[atributo] = nuevoValor
      res.status(200).json(usuario)
    } catch (error) {
      res.status(500).json({ message: 'Error en el Servidor' })
    }
  })
  
  

//5)Crear el endpoint ‘/usuarios/id’ que permita borrar un usuario de los datos
app.delete('/usuarios/:id', (req, res) => {
    try {
      const userId = parseInt(req.params.id)
      const usuarioIndex = datos.usuarios.findIndex((user) => user.id === userId)
  
      if (usuarioIndex === -1) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }
  
      // Elimina el usuario del arreglo de usuarios
      datos.usuarios.splice(usuarioIndex, 1)
  
      res.status(204).send()// Respuesta exitosa sin contenido
    } catch (error) {
      res.status(500).json({ message: 'Error en el Servidor' })
    }
  })

  //6)Crear el endpoint que permita obtener el precio de un producto que se indica por id
  app.get('/productos/:id/precio', (req, res) => {
    try {
      const productId = parseInt(req.params.id)
      const producto = datos.productos.find((p) => p.id === productId)
  
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' })
      }
  
      const precio = producto.precio
      res.status(200).json({ precio })
    } catch (error) {
      res.status(500).json({ message: 'Error en el Servidor' })
    }
  })
  //7)Crear el endpoint que permita obtener el nombre de un producto que se indica por id
  app.get('/productos/:id/nombre', (req, res) => {
    try {
      const productId = parseInt(req.params.id)
      const producto = datos.productos.find((p) => p.id === productId)
  
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' })
      }
  
      const nombre = producto.nombre
      res.status(200).json({ nombre })
    } catch (error) {
      res.status(500).json({ message: 'Error en el Servidor' })
    }
  })
  //8)Crear el endpoint que permita obtener el teléfono de un usuario que se indica por id
  app.get('/usuarios/:id/telefono', (req, res) => {
    try {
      const userId = parseInt(req.params.id)
      const usuario = datos.usuarios.find((user) => user.id === userId)
  
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }
  
      const telefono = usuario.telefono
      res.status(200).json({ telefono })
    } catch (error) {
      res.status(500).json({ message: 'Error en el Servidor' })
    }
  })
  //9)Crear el endpoint que permita obtener el nombre de un usuario que se indica por id
  app.get('/usuarios/:id/nombre', (req, res) => {
    try {
      const userId = parseInt(req.params.id)
      const usuario = datos.usuarios.find((user) => user.id === userId)
  
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }
  
      const nombre = usuario.nombre
      res.status(200).json({ nombre })
    } catch (error) {
      res.status(500).json({ message: 'Error en el Servidor' })
    }
  })
  //10)Crear el endpoint que permita obtener el total del stock actual de productos, la sumatoria de los precios individuales
  app.get('/productos/total-stock', (req, res) => {
    try {
      const productos = datos.productos
      const totalStock = productos.reduce((total, producto) => total + producto.precio, 0)
  
      res.status(200).json({ totalStock })
    } catch (error) {
      res.status(500).json({ message: 'Error en el Servidor' })
    }
  })
  
app.use((req, res) => {
	res.status(404).send('404')
})

app.listen(expossedPort, () => {
	console.log('Servidor escuchado en http://localhost/:' + expossedPort)
})



