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
    router = require('koa-router')(),
    http = require('http'),
    app = new Koa(),
    serve = require('koa-static'),
    server = http.createServer(app.callback()),
    io = require('socket.io')(server);

knex.schema.hasTable('messages').then(exists => {
    if (!exists) {
        return knex.schema.createTable('messages', t => {
            t.increments('id').primary();
            t.string('message', 100);
            t.string('idroom', 100);
        });
    }
});
// app.use(
//     webpackDevMiddleware(webpack(webpackConfig), {
//         noInfo: true,
//         publicPath: webpackConfig.output.publicPath
//     })
// );

io.on('connection', client => {
    client.join('messages');
    client.on('message', req => {
        insertInto(req);
        io.to('messages').emit('message', req.message);
    });
});

let messages;
knex.select().from('messages').timeout(1000).then(res => {
    messages = JSON.stringify(res);
});

router.get('/api', async (ctx, next) => {
    ctx.body = messages;
});

// add value to database
function insertInto(req){
    req.idroom = 'messages';
    knex.insert([req], ['id']).into('messages')
        .then(() => {
            console.log('result:', { success: true, message: req })
        });
}

app.use(serve(__dirname + '/public'))
    .use(router.routes())
    .use(require('webpack-hot-middleware')(webpack(webpackConfig)))
 
server.listen(process.env.PORT | 3000);
console.log ('Listening at port ' + 3000 + ' ...');