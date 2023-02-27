let URL_JSON = 'https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products.json'
let URL_XML = 'https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products.xml'
let product = new Array()

let loadProducts = ( myURL, URL_XML, product ) => {
  let products = document.getElementById("products") 
  fetch( myURL )
    .then(response => response.json() ) /* Convierte el response a texto */
    .then(result => {
    let message = ""
    product.push(...result)
    //console.log(product)
    for (let p of product){
        let {name: name, src :src, price : price, type: type} = p
        //console.log(p)
        message+=`
        <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
          <div class="card card-blog card-plain">
            <div class="card-header p-0 mt-n4 mx-3">
              <a class="d-block shadow-xl border-radius-xl">
                <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
              </a>
            </div>
            <div class="card-body p-3">
              <p class="mb-0 text-sm">${type}</p>
              <a href="javascript:;">
                <h5>
                  ${name}
                </h5>
              </a>
              <p class="mb-4 text-sm">
                <b>Price: </b> $ ${price}
              </p>
            </div>
          </div>
        </div>`
      }
      products.innerHTML += message
    })
    .catch(error => {
      
      /* Callback por fallo: Procese el error */

      console.log( error );

    });

    fetch( URL_XML )
      .then(response => response.text() ) /* Convierte el response a texto */
      .then(result => {
        let message = ""
        let xml = (new DOMParser()).parseFromString(result, 'application/xml');

        /* Callback por éxito: Procese el xml */
        
        let product_xml = xml.getElementsByTagName("product")
        for (let p of product_xml){
            let name = p.getElementsByTagName("name")[0].innerHTML
            let price = p.getElementsByTagName("price")[0].innerHTML
            let type = p.getElementsByTagName("type")[0].innerHTML
            let src = p.getElementsByTagName("src")[0].innerHTML
            message+=`
        <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
          <div class="card card-blog card-plain">
            <div class="card-header p-0 mt-n4 mx-3">
              <a class="d-block shadow-xl border-radius-xl">
                <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
              </a>
            </div>
            <div class="card-body p-3">
              <p class="mb-0 text-sm">${type}</p>
              <a href="javascript:;">
                <h5>
                  ${name}
                </h5>
              </a>
              <p class="mb-4 text-sm">
                <b>Price: </b> $ ${price}
              </p>
            </div>
          </div>
        </div>`
        }
        products.innerHTML += message
      })
      .catch(error => {
        
        /* Callback por fallo: Procese el error */

        console.log( error );

      });

  };

let filterItem = (product) => {
    let element = document.getElementById("filter");
    let inputTxt = document.getElementById("text")
    inputTxt.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.code == "Enter")
          element.click();
  });
    element.addEventListener('click', (event) => {
        //Código a ejecutar
        console.log(product)
        let item = document.getElementById("text").value
        let products = document.getElementById("products") 
        console.log(item)
        if (item.length > 0){  
            let message = ""
            products.innerHTML = message  //Vacío el listado          
            let productFiltered = product.filter(ele => (ele.type === item || ele.name === item))
            console.log(productFiltered)
            if (productFiltered.length >0){
                for (let p of productFiltered){
                    let {name: name, src :src, price : price, type: type} = p
                    //console.log(p)
                    message+=`
                    <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
                      <div class="card card-blog card-plain">
                        <div class="card-header p-0 mt-n4 mx-3">
                          <a class="d-block shadow-xl border-radius-xl">
                            <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
                          </a>
                        </div>
                        <div class="card-body p-3">
                          <p class="mb-0 text-sm">${type}</p>
                          <a href="javascript:;">
                            <h5>
                              ${name}
                            </h5>
                          </a>
                          <p class="mb-4 text-sm">
                            <b>Price: </b> $ ${price}
                          </p>
                        </div>
                      </div>
                    </div>`
                }   
            }
            else {
                message = `<h5 class="text-center col-xl-12 col-md-6 mb-xl-0 mb-4 mt-4">No se encontró ninguna coincidencia</h5>`
            }
            products.innerHTML += message
        }
        else {
            products.innerHTML = ""
            loadProducts(URL_JSON, URL_XML,new Array());
        }
    });
}

loadProducts(URL_JSON, URL_XML,product);
filterItem(product)