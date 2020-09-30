import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { app, server } from '../app';
import { getData } from '../controllers/indexController';

chai.use(chaiHttp);

//configuraciones
chai.should();


describe('Http Index', () => {
    after((done) => {
        server.close();
        done();
    });
    describe('GET /', () => {
        it('200 OK', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    // una vez se recupera el estatus done sirve para aclarar que ya esta hecho y que se ha pasado a la siguiente si hiciese mas it se veria el orden corespondiente
                    // asincronas o se puede hacer con promesas
                    done();
                });
        });
        it('Debe recibirse un array con todos los ToDos', (done) => {
            getData().then((data) => {
                expect(data).not.to.be.empty;
                expect(data).to.be.a('Array');
                done();
            });
        });
    });
});

describe('GET 404', () => {
    it('ERROR 404', () => {
        return chai.request(app)
            .get('/bu')
            .then((res) => {
                res.should.have.status(404);
                //promesa, debemos devolver algo
            }, (err) => {
                Promise.reject();
            });
    });
});

