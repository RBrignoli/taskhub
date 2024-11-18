const jwt = require('jsonwebtoken')
const {cookieValidator} = require("../middlewares/cookieValidator")


//import jwt from "jsonwebtoken"

describe('vou testar o validador de cookie', () =>{

    let req, res, next
    process.env.jwt_secret_key = 'alguma-senha-secreta'
    beforeEach(() =>{
        
        req = {cookies: {} },
        res = { 
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        },
        next = jest.fn()
    })

    it('o token não existe', ()=>{
        cookieValidator(req, res, next)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith("Unauthorized: No token provided.")

        expect(next).not.toBeCalled()
        //expect(res.status).toBe(401)
       // expect(true).toBe(true)
    })
    expect(true).toBe(true)

    it('o token existe, mas é inválido', ()=>{
        
        req.cookies.Token = 'algum_token_invalido'

        cookieValidator(req, res, next)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith("Unauthorized: Invalid token.")

        expect(next).not.toBeCalled()

    })

    it('o token existe e é válido', ()=>{


        const token = jwt.sign(
            {
              _id: 1,
              email: 'exemplo@gmail.com',
              name: 'Marcos',
              admin: false
            },
            process.env.jwt_secret_key,
            { expiresIn: 1000 * 60 * 60 * 24 * 3 }
        );
        req.cookies.Token = token
        cookieValidator(req,res, next)
        
        expect(next).toBeCalled()
    })
}) 


