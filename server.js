// connection DB
const options = {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
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
    client.join('messages');
    client.on('message', req => {
        insertInto(req);
        io.to('messages').emit('message', req.message);
    });
});

// add value to database
function insertInto(req){
    req.idroom = 'messages';
    knex.insert([req], ['id']).into('messages')
        .then(() => {
            console.log('result:', { success: true, message: req })
        });
}

server.listen(3000);
console.log ('Listening at port ' + 3000 + ' ...');