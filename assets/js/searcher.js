let URL = 'https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products.json'

let loadProducts = ( myURL ) => {

  fetch( myURL )
    .then(response => response.json() ) /* Convierte el response a texto */
    .then(result => {

    console.log(result)

      /* Callback por éxito: Procese el xml */
      
      console.log( xml );
    
    })
    .catch(error => {
      
      /* Callback por fallo: Procese el error */

      console.log( error );

    });
  
}

request(URL);