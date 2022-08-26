const express = require('express')
const router = express.Router();
const Note = require('../models/Note');
const {isAuthenticated}= require ('../helpers/auth')

router.get('/notes/add', isAuthenticated,(req,res)=>{
    res.render("notes/newNote")
})
router.post('/notes/new-note', isAuthenticated, async (req,res)=>{
    const {title, description} = req.body
    const errors=[]
    if(!title){
        errors.push({text:"Please write a title"})
    }
    if(!description){
        errors.push({text:"Please write a description"})
    }
    if(errors.length > 0){
        res.render('notes/newNote',{
            errors,
            title,
            description
        })
    }else{
        const newNote = new Note(req.body)
        await newNote.save();
        req.flash('success_msg', 'Note created successfully')
        res.redirect('/notes')
    }
})
router.get('/notes', isAuthenticated, async (req,res)=>{
    const notes = await Note.find().lean().sort({date:'desc'});
    console.log(notes)
    res.render('notes/allNotes', {notes: notes})
})


router.get('/notes/edit/:id', isAuthenticated, async(req,res)=>{
    const {id} = req.params
    try{
        const note = await Note.findById(id).lean()
        res.render('notes/editNote',{note:note})
    }catch(error){
        console.log(error.message)
    }
})
router.post('/notes/edit/:id', isAuthenticated, async (req,res)=>{
    const {id} = req.params
    await Note.findByIdAndUpdate(id, req.body)
    req.flash('success_msg', 'Note updated successfully')
    res.redirect("/notes")
})

router.get('/notes/delete/:id', isAuthenticated, async (req,res)=>{
    const {id} = req.params
    await Note.findByIdAndDelete(id)
    res.redirect('/notes')
})

router.get('/notes/done/:id', isAuthenticated, async(req,res)=>{
    const {id} = req.params
    let statusNote = await Note.findById(id)
    statusNote.done = !statusNote.done
    await statusNote.save()
    res.redirect('/notes')
})
module.exports= router;