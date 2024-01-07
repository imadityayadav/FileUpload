const File = require("../models/File");
const cloudinary = require('cloudinary').v2;
//local file upload
exports.localFileUpload = async (req,res)=>{
    try{
        const file = req.files.file;
        console.log("File uploaded Successfully",file);

        let path = __dirname + "/files/" + Date.now() +  `.${file.name.split('.')[3]}`;
        console.log("Path is",path)

        file.mv(path, (err)=>{
            console.log(err);
        });

        res.json({
            success:true,
            message:"File Upload Successfully"
        });

    }catch(err){
        console.log(err);
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder){
    const options = {folder};
    options.resource_type = "auto"

    if (quality) {
        options.quality = quality;
    }

    await cloudinary.uploader.upload(file.tempFilePath, options);
}
//image upload Handler
// exports.imageUpload = async (req,res)=>{  
//     try{
//         //data fetch
//         const {name,tags,email} = req.body;
//         console.log(name,tags,email);

//         const imageFile = req.files.imageFile;
//         console.log("File",imageFile);

//         //validation
//         const supportedTypes = [
//             "jpg",
//             "png",
//             "jpeg"
//         ];
//         const fileType  = file.name.split('.')[1].toLowerCase();

//         if(!isFileTypeSupported(fileType, supportedTypes)){
//             return res.status(400).json({
//                 success:false,
//                 message:"File type not supported"
//             });
//         };

//         //if supported types

//         const response = await uploadFileToCloudinary(file,"files");

//         //db me entry
//         const fileData = await File.create({
//             name,
//             tags,
//             email,
//             imageurl
//         })

//         res.json({
//             success:true,
//             message:'Image successfully uploaded',
//         })
//     }catch(err){
//         console.error(err)
//         res.status(400).json({
//             success:false,
//             message:'Something went wrong'
//         });
//     }
//  }
exports.imageUpload = async (req, res) => {
    try {

        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // Fetch file 
        const imageFile = req.files.imageFile;
        console.log(imageFile);

        const supportedTypes = ["png", "jpg", "jpeg"];
        const fileType = imageFile.name.split('.')[1].toLowerCase();

        // Check file type is supported or not 
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // Upload to Cloudinary
        const response = await uploadFileToCloudinary(imageFile, "files");
        console.log(response)


        // Upload to DB 
        const fileData = await File.create({
            name,
            tags,
            email,
           imageUrl: response.secure_url
        })


        res.json({
            success: true, 
            imageUrl:response.secure_url,
            message: "File uploaded successfully",
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}
    //Vedio Uplopad 
exports.videoUpload = async (req, res) => {
    try {
        // Fetch Data 
        const { tags, email } = req.body;
        const name = req.body;
        console.log(name, tags, email);
        

        const vfile = req.files.vfile;
        console.log(vfile);

        // Validation 
        const supportedTypes = ["mp4", "mov"];
        // const fileType = vfile.name.split('.')[1].toLowerCase();

        const fileType = vfile.name.split('.')[1].toLowerCase();
        

        // HW - File Maximum 5MB
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // Supported 
        // File Upload to the Cloudinary 
        const response = await uploadFileToCloudinary(vfile, "files");
        console.log(response);

        // Upload To DB
        const vidFile = new File({
            name,
            tags,
            email,
            // fileUrl: response.secure_url,
        })

        const file = await vidFile.save();

        res.json({
            success: true,
            message: "video file uploaded successfully",
            // file: file
        })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.imageReducer = async (req, res) => {
    try {

        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // Fetch file 
        const imageFile = req.files.imageFile;
        console.log(imageFile);

        const supportedTypes = ["png", "jpg", "jpeg"];
        const fileType = imageFile.name.split('.')[1].toLowerCase();
        

        // Check file type is supported or not 
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // Upload to Cloudinary
        // HW - Decrease size by height and width 
        const response = await uploadFileToCloudinary(imageFile, "FileApp", 50);
        console.log(response)


        // Upload to DB 
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: response.secure_url
        })


        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            file: fileData
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


