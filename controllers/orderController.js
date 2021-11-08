const order = require("../model/order")
const orderChema = require("../model/orderChema");
const Product = require("../model/product");

module.exports = {
    createOrder : async function(req,res,next){
        
        const cartId = req.params.cartId;

        const product = await Product.findOne({_id:cartId})
        if(req.session.cart == null){
          req.session.cart = [
            {product:product,quantity:1}
          ]
        }else{
          var index=-1;
          for(var i=0; i<req.session.cart.length;i++){
            if(req.session.cart[i].product._id === cartId){
              index=i
              break
            }
          }
          if(index == -1){
            req.session.cart.push({product:product,quantity:1})
          }else{
            req.session.cart[index].quantity++
          }
        }
        console.log(req.session.cart);

        
    }
}