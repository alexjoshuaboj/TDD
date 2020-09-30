import chai from 'chai';
import IndexController from '../controllers/indexController';

const { expect } = require("chai");
const { getYear, gethola } = require("../controllers/helpers");

//skip or only para dar prioridad a los tests
// esto solo utilizaremos para no hacer una prueba durante un determinado tiempo, porque si nos olvidamos de quitarlo no sabremos donde esta si la apvlicacion es grande 

describe('Helpers', () => {
    // testea el metodo getYear
    describe('Test getYear function', () => {
        it('Get number', () => {
            // -- assert 
            // metodos con uno o varios parametros
            // -- expect/should 
            // practicamente hablar en ingles 
            const year = getYear();
            expect(year).to.be.a('number');
        });
        it('Is this year', () => {
            const myYear = new Date().getFullYear();
            const year = getYear();
            expect(year).to.be.at.most(myYear + 1);
            expect(year).to.be.at.least(myYear - 1);
            expect(year).to.be.within(1970, 2100);

        });
    });

    describe('Test Hola Mundo', () => {
        it('Devuelve un String', () => {
            const saludo = gethola();
            expect(saludo).to.be.a('string');
        });

        it('Devuelve un hola', () => {
            const saludo = gethola();
            expect(saludo).to.have.string('Hola');
            expect(saludo).to.not.have.string('Gola');
        });
    });

    describe('Test tipos de objetos', () => {
        it('Comparar tipos', () => {
            //se hace mucho para ejemplos 
            const obj = {};
            expect(obj).to.be.a('Object');
            expect(obj).to.not.be.a('Array');

            let _null;
            expect(_null).to.be.undefined;
            _null = null;
            expect(_null).to.be.null;
        });

        it('Comparar objetos', () => {
            const obj1 = { name: 'Jorge' };
            const obj2 = { name: 'Jorge' };
            expect(obj1).to.have.property('name');
            expect(obj1).to.deep.equal(obj2);
            expect(obj1).to.have.keys(['name']);
            expect(obj1).to.have.any.keys(['name']);
            expect(obj1).to.have.all.keys(['name']);

            expect(obj1).to.be.instanceOf(Object);
        });

        it('Clases ok', () => {
            const instancia = new IndexController();
            expect(instancia).to.be.instanceOf(IndexController);
        })

        it('Comparar errores', () => {
            const generarError = () => {
                throw new TypeError('Error de BBDD');
            };
            expect(generarError).to.throw();
            expect(generarError).to.throw(TypeError);
            expect(generarError).to.throw('BBDD');
            const error = new TypeError('Error de BBDD');
            error.code = 500;
            const generarError2 = () => {
                throw error;
            }
            expect(generarError2).to.throw(error);
            expect(generarError2).to.throw(TypeError).with.property('code', 500);
        });
    });
});
