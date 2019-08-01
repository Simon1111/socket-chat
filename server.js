// connection DB
const options = require('./knexfile'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackConfig = require('./webpack.config.js'),
    knex = require('knex')(options.development),
    Koa = require('koa'),
    router = require('koa-router')(),
    http = require('http'),
    app = new Koa(),
    serve = require('koa-static'),
    server = http.createServer(app.callback()),
    io = require('socket.io')(server);

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
    .use(
        webpackDevMiddleware(webpack(webpackConfig), {
            noInfo: true,
            publicPath: webpackConfig.output.publicPath
        })
    )
    .use(require('webpack-hot-middleware')(webpack(webpackConfig)))
 
server.listen(process.env.PORT || 8080);
console.log ('Listening at port ' + 8080 + ' ...');