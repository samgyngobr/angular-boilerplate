import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { logging } from 'selenium-webdriver';

const nomes      : string[] = [ 'Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Charlotte', 'Mia', 'Amelia', 'Harper', 'Evelyn', 'Abigail', 'Emily', 'Elizabeth', 'Mila', 'Ella', 'Avery', 'Sofia', 'Camila', 'Aria', 'Scarlett', 'Victoria', 'Madison', 'Luna', 'Grace', 'Chloe', 'Penelope', 'Layla', 'Riley', 'Zoey', 'Nora', 'Lily', 'Eleanor', 'Hannah', 'Lillian', 'Aubrey', 'Ellie', 'Stella', 'Natalie', 'Zoe', 'Leah', 'Hazel', 'Violet', 'Audrey', 'Brooklyn', 'Bella', 'Claire', 'Skylar', 'Lucy', 'Everly', 'Anna', 'Caroline', 'Nova', 'Emilia', 'Kennedy', 'Samantha', 'Maya', 'Willow', 'Kinsley', 'Naomi', 'Elena', 'Sarah', 'Ariana', 'Allison', 'Gabriella', 'Alice', 'Madelyn', 'Cora', 'Ruby', 'Eva', 'Serenity', 'Autumn', 'Adeline', 'Hailey', 'Gianna', 'Valentina', 'Isla', 'Eliana', 'Quinn', 'Ivy', 'Piper', 'Lydia', 'Alexa', 'Josephine', 'Julia', 'Sophie' ];
const sobrenomes : string[] = [ 'Altoe', 'Sossai', 'Agrizzi', 'De Angeli', 'Ferreira', 'Braga', 'da Silva', 'Della Coletta', 'Zampirolli', 'Fernandes', 'Alves', 'Costalonga', 'Botteon', 'Caliman', 'de Oliveira', 'Zanette', 'Salvador', 'Silva', 'Zandonadi', 'Pesca', 'Falqueto', 'Tosi', 'da Costa', 'de Souza', 'Gomes', 'Calmon', 'Pereira', 'Sossai detto Pegorer', 'de Almeida', 'de Jesus', 'Martins', 'Balarini', 'Rodrigues', 'Gonçalves', 'Pizzol', 'Moreira', 'Vieira', 'Venturim', 'Bazoni', 'Filete', 'Almeida', 'Correa', 'Oliveira', 'dos Santos', 'Falchetto', 'Barbosa', 'Breda', 'Scaramussa', 'de Barros', 'Marques' ];
const produtos   : string[] = [ 'Pepsi', 'Coca Cola', 'Skoll', 'Biz', 'LaFruit', 'Danone' ];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const { url, method, headers, body } = request;


    // wrap in delayed observable to simulate server api call
    return of( null )
      .pipe( mergeMap( handleRoute ) )
      .pipe( materialize() ) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe( delay( 500 ) )
      .pipe( dematerialize() );


    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////


    function handleRoute()
    {
      switch (true)
      {
        //////////////////////////////////////////////////////////////////////////

        case url.endsWith( '/api/login' ) && method === 'POST' :
          if( body.email == 'teste@teste.com' )
            return login();
          else
            return loginFail();

        //////////////////////////////////////////////////////////////////////////

        case url.endsWith('/dashboard') && method === 'GET' :
          return dashboard();

        //////////////////////////////////////////////////////////////////////////

        case url.endsWith('/posts') && method === 'GET' :
          return posts();

        //////////////////////////////////////////////////////////////////////////

        case url.endsWith('/inventory'       ) && method === 'GET'  : return products();
        case url.endsWith('/inventory/create') && method === 'GET'  : return _new();
        case url.endsWith('/inventory/create') && method === 'POST' : return retOk();
        case url.endsWith('/inventory/1'     ) && method === 'GET'  : return edit();
        case url.endsWith('/inventory/1'     ) && method === 'POST' : return retOk();

        //////////////////////////////////////////////////////////////////////////

        default:
          // pass through any requests not handled above
          return next.handle(request);

        //////////////////////////////////////////////////////////////////////////

      } // switch (true)

    } // function handleRoute()


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // route functions
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function login()
    {
      return ok({
        status : 'ok',
        data   : {
          id   : 1,
          name : 'Fulano',
        }
      });
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function loginFail()
    {
      return error('wrong password');
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function retOk()
    {
      return ok({
        message : 'ok',
      });
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function retError()
    {
      return error({
        message : 'Error',
      });
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function dashboard()
    {
      return ok({
        content : 'dashboard content',
      });
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function list()
    {
      return ok({
        total : 2,
        data  : [
          { 'id' : 1, 'title' : 'teste 1', 'type' : 'A', 'active' : true },
          { 'id' : 2, 'title' : 'teste 2', 'type' : 'B', 'active' : true },
        ]
      });
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function edit()
    {
      return ok({
        'form' : {
          'types' : [
            { 'id' : 1, 'title' : 'A', },
            { 'id' : 2, 'title' : 'B', },
            { 'id' : 3, 'title' : 'C', },
          ]
        },
        'data' : {
          'id'     : 1,
          'title'  : 'teste 1',
          'type'   : 1,
          'active' : true,
        }
      });
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function _new()
    {
      return ok({
        'form' : {
          'types' : [
            { 'id' : 1, 'title' : 'A' },
            { 'id' : 2, 'title' : 'B' },
            { 'id' : 3, 'title' : 'C' },
          ]
        }
      });
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function scrumboardDetailsPost()
    {
      return ok({});
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function products()
    {
      let ar  = [];
      let tot = 50;

      for ( let index = 0; index < tot; index++ )
      {
        ar.push({
          "id"    : 1, //Math.floor( Math.random() * 100) + 1,
          "title" : produtos[ Math.floor( Math.random() * produtos.length ) ],
        });
      }

      return ok({
        'success': true,
        'total'  : 50,
        'data'   : ar
      });
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function posts()
    {
      let ar  = [];
      let tot = 50;

      for ( let index = 0; index < tot; index++ )
      {
        ar.push({
          "id"             : Math.floor( Math.random() * 100) + 1,
          "data"           : Math.floor( Math.random() * (31 - 1) + 1 ) + "/" + Math.floor( Math.random() * (12 - 1) + 1 ) + "/2019",
          "lastInteraction": Math.floor( Math.random() * (31 - 1) + 1 ) + "/" + Math.floor( Math.random() * (12 - 1) + 1 ) + "/2020",
          "name"           : nomes[Math.floor(Math.random() * nomes.length)] + ' ' + sobrenomes[Math.floor(Math.random() * sobrenomes.length)] + ' ' + sobrenomes[Math.floor(Math.random() * sobrenomes.length)],
          "produto"        : 'Prod.',
          "atendente"      : nomes[Math.floor(Math.random() * nomes.length)] + ' ' + sobrenomes[Math.floor(Math.random() * sobrenomes.length)] + ' ' + sobrenomes[Math.floor(Math.random() * sobrenomes.length)],
          "unidade"        : 'Unidade',
          "equipe"         : 'Equipe',
          "pontoConversao" : 'pc',
          "percepcao"      : 'M',
          "perc"           : 0,
          "status"         : 'A',
        });
      }

      return ok({
        'success': true,
        'total'  : 50,
        'data'   : ar
      });
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // helper functions

    function ok(body:any)
    {
      return of(new HttpResponse({ status: 200, body }))
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function error(message:any)
    {
      return throwError({ error: { message } });
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function unauthorized()
    {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function isLoggedIn()
    {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide  : HTTP_INTERCEPTORS,
  useClass : FakeBackendInterceptor,
  multi    : true
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////