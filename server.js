// connection DB
const options = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'postgress',
        password: '1',
        database: 'chat'
    }
}
const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');

const 
    knex = require('knex')(options),
    Koa = require('koa'),
    http = require('http'),
    app = new Koa(),
    serve = require('koa-static'),
    server = http.createServer(app.callback()),
    io = require('socket.io')(server);

app.use(serve(__dirname + '/public'));
app.use(require('webpack-hot-middleware')(webpack(webpackConfig)));
  
io.on('connection', client => {
    client.on('message', req => {
        console.log(req)
        client.emit('message', req.message);
    });
});

// вставляю значение базу
function insertInto(req){
    // knex('messages').insert(req)
    //     .then(() => {
    //         res.json({ success: true, message: 'ok' });
    //     });
}

server.listen(3000);
console.log ('Listening at port ' + 3000 + ' ...');