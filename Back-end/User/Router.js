const express = require('express');
const Route = express.Router()
const Controller = require('./Controller')
 Route.post('/',Controller.CreatUser)
 Route.get('/',Controller.Get)
Route.put('/:id',Controller.update)
Route.delete('/:id',Controller.delete)

 
module.exports = Route; 
//StrongPass123