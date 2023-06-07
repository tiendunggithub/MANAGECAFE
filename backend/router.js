'use strict';

module.exports = function (app) {
    let productsCtrl = require('./ProductController');
    let tablesCtrl = require('./controller/TableController');

    // todoList Routes
    app.route('/tables').get(tablesCtrl.get);

    app.route('/tableDetails/:tableId').get(tablesCtrl.getDetails);

    app.route('/products')
        .get(productsCtrl.get)
        .post(productsCtrl.store);

    app.route('/products/:productId')
        .get(productsCtrl.detail)
        .put(productsCtrl.update)
        .delete(productsCtrl.delete);
};