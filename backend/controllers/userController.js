// controller function for user register and login

const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

//register user
exports.registerUser = async (req, res) => {
    try{
         
         const {name, email, password} = req.body;


         const existingUser = await User.findOne({email});
         if(existingUser){
            return res.status(400).json({message: 'User with this email already exist'});
         }

         const saltRounds = 10;
         const hashedPassword = await bcrypt.hash(password, saltRounds);
         const newUser = new User({name, email, password: hashedPassword});
         await newUser.save();

         res.status(201).json({message: 'User registered successfully'});

    } catch (error) {
        console.error('Error during user registration:', error.message); 
        res.status(500).json({message: 'Server error', error});
    }
};

//login user
exports.loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        //storing user session
        req.session.user = {
            _id: user._id,
            email: user.email,
            role: user.role
        };

        res.json({message:'Login successful',  user: req.session.user});

    } catch (error) {
        res.status(500).json({message:'Server Error', error});
    }
};

//user logout
exports.logoutUser = (req, res) => {
    req.session.destroy((err)=>{
        if(err) {
            return res.status(500).json({message: 'Unable to logout'});
        }
        res.json({ message: 'Logout successful' });
    });
};