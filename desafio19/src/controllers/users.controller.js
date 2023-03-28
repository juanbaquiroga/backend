export const login = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/user')
    }else{
        res.render('login')
    }
}
export const logout = (req, res) => {
    const user = req.user
    req.logout(() => {
        console.log("logout complete");
        return res.render('logout', {user: user.username})
    });
}
export const user = (req, res) =>{
    const user = req.user;
    console.log(user);
    res.render('login-ok', {
        username: user.username,
        name: user.name,
        address: user.address,
        email: user.email,
        img: user.img,
        phone: user.phone,
        age: user.age
    })
}
export const register = (req, res)=>{
    if (req.isAuthenticated()) {
        res.redirect('/user')
    }
    res.render('register')
}