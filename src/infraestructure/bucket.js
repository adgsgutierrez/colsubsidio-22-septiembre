const aws= require("aws-sdk");
const fs = require('fs');

class Bucket {

    static instance;
    awsInstance;
    static TYPE_MIME = {
        "BMP": "image/bmp",
        "GIF": "image/gif",
        "PNG": "image/png",
        "JPEG": "image/jpeg",
        "PICT": "image/pict",
        "TIFF": "image/tiff",
        "DWG": "image/vnd.dwg",
        "DXF": "image/vnd.dxf",
        "XCF": "image/x-xcf",
        "SVG": "image/svg+xml"
    }

    constructor(){}

    static get(){
        if(!Bucket.instance){
            Bucket.instance = new Bucket();
        }
        return Bucket.instance;
    }

    async connect(){
        if(!this.awsInstance){
            this.awsInstance = new aws.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                region: process.env.AWS_REGION,
                s3UseArnRegion: true 
            });
        }
        return this.awsInstance;
    }

    async uploadFile(file, name){
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: (!name) ? file.originalname: name,
            Body: fs.createReadStream(file.path)
        };
        return this.awsInstance.upload(params).promise();
    }

    signedUrl(object){
        if(object === null || object === undefined || object === ''){
            return ''
        }
        const ext = object.split('.').pop().toUpperCase();
        const params = {
            Bucket: process.env.AWS_ACCESS_POINT,
            Key: object,
            Expires: 60,
            ResponseContentType: Bucket.TYPE_MIME[ext]
        }
        return this.awsInstance.getSignedUrl('getObject', params)
    }
}

module.exports = Bucket.get();