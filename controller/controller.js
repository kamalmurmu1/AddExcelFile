/* Require modules and files */
const CandidateData=require('../models/Candidates');
const mongoose=require('mongoose');
const xlsx=require('xlsx');
const fs=require('fs');


exports.PostRequest=(req,res)=>{

    if(req.files)
    {
        if(req.files.filesToJ.mimetype=='application/vnd.ms-excel'||req.files.filesToJ.mimetype=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        {
            var path1=__dirname+"/filedata/";
            var y=req.files.filesToJ;
            y.mv(path1+y.name,function(err){
                if(err)
                {
                    console.log(err);
                }
                else{
                    console.log("Uploaded successfully");
                    var wb=xlsx.readFile(path1+y.name,{cellDates:true});
                    var name1=wb.SheetNames[0];
                    var ws=wb.Sheets[name1];
                    var data=xlsx.utils.sheet_to_json(ws);
                    console.log(data.length);
                    for(var i=0;i<data.length;i++)
                    {
                        // console.log(data[i]);
                        let pack1=new CandidateData();
                        pack1.nameOfTheCandidate=data[i]['Name of the Candidate'];
                        pack1.email=data[i]['Email'];
                        pack1.mobileNo=data[i]['Mobile No.'];
                        pack1.dateOfBirth=data[i]['Date of Birth'];
                        pack1.workExperience=data[i]['Work Experience'];
                        pack1.resumeTitle=data[i]['Resume Title'];
                        pack1.currentLocation=data[i]['Current Location'];
                        pack1.postalAddress=data[i]['Postal Address'];
                        pack1.currentEmployer=data[i]['Current Employer'];
                        pack1.currentDesignation=data[i]['Current Designation'];
                        if(pack1.email===""&&pack1.nameOfTheCandidate==="")
                        {
                            continue;
                        }
                        CandidateData.find({"email":pack1.email},function(err,d12){
                            if(d12.length>0)
                            {
                                console.log("Data presented ");
                            }
                            else{
                                pack1.save(function(err){
                                    if(err)
                                    {
                                        console.log(err);
                                    }
                                    console.log(pack1.email);
                                    // console.log("Inserted ");
                                });
                            }
                        });
                                   
                    }
                    fs.unlink(path1+y.name,function(err){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("Deleted Successfully. ");
                        }
                    });
                    fs.readFile('public/successpage.html','utf-8',function(err,content){
                        if(err)
                        {
                            console.log("Error");
                            res.send("Page Not Found.");
                        }
                        else{
                            res.send(content);
                        }
                    });
                }
            });
            
        }
        else{
            fs.readFile('public/errorpage.html','utf-8',function(err,content){
                if(err)
                {
                    console.log("Error");
                    res.send("Page Not Found.");
                }
                else{
                    res.send(content);
                }
            });
        }
        
    }
    else{
        fs.readFile('public/errorpage.html','utf-8',function(err,content){
            if(err)
            {
                console.log("Error");
                res.send("Page Not Found.");
            }
            else{
                res.send(content);
            }
        });
    }

};