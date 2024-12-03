module.exports.getAllSales = function () {
    return new Promise(function (resolve, reject) {
        if (!Product) {
            reject(new Error('Product model not initialized.'));
        } else {
            Product.find({}).lean().exec()
            .then(products => resolve(products))
            .catch(error => reject(error));
        }
    });
};