import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

const names    : string[] = [ 'Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Charlotte', 'Mia', 'Amelia', 'Harper', 'Evelyn', 'Abigail', 'Emily', 'Elizabeth', 'Mila', 'Ella', 'Avery', 'Sofia', 'Camila', 'Aria', 'Scarlett', 'Victoria', 'Madison', 'Luna', 'Grace', 'Chloe', 'Penelope', 'Layla', 'Riley', 'Zoey', 'Nora', 'Lily', 'Eleanor', 'Hannah', 'Lillian', 'Aubrey', 'Ellie', 'Stella', 'Natalie', 'Zoe', 'Leah', 'Hazel', 'Violet', 'Audrey', 'Brooklyn', 'Bella', 'Claire', 'Skylar', 'Lucy', 'Everly', 'Anna', 'Caroline', 'Nova', 'Emilia', 'Kennedy', 'Samantha', 'Maya', 'Willow', 'Kinsley', 'Naomi', 'Elena', 'Sarah', 'Ariana', 'Allison', 'Gabriella', 'Alice', 'Madelyn', 'Cora', 'Ruby', 'Eva', 'Serenity', 'Autumn', 'Adeline', 'Hailey', 'Gianna', 'Valentina', 'Isla', 'Eliana', 'Quinn', 'Ivy', 'Piper', 'Lydia', 'Alexa', 'Josephine', 'Julia', 'Sophie' ];
const surnames : string[] = [ 'Altoe', 'Sossai', 'Agrizzi', 'De Angeli', 'Ferreira', 'Braga', 'da Silva', 'Della Coletta', 'Zampirolli', 'Fernandes', 'Alves', 'Costalonga', 'Botteon', 'Caliman', 'de Oliveira', 'Zanette', 'Salvador', 'Silva', 'Zandonadi', 'Pesca', 'Falqueto', 'Tosi', 'da Costa', 'de Souza', 'Gomes', 'Calmon', 'Pereira', 'Sossai detto Pegorer', 'de Almeida', 'de Jesus', 'Martins', 'Balarini', 'Rodrigues', 'Gonçalves', 'Pizzol', 'Moreira', 'Vieira', 'Venturim', 'Bazoni', 'Filete', 'Almeida', 'Correa', 'Oliveira', 'dos Santos', 'Falchetto', 'Barbosa', 'Breda', 'Scaramussa', 'de Barros', 'Marques' ];
const products : string[] = [ 'Pepsi', 'Coca Cola', 'Skoll', 'Biz', 'LaFruit', 'Danone' ];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////


    return of( null )
      .pipe( mergeMap( handleRoute ) )
      .pipe( materialize() )
      .pipe( delay( 500 ) )
      .pipe( dematerialize() );


    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////


    function handleRoute()
    {
      switch (true)
      {
        //////////////////////////////////////////////////////////////////////////

        case request.url.endsWith( '/api/login' ) && request.method === 'POST' :
          if( request.body.email == 'teste@teste.com' )
            return login();
          else
            return loginFail();

        //////////////////////////////////////////////////////////////////////////

        case request.url.endsWith('/dashboard') && request.method === 'GET' : return dashboard();

        //////////////////////////////////////////////////////////////////////////

        case request.url.endsWith('/posts') && request.method === 'GET' : return posts();

        //////////////////////////////////////////////////////////////////////////

        case request.url.endsWith('/inventory'       ) && request.method === 'GET'  : return product();
        case request.url.endsWith('/inventory/create') && request.method === 'GET'  : return _new();
        case request.url.endsWith('/inventory/create') && request.method === 'POST' : return retOk();
        case request.url.endsWith('/inventory/1'     ) && request.method === 'GET'  : return edit();
        case request.url.endsWith('/inventory/1'     ) && request.method === 'POST' : return retOk();

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
        chartz : [
          {
            title: 'chart1',
            chart: { height: 80, type: 'area', sparkline: { enabled: true }, group: 'sparklines' },
            dataLabels: { enabled: false },
            stroke: { width: 3, curve: 'smooth' },
            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0 } },
            series: [{ name: 'series1', data: [60, 15, 50, 30, 70] } ],
            colors: ['#0084ff'],
            xaxis: { type: 'datetime', categories: ['2018-08-19T00:00:00', '2018-09-19T01:30:00', '2018-10-19T02:30:00', '2018-11-19T01:30:00', '2018-12-19T01:30:00'] },
            tooltip: { x: { format: 'dd/MM/yy HH:mm' } }
          },
          {
            title: 'chart2',
            chart: { height: 80, type: 'area', sparkline: { enabled: true }, group: 'sparklines' },
            dataLabels: { enabled: false },
            stroke: { width: 3, curve: 'smooth' },
            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0 } },
            series: [{ name: 'series1', data: [70, 40, 60, 30, 60] } ],
            colors: ['#ffd400'],
            xaxis: { type: 'datetime', categories: ['2018-08-19T00:00:00', '2018-09-19T01:30:00', '2018-10-19T02:30:00', '2018-11-19T01:30:00', '2018-12-19T01:30:00'] },
            tooltip: { x: { format: 'dd/MM/yy HH:mm' } }
          },
          {
            title: 'chart3',
            chart: { height: 80, type: 'area', sparkline: { enabled: true }, group: 'sparklines' },
            dataLabels: { enabled: false },
            stroke: { width: 3, curve: 'smooth' },
            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0 } },
            series: [{ name: 'series1', data: [60, 40, 60, 40, 70] } ],
            colors: ['#00ca00'],
            xaxis: { type: 'datetime', categories: ['2018-08-19T00:00:00', '2018-09-19T01:30:00', '2018-10-19T02:30:00', '2018-11-19T01:30:00', '2018-12-19T01:30:00'] },
            tooltip: { x: { format: 'dd/MM/yy HH:mm' } }
          },
          {
            title: 'chart4',
            chart: { height: 80, type: 'area', sparkline: { enabled: true }, group: 'sparklines' },
            dataLabels: { enabled: false },
            stroke: { width: 3, curve: 'smooth' },
            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0 } },
            series: [{ name: 'series1', data: [75, 30, 60, 35, 60] } ],
            colors: ['#e64141'],
            xaxis: { type: 'datetime', categories: ['2018-08-19T00:00:00', '2018-09-19T01:30:00', '2018-10-19T02:30:00', '2018-11-19T01:30:00', '2018-12-19T01:30:00'] },
            tooltip: { x: { format: 'dd/MM/yy HH:mm' } }
          }
        ],
        bannerChart: {
          series: [
            { name: "TEAM A", type: "area", data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33] }
          ],
          chart: { height: 350, type: "area" },
          dataLabels: { enabled : false },
          stroke: { curve: "smooth" },
          fill: { type: "solid", opacity: [0.35, 1] },
          labels: [ "Dec 01", "Dec 02", "Dec 03", "Dec 04", "Dec 05", "Dec 06", "Dec 07", "Dec 08", "Dec 09 ", "Dec 10", "Dec 11" ],
          markers: { size: 0 },
          yaxis: [
            { title: false },
            { opposite: true, title: false }
          ],
          xaxis: { labels: { trim: false } },
          // tooltip: {}
        },
        heat : [{
          "date": "2021-01-01",
          "total": 17164,
          "details": [
            {
              "name": "Project 1",
              "date": "2021-01-01 12:30:45",
              "value": 9192
            }, {
              "name": "Project 2",
              "date": "2021-01-01 13:37:00",
              "value": 6753
            },
            {
              "name": "Project N",
              "date": "2021-01-01 17:52:41",
              "value": 1219
            }
          ]
        }]
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


    function product()
    {
      let ar  = [];
      let tot = 50;

      for ( let index = 0; index < tot; index++ )
      {
        ar.push({
          "id"    : 1, //Math.floor( Math.random() * 100) + 1,
          "title" : products[ Math.floor( Math.random() * products.length ) ],
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
          "name"           : names[Math.floor(Math.random() * names.length)] + ' ' + surnames[Math.floor(Math.random() * surnames.length)] + ' ' + surnames[Math.floor(Math.random() * surnames.length)],
          "produto"        : 'Prod.',
          "atendente"      : names[Math.floor(Math.random() * names.length)] + ' ' + surnames[Math.floor(Math.random() * surnames.length)] + ' ' + surnames[Math.floor(Math.random() * surnames.length)],
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
      return request.headers.get('Authorization') === 'Bearer fake-jwt-token';
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
