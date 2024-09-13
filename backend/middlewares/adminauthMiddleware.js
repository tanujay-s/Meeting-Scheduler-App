const isAdmin = (req, res, next) =>{
    if(req.session && req.session.user.role === "admin"){
        next();
    }
    else {
        res.status(403).json({message:'Unauthorized access'});
    }
};

module.exports = isAdmin;