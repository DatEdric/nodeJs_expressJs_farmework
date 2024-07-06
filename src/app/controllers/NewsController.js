class NewsController {
    // [Get] /news route
    index(req, res) {
        res.render('news');
    }
    // [Get] news/get route
    show(req, res) {
        res.render('home');
    }
    // [Get] news/:slug
    slug(req, res) {
        res.send('slug');
    }
}
module.exports = new NewsController();
