const isLogin = (req, res, next)=>{
    if (req.path != '/login' && req.path != '/register'){
        if(req.isAuthenticated()){
            next()
        }else{
            res.redirect('/login')
        }
    }else{
        next()
    }
}

export const middlewares = {isLogin}