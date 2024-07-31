"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const fs = require("fs");
const process = require("node:process");
let VideoService = class VideoService {
    async initVideo() {
        const client = await mongodb_1.MongoClient.connect(process.env.DATABASE_URL);
        const db = client.db('videos');
        const bucket = new mongodb_1.GridFSBucket(db);
        const videoUploadStream = bucket.openUploadStream('bigbuck');
        const videoReadStream = fs.createReadStream('videp-upload/bigbuck.mp4');
        videoReadStream.pipe(videoUploadStream);
    }
    async streamVideo(range, res) {
        const client = await mongodb_1.MongoClient.connect(process.env.DATABASE_URL);
        const db = client.db('videos');
        const video = await db.collection('fs.files').findOne({});
        if (!video) {
            res.status(404).send("No video uploaded!");
            return;
        }
        const videoSize = video.length;
        const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
        let start = Number(startStr);
        let end = endStr ? Number(endStr) : videoSize - 1;
        if (isNaN(start) || isNaN(end) || start > end || start >= videoSize) {
            res.status(416).send("Requested range not satisfiable");
            return;
        }
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };
        res.writeHead(206, headers);
        const bucket = new mongodb_1.GridFSBucket(db);
        const downloadStream = bucket.openDownloadStreamByName('bigbuck', { start });
        downloadStream.on('error', (error) => {
            console.error('Download stream error:', error);
            if (!res.headersSent) {
                res.status(500).json(error);
            }
        });
        downloadStream.pipe(res).on('error', (error) => {
            console.error('Error during streaming:', error);
            if (!res.headersSent) {
                res.status(500).json(error);
            }
        });
    }
    async retryStream(range, res, client, db) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const video = await db.collection('fs.files').findOne({});
        if (!video) {
            res.status(404).send('No video uploaded!');
            return;
        }
        const videoSize = video.length;
        const [startStr, endStr] = range.replace(/bytes/, "").split("-");
        let start = Number(startStr);
        let end = Number(endStr);
        if (isNaN(start) || isNaN(end) || start > end || start >= videoSize) {
            res.status(406).send("Requested range not satisfiable");
            return;
        }
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };
        res.writeHead(206, headers);
        const bucket = new mongodb_1.GridFSBucket(db);
        const downloadStream = bucket.openDownloadStreamByName('bigbuck', { start });
        downloadStream.on('error', (error) => {
            res.status(500).json(error);
        });
        downloadStream.pipe(res);
    }
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, common_1.Injectable)()
], VideoService);
//# sourceMappingURL=video.service.js.map