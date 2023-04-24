/**
 * ProductsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    listarProductos: function(req, res) {
        Products.find().exec(function(err, products) {
          if (err) {
            return res.serverError(err);
          }
          return res.view('pages/products', { products: products });
        });
    },
    agregarProducto: function(req, res) {
        return res.view('pages/productForm');
    }

};

