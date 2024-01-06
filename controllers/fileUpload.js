const File = require("../models/File");

//local file upload
exports.localFileUpload = async (req,res)=>{
    try{
        const file = req.files.file;
        console.log("File uploaded Successfully",file);

        let path = __dirname + "/files/" + Date.now() +  `.${file.name.split('.')[3]}`;
        console.log

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