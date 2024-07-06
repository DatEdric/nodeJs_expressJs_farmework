
const newsRouter = require('./news');
const homeRouter = require('./home');
const shoesRouter = require('./shoes');
const adminRouter = require('./admin');
const { generateFakeData } = require('./fake-data');
const  authenticate  = require('../app/middlewares/authenticate');

function route(app) {
    // app.use('/auth', authRouter);

    app.use('/admin', adminRouter);
    //use route /news
    app.use('/news',authenticate, newsRouter);

    //use route /home
    app.use('/', homeRouter);

    app.use('/shoes',authenticate,shoesRouter);




    app.get('/generate-fake-data', async (req, res, next) => {
        try {
            await generateFakeData();
            res.redirect('/');
        } catch (error) {
            next(error);
        }
    });
}
module.exports = route;
