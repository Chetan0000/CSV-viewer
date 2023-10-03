
const fs = require('fs');
const csv_parser = require('csv-parser');
const CSV = require('../models/csv');
const path = require('path');

// function to render files from data Base
module.exports.home = async(req, res) => {
    await CSV.find({})
    .then(file => {
        // console.log(file);
        return res.render('home',{
            title:"CSV-viewer",
            files:file
        })
    })
    .catch(error => {
        console.log(`Error in rendering the files From Data Base ${error}`);
        return;
    })
    
}


// function to upload file 
module.exports.upload = async(req, res) => {
    if(!req.file){
        return res.status(400).send('No files were uploaded.');
    }
    // req.file.mimetype != "text/csv"
    if(req.file.mimetype != "text/csv"){
        return res.status(400).send('Select CSV files only.');
    }
    await CSV.create({
        fileName:req.file.originalname,
        filePath:req.file.path,
        file:req.file.filename
    })
    .then(file => {
        return res.redirect('back');
    })
    .catch( error => {
        console.log(`Error in adding file to data Base ${error}`);

    })
    
}

// function to view file 

module.exports.view = async(req, res) => {
    
    let csvFile = await CSV.findOne({file: req.params.id})
    const results = []
    const header = []

    fs.createReadStream(csvFile.filePath)
    .pipe(csv_parser())
    
    .on('headers', (Headers) => {
        Headers.map((head) => {
            Headers.push(head);
        })
    })
    .on('data',(data) => {
        results.push(data);
    })
    .on('end', () => {
        return res.render('view',{
            title:" File Viewer",
            fileName: csvFile.fileName,
            head: header,
            data: results,
            length: results.length
        })
    })
    

}

// function to delete file from Data Base

module.exports.destroy = async(req, res) => {
    await CSV.deleteOne({file: req.params.id})
    .then(file => {
        return res.redirect('back');
    })
    .catch( error => {
        console.log(`Error in deleting file form Data Base ${error}`);
        return res.redirect('back');
    })
}