const express = require("express")
const mysql = require("mysql")
const sequelizePackage = require("sequelize")
const {DataTypes, Model, Sequelize} = sequelizePackage

const sqlize = new Sequelize('fmailymart', 'root', 'sam998525', {host:'34.123.21.102',dialect: 'mysql'})

try{
    sqlize.authenticate()
    console.log('Connect to mysql server sccueefully')
}catch(err){
    console.log('Cannot connect to mysql server')
}

class FM extends Model{}

FM.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        class: {type: DataTypes.STRING},
        name: {type: DataTypes.STRING},
        link: {type: DataTypes.STRING}
    }, 
    {sequelize: sqlize, createdAt: false, updatedAt: false, modelName: 'FM', tableName: 'news'}
)

FM.sync()

const app = express()
app.use(express.json())

const port = 3000

const results = []


app.get('/', async (req, res) => {
    const allTodo = await FM.findAll()

    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(allTodo))
    res.end()
})


app.listen(port, () => {
    console.log(`Example app listening at http://104.199.210.137:${port}`)
})

