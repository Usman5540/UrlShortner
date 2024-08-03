const User=require('../models/signup')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
async function SignUP(req,res) {
     const  {name,email,password}=req.body;
    const hashedPassword = await bcrypt.hash(password,8);

    try {
        const newUser=  await  User.create({
            name,
            email,
            password:hashedPassword,
        })
        console.log(newUser);

        return res.redirect('/login');
    } catch (error) {
        res.status(500).json({message:'internal server error'});
    }
   
      }
async function login(req,res){
       try {
        const { email, password } = req.body;
        
        // Find the user by email
        const user = await User.findOne({ email });
           console.log(user);
        // If user is not found
        if (!user) {
            return res.render('SignUp');
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
                console.log(isPasswordValid);
        // If passwords do not match
        if (!isPasswordValid) {
            //  res.render("login", { email,error: "Incorrect password. Please try again." });
            return res.render('login',{error:"wrong password Enter Valid password"});
        }
        const token= jwt.sign({_id:user._id},'ok');
        console.log(token);
        res.cookie("token",token,
          { maxAge: 900000, httpOnly: true },
        )
        
        // If passwords match, user is authenticated
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return res.status(500).render('Error', { message: 'An error occurred. Please try again later.' });
    }


}



module.exports={
    SignUP,
    login
}