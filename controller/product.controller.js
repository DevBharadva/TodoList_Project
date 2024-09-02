// const products = require('../mock_data.json');

// exports.addNewProduct = (req,res)=>{
//     products.push(req.body);
//     res.json({product: req.body, message:'products Added success'});
// };

// exports.getAllProducts = (req,res)=>{
//     res.json(products)
// };

// exports.getProduct = (req,res)=>{
//     let id = +req.params.id;
//     let ProductIndex = products.find((products) => products.id === id);


//     res.json(ProductIndex)
// };


// exports.replaceProduct = (req,res)=>{
//     let id = +req.params.id;
//     let ProductIndex = products.findIndex((products) => products.id === id);

//     products.splice(ProductIndex,1,{...req.body});
//     res.json({message:'replace products Succesfully'})
// };

// exports.upateProduct = (req,res)=>{
//     let id = +req.params.id;
//      let ProductIndex = products.findIndex((products) => products.id === id);
//     const products = products[ProductIndex];

//     products.splice(ProductIndex,1,{...products,...req.body});
//     res.json({message:'Update products Succesfully'})
// };

// exports.deletePreoduct = (req,res)=>{
//     let id = +req.params.id;
//     let ProductIndex = products.findIndex((products) => products.id === id);
//     const products = products[ProductIndex];

//     products.splice(ProductIndex,1);
//     res.json({message:'Delete products Succesfully'})
// };


const Product = require("../model/product.model");

exports.addNewProduct = async (req, res) => {
    try {
        const { productName, productPrice, Validity, Quntity } = req.body;
        let product = await Product.findOne({productName:productName,isDelete:false})
        if(product)
            return res.status(400).json({message:"Product Alreday Exist..."})
        product = await Product.create({
            productName, productPrice, Validity, Quntity,
        });
        product.save();
        res.status(201).json({product,messege:"Product Added"})      
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
};

exports.getAllProducts = async(req,res)=>{
    try {
        const product = await Product.find({isDelete:false});
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error..."});
    }
};

exports.getProduct = async (req,res)=>{
    try {
        const product = await Product.findOne({_id:req.query.productId});
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error..."});
    }
};

// exports.UpdateProduct = async (req,res)=>{
//     try {
//         const productId = req.body.productId;
//         // const updateProductName = req.body.productName;
//         // const updateQuntity = req.body.Quntity;
//         const product = await Product.findByIdAndUpdate(productId, {"productName":"ihpone16"});
//        res.status(202).json({product,message:"Product Update Succeccfully..."});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({msg:"Internal server erorr"});
//     }
// }

exports.UpdateProduct = async (req,res)=>{
    try {
        let product = await Product.findOne({_id:req.query.productId});
        if(!product){
            return res.status(404).json({message:'Product not Found...'});
        }
        product = await Product.updateOne({_id:req.query.productId},{$set:req.body},{new:true});
        // product.save();
        res.status(202).json({product,message:"Product Updatew Success"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}


// exports.DeleteProduct = async (req,res)=>{
//     try {
//         const productId = req.body.productId;
//         const product = await Product.findByIdAndDelete(productId);
//         res.status(204).json({product,message:"Product Delete SuccessFully..."})
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({msg:"Internal Server Error..."});
//     }
// }

exports.DeleteProduct = async (req,res)=>{
    try {
        let product = await Product.findOne({_id:req.query.userId},{isDelete:false});
        if(!product){
            return res.status(404).json({message:"Product Not Found..."});
        }
        product = await Product.deleteOne(
            product._id,
            {$set:{isDelete:true}},
            {new:true}
        );;
        res.status(200).json({product,message:"Product Delete Success"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}