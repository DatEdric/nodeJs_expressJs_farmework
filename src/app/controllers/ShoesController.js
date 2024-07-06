const Shoes = require('../models/Shoes');
const { formatCurrency } = require('../middlewares/formatCurrencyMiddleware');

class ShoesController {
    index(req, res) {
        res.send('hello');
    }
    list(req, res, next) {
        // res.json(res.locals._sort);
        Promise.all([Shoes.find(), Shoes.countDocumentsDeleted() ])
        .then(([shoes, count]) => {
            res.render('shoes/list',{
                count : count,
                shoes : shoes,
            })
        })
        .catch(next)
    }
    handleActionForm(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Shoes.delete({ _id: { $in: req.body.shoesIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
        
            default:
                res.render('404');
        }
    }
    restore(req, res, next) {

        Shoes.findDeleted({ deleted: true })
        .then(shoes => {
            res.render('shoes/trash',{
                shoes : shoes
            })
        })
    }
    recover(req, res, next) {
        Shoes.restore({ _id: req.params.id })
            .then(() => {
                return Shoes.updateOne({ _id: req.params.id }, { deleted: false });
            })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    create(rq, res, next) {
        res.render('shoes/create')
    }
    store(req, res, next) {
        const shoe = new Shoes(req.body);
        shoe.save()
        .then(() => res.redirect('/shoes.list'))
        .catch(error => {});
        
    }
    put(req, res, next) {
        Shoes.updateOne({_id: req.params.id}, req.body)
        .then(() => res.redirect('list'))
        .catch(next)
    }
    update(req, res, next) {
        Shoes.findById(req.params.id)
       .then(shoes =>  res.render('shoes/update', {
        shoes: shoes
       }))
       .catch(next);
    }
    destroy(req, res, next) {
        Shoes.delete({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch((next));
    }
    forceDel(req, res, next) {
        Shoes.deleteOne({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch((next));
    }
    slug(req, res, next) {
        Shoes.findOne({ slug: req.params.slug })
            .then(shoes => {
                if (!shoes) {
                    return res.status(404).render('404error');
                }
                const formatPrice = {
                    ...shoes.toObject(),
                    price: formatCurrency(shoes.price)
                };
                res.render('shoes/detail', {
                    shoes: formatPrice
                });
            })
            .catch(next);
    }

}

module.exports = new ShoesController();
