import { response } from "express";

import grid from 'gridfs-stream';
import mongoose from 'mongoose';
import {v2 as cloudinary} from 'cloudinary'

const url = 'http://localhost:8000'

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
})

export const uploadImage = async(request, response) => {
    try{
        // console.log(request.files)
        const {image} = request.files;
        await cloudinary.uploader.upload(image.tempFilePath, (err, result)=>{
            if(err){
                return response.status(500).json({error: err})
            }
            else{
                return response.status(202).json({"imageurl": result.url})
            }
        })
    } 
    catch(err){
        console.log(err.message)
        response.status(500).json({error: err.message}) 
    }
}

export const getImage = async (request, response) => {

    try{
        const file = await gfs.files.findOne({ filename: request.params.filename });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        return response.status(500).json({msg: error.message})
    }
}

