const {Url}=require('../models/user');
const shortid = require('shortid');


async function UrlGenerator(req,res){
    const body=req.body;
    // console.log(body);
    // Generate a short ID
const id = shortid.generate();
console.log(id);
    if (!body.url) {
    return res.status(400).json({message:"put url first "});
    }
      // Ensure the URL starts with http:// or https://
  let url = body.url;
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  console.log(url);
    try {
      const urlResult=   await  Url.create({
          Shortid:id,
         redirectUrl:url,
         visitHistory:[],
    })
      //  res.status(201).json(urlResult.Shortid);
       return res.render('bitly',{
           shrid:urlResult.Shortid

       });
    } catch (error) {
        res.status(500).json(error.message);
    }
}
     
async function Response(req,res)
{      
  const body=req.body;
    const Shortid=req.params.Shortid;
     console.log(Shortid);
     try {
        const result = await  Url.findOneAndUpdate(
        {Shortid},// key to find user in db
        
        {$push:{visitHistory:{timestamp:Date.now()}}},
      )  
    console.log(result);
    if (!result) {
     return    res.status(404).json({message:"not found"});
    }



    res.redirect(result.redirectUrl);
     }
      catch (error) {
        res.status(500).json(error.message);
     }
}
  async function Analysis(req,res){
              const  {Shortid}=req.params;// can be use instead like Shortid=req.params.Shortid
            const result =  await Url.findOne({Shortid});//failed

            console.log(result.visitHistory.length+1);
            res.status(200).json({total_clicks :result.visitHistory.length+1,
             analysis: result.visitHistory
            });
             
}

module.exports={
UrlGenerator,
Response,
Analysis
}