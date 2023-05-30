const {MongoClient,ObjectId} = require('mongodb');
const Price = require('../models/Price');

const getPrices = async (req, res) => {
	try {
	  const data = await Price.find();
	  if (data) {
		res.status(200).json(data);
	  } else {
		res.status(400).json({ success: false });
	  }
	} catch (err) {
	  res.status(400).json({ success: false });
	  console.log(err);
	}
  };

const addPrice = async (req, res) => {
	try {
	  if (req.body.title && req.body.price) {
		const { title, price } = req.body;
		const newPrice = new Price({ title: title, price: price });
  
		const isSuccess = await newPrice.save()
					if(isSuccess){
						res.status(200).json({success:true})
					}
	  }
	} catch (error) {
	  res.status(400).json({ success: false });
	  console.log(error);
	}
  };

const removePrice = async (req, res) => {
	try {
	  const id = req.params.id;
	  if (id) {
		await Price.findByIdAndDelete(id)
		res.status(200).json({success:true})
	  }
	} catch (err) {
	  console.log(err);
	  res.status(400).json({ success: false });
	}
  };


const editPrice = async (req, res) => {
	try {
	  const id = req.params.id;
	  const {title, price} = req.body
	  if (id) {
		const newPrice = await Price.findById(id);
		newPrice.title = title;
		newPrice.price = price;
		   const result = await newPrice.save()
		   if(result) {
				res.status(200).json({ success: true });
			  } else {
				res.status(400).json({ success: false });
			  }
			}
	  }
	 catch (err) {
	  res.status(400).json({ success: false });
	  console.log(err);
	}
  };

module.exports = {getPrices,addPrice,removePrice,editPrice}
