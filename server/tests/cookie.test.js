const { cookieValidator } = require('../middlewares/cookieValidator')
const jwt = require('jsonwebtoken')

describe('testar a validacao do cookie JWT', () => {
    let req, res, next
    process.env.jwt_secret_key = 'uma_secret_key_qualquer'
    beforeEach(() => {
        req = { cookies: {} }
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
        next = jest.fn()
    })
    it('deve retornar 401 quando o token não for fornecido', () => {
        cookieValidator(req, res, next)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith('Unauthorized: No token provided.')
        expect(next).not.toHaveBeenCalled()
    })
    it('deve retornar 401 quando o token for invalido', () => {
        req.cookies.Token = 'token_qualquer'
        cookieValidator(req, res, next)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith('Unauthorized: Invalid token.')
        expect(next).not.toHaveBeenCalled()
    })
    it('deve permitir acesso e chamar o next() quando o token e valido', () => {
        const token = jwt.sign(
            {
              _id: 1,
              email: 'teste@teste.com',
              name: 'teste',
              admin:  false
            },
            process.env.jwt_secret_key,
            { expiresIn: 1000 * 60 * 60 * 24 * 3 }
          );
        req.cookies.Token = token
        cookieValidator(req,res,next)
        expect(res.status).not.toHaveBeenCalled()
        expect(res.send).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })
})