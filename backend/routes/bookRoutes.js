const express = require('express');

const Book = require('../models/bookModel');

const router = express.Router();

// create a new book and store it in the DB
router.post('/create',async(req,res,next)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).json({
                message:'Please fill in all fields',
            })
        }
        // temporary class for book
        const newBook = {
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        }
        // newly created book instance from the DB 
        const book=await Book.create(newBook);
        return res.status(201).json(book);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error
        })
    }
});

// GET ALL BOOKS
router.get('/all',async (req,res,next)=>{
    try {
        const books=await Book.find();
        return res.status(200).json({
            count:books.length,
            data:books,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message,
        })
    }
});

// GET A SINGLE BOOK
router.get('/retrieve/:id',async (req,res,next)=>{
    try {
        const id=req.params.id;
        const book=await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message,
        })
    }
});

// PUT A SINGLE BOOK (UPDATE)
router.put('/update/:id',async (req,res,next)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).json({
                message:'Please fill in all fields',
            });
        }
        const id=req.params.id;
        const result =await Book.findByIdAndUpdate(id, req.body);

        if(!result)
        {
            return res.status(404).json({
                message:'Book not found',
            });
        }
        return res.status(200).send({
            message:'Book updated successfully',
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message,
        })
    }
});

// DELETE A SINGLE BOOK
router.delete('/delete/:id',async(req,res,next)=>{
    try {
        const id=req.params.id;
        const result=await Book.findByIdAndDelete(id);

        if(!result)
        {
            return res.status(404).json({
                message:'Book not found',
            });
        }

        res.status(200).json({
            message:'Book deleted successfully',
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message,
        })
    }
});

module.exports=router;



