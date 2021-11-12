const JWT = require("jsonwebtoken");
const privateKey = "abrete_sesamo";


async function getjwtToken(req, res){
    
    ///Imaginar que hay una validación de usuario

    const payload = {
        userid: "wasdasd",
        exp: Date.now() + (60 * 1000) //Valida por treinta segundo

    };

    const tokenJwt = await JWT.sign(payload,privateKey, {algorithm: "HS256"});

    res.status(200).json({
        jwt:tokenJwt
    })

}

async function verifyToken(req,res,next){
    const authHeader = req.headers.authorization;

    if (authHeader){
        const authToken = authHeader.replace("Bearer ","").replace("bearer ","")
        console.log(authHeader)
        console.log(authToken)

        try {
            await JWT.verify(authToken,privateKey)
            next();
        } catch (error) {
            res.status(401).send("Credeniales erroneas")
        }
    }else{
        res.status(401).send("Credeniales erroneas")
    }


}

module.exports = {
    getjwtToken,
    verifyToken
}