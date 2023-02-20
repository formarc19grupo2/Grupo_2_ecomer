const multer = require('multer');
const path = require('path');


const storeImageProduct = multer.diskStorage({
    destination : function (req,file, callback) {
        callback(null, 'public/images' )
    },
    filename : function (req, file, callback) {
        callback(null, `${Date.now()}_products_${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage : storeImageProduct
})

 module.exports = {
    upload
 }


//  const multer = require('multer');
// const path = require('path');

// const storeImageSandwich = multer.diskStorage({
//     destination: function(req,file,callback){
//         callback(null, '../public/images/Sanguches')
//     },
//     filename : function(req,file,callback){
//         callback(null, `${Date.now()}_products_${path.extname(file.originalname)}`)
//     }
// });

// const uploadImageSandwich = multer({
//     storage : storeImageSandwich
// });


// module.exports = {
//     uploadImageSandwich
// }