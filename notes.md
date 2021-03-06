# Ejercicios de Ajax

### **Notas:** ejercicio 1 - sitio en ajax

- Para poner un container en el sitio no hay necesidad de hacerlo section por section, puedes solo poner una clase y delimitar cualquiera que desees
- me falta estudiar mas css :)
- El profe lo hizo con **XMLHtppRequest**, yo lo hice con **fetch()**
- me puede ahorrar los id de los menu para el **evento click** trayendo todos los menu atraves de su clase y/o propiedad

---

### **Notas:** ejercicio 2 - funcion **"include"** de php con js

- En esta oportunidad segui el tutorial del profe **Jon** ya que hizo una mini libreria muy practica
- Algo que podria adiccionar es remplazar el **XMLHtppRequest** por **fetch()**
- tengo un mini bug en la parte del responsive (menu burger) no me cambia las clases

---

### **Notas:** ejercicio 3 - subir archivos por medio de ajax

- para subir archivos por medio de **ajax** no es necesario poner un **form** con un input basta
- el profe jon volvio a usar el **XMLHttpRequest()** reto: pasar a **fetch**

---

### **Notas:** ejercicio 4 - barra de progreso en subir archivos por medio de ajax

- para hacer una barra de progreso en js lo hacemos atraves de un objecto llamado **fileReader** este recibe un **readAsDataURL** (que es el archivo que subamos al servidor)
- Ademas recibe dos eventos un es **progress** en el cual heremos la iteracion para mostrar la barra de progreso
- el segundo evento es **loadend** el cual lo usamos para subir el archivo al servidor

---

### **Notas:** ejercicio 5 - Drap-drop por medio de ajax

- para hacer un **drap-drop** reutilizamos todo el codigo del ejercio 3 y 4 y luego solo cambiamos el evento de envio a **Ajax** ya no sera un evento de tipo **submit** (en este caso se uso el **change**) sino que utilizamos la Api de js para drap-drop
  ```js
  document.addEventListener("dragover", (e) => {});
  document.addEventListener("dragleave", (e) => {});
  document.addEventListener("drop", (e) => {});
  ```
  - el 1 y 2 evento lo usamos para hacer una mejor intereancion del usuario(ux de usuario)
  - el 3 se cuando alguien lanza de archivo y es en el donde hacemos la funcion de subir el archivo al servidor

---

### **Notas:** ejercicio 6 - Envio de formulario por medio de un api (formsubmit.co)

- Para enviar los datos de un formulario generalmente hago esto:
  ```js
  const res = await fetch("urlll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: form.nombre.value,
      email: form.correo.value,
      asunto: form.asunto.value,
      message: form.comentarios.value,
    }),
  });
  const json = await res.json();
  ```
  - Todo ese **body** me lo puedo ahorrar poniendo el codigo de abajo y esto ya toma todos los valores que hay en el formulario y los envia, amazing :)
  ```js
  {
    body: new FormData(nombre_formulario);
  }
  ```

---

### **Notas:** ejercicio 7 - Envio de formulario por medio de php

- para subir datos desde el frontend al backend es muy important configurar los **cors** y las **headers** estas configuraciones hay que hacerlas porque la configuracion por defecto solo permite que se realicen peticones **HTTP** en el servidor en que se encuentre y no desde otros servidores
- **Notas de PHP**
  - se puede enviar HTML al correo
  - la funcion **mail()** solo se envia si esta en un servidor
  - los **headers** se configuran asi:
  ```php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-type: application/json");
  ```
  - la funcion **$\_SERVER["HTTP_HOST"]** me permite saber el nombre del servidor

---

### **Notas:** ejercicio 8 - Pasarela de pagos con Stripe

- La docuementacion es muy extensa y para eso el profe Jon dejo los links importantes para consultar
  - [Stripe documentacion](https://stripe.com/docs)
  - [Stripe docuementacion api](https://stripe.com/docs/api)
  - [Autenticacion para hacer petciones HTTP con stripe](https://stripe.com/docs/api/authentication)
  - [Libreria de Stripe para JS](https://stripe.com/docs/js)
  - [Peticion de Stripe para obtener productos](https://stripe.com/docs/api/products)
  - [Peticion de Stripe para obtener precios](https://stripe.com/docs/api/prices)
  - [Peticion para procesar pagos en Stripe](https://stripe.com/docs/api/checkout/sessions)
  - [Ejemplos de implementacion de stripe en diferentes lenguajes de programacion](https://github.com/stripe-samples)
  - [Ejemplos para procesar pagos con diferentes lenguajes](https://github.com/stripe-samples/checkout-single-subscription)
- **Nota Importante**: Para pintar la informacion de Stripe en el frontend surge algo complejo lo cual es que hay que hacer 2 solicitudes **HTTP** al tiempo ya que los productos y precios vienen en diferentes **endpoints**, para unir esto y realizar solo una peticion **HTTP** lo hacemos atraves del metodo de las promesas llamado **Promise.all()**. ej:

  ```js
  Promise.all([fetch("endpoint", options), fetch("endopoint", options)])
    .then((responses) => Promise.all(responses.map((res) => res.json())))
    .then((json) => console.log(json))
    .catch((error) => console.error(error));
  ```

  - **Nota**: el primer **then** obtines todas las respuestas recibidas pero no estan mapeadas, hay es donde sirve la linea **Promise.all(responses.map((res) => res.json()))** mapa las respuesta y retorna una salida como la siguiente **[{}, {} ...]** esto nos sirve para el segundo **then** que nos mostrara una respuesta mas ordenada
  - **Nota 2**: hay que tener en cuenta que las promesas responden dependiendo de cual sea la mas rapido y no de cual estemos llamando primero, en este caso **Promise.all()** si respeta el orden y esto nos permite tener un cierto control de las respuestas

- Para realizar el pago tenemos que importar la libreria de stripe js y luego solo es poner esto:
  ```js
  Stripe(STRIPE_KEYS.public)
    .redirectToCheckout({
      lineItems: [{ price, quantity: 1 }],
      mode: "subscription",
      successUrl: "la pagina html de exitoso",
      cancelUrl: "pagina html de cancelacion",
    })
    .then((res) => {
      console.log(res);
      if (res.error) {
        $article.insertAdjacentHTML("afterend", res.error.message);
      }
    });
  ```

---

### **Notas:** ejercicio 9 - Blog con Markdown

- Atraves de diferentes librerias nos permite pasar codigo **markdown** a formato **HTML**
- Esto nos permite no depender de CMS como **workpress**, **drupal**, etc...
- Estossitios web son muy utilizados para blogs, debido a su facilidad de redaccion ya que escribir en formato markdown es muy sencillo y practico
- Referencias:
  - [Libreria utilizazda en este ejercicio](http://showdownjs.com/)
  - [Mas librerias que se pueden utilizar para pasar codigo **markdown** a **HTML**](https://css-tricks.com/choosing-right-markdown-parser/)

---

### **Notas:** ejercicio 10 - Pokeapi

- Nota importante: Los preloaders Se ponen dentro de las peticones **AJAX** y se facilita mucho cuando usas **Fetch async**
- Los ciclo **for** tradicionales permiten hacer esperar petiones **AJAX** algo que no sucede con los **foreach**

---

### **Notas:** ejercicio 11 - TvMaze

- Nota: Cuando hacemos un buscador cada persona al final siempre tiene el impulso de presionar enter. por esa razon en los buscardores es bueno hacerlos con el evento de presionar enter y no con el evento **submit** de un formulario

- Me falto manipular cuando el array me llega vacio (recuerda que eso es muy importante para la interaccion con el usuario)

- para eliminar el loader puede haber resetado asi: **innerHTML = ""** f :v

- es muy importante validar que nos llegen los datos y si no es asi, hacerlo saber a la interfaz, yo puse que no se mostrara los datos de los shows que no traian imaganes pero tenia que valiar que si no llegaba la imagen poder una imagen generica que proporcionaba tvmaze

- de igual manera los enlaces, textos, etc ...

---

### **Notas:** ejercicio 12 - buscador de canciones

- Nota sobre css: para invertir el orden de las columnas con **display: flex;** puedes utilizar **flex-direction: column-reverse**
- Nota sobre css: si pintamos algun texto que viene con saltos de lineas pero no se muestran en el body, podemos aplicar esta propiedad y muestra la info con los saltos
  ```css
  .song blockquote {
    white-space: pre-wrap;
  }
  ```
- Nota: cuando tenemos que hacer dos peticiones **http** simultaneas siempre hay que hacerlas como escribir en el **ejercicio 8 - pasarela de pago** (**promise.all()**) pero algo ademas que puedes hacer es destructurar ese **promise.all()**, esto es algo avanzado que libreria como **React** hacen mucho, la destructuracion se puede hacer con **arrays** y **objetos** y eso lo vi en el curso (que no se te olvide :)

---

### **Notas:** ejercicio 13 - selects anidados

- no hubo notas, lo hice muy bien :)

---

### **Notas:** ejercicio 14 - Wordpress API

- Esto es increible, wordpress ofrece una api rest con la que puedes interactuar con un wordpress y consumir sus datos (el consumo de datos dependera de la seguridad del sitio, hay sitios en lo que esta opcion esta desabilitada, el sitio de jquery y la casa blanca lo tienen bloqueado)

- El profe nos paso unos links importantes que hay que mirar

  - [Pagina oficial de wordpress para desarrollador sitios](https://wordpress.org/)
  - [The loop de wordpress para publicaciones (caja negra)](https://codex.wordpress.org/The_Loop)
  - [rest api de wordpress](https://developer.wordpress.org/rest-api/)
  - [endpoints del rest api](https://developer.wordpress.org/rest-api/reference/)
  - [endpoint para traer post de un sitio en wordpress](https://developer.wordpress.org/rest-api/reference/posts/)
  - [curso de wordpress del profe Jon](https://www.youtube.com/playlist?list=PLvq-jIkSeTUZDOcKsQz79wnYlTvmAdLkj)

- Para consultar el api de cual sitio web es recomendable seguir un orden cuando estemos consultando mediante **HTTP**, porque esto nos permitira que podamos reutilizar el codigo

  ```js
  (DOMAIN = "https://elsitiodewordpressabuscar.com"),
    (SITE = `${DOMAIN}/wp-json`),
    (API_WP = `${SITE}/wp/v2`),
    (POSTS = `${API_WP}/posts`),
    (PAGES = `${API_WP}/pages`),
    (CATEGORIES = `${API_WP}/categories`);
  ```

  - esta es la estructura y nos permitira buscar cualquier sitio sin necesidad de ser complejo cambiar el codigo, lo unico a cambiar es el url
    - **SITE** nos permite traer la informacion del sitio.
    - **API_WP** nos permite acceder a la **api de wordpress**
    - los demas son los endpoints la cual nos proporciona la **api de wordpress**

- **NOTA IMPORTANTE:** la ruta de los posts del api de wordpress es asi: **https://elsitiodewordpressabuscar.com/wp-json/wp/v2/posts**. que pasa con esto?
- sucede que este endpoint solo trae cierta informacion y la informacion de autores, images, tags y algunos otros solo trae los **id**.
- esto deriba que tengamos que recurrir a mas llamados mediante **fetch** para traer los datos (como vimos en el ejercicio de pokeapi)
- Si tenemos que realizar todos estos llamados eso deribaria que por cada carga de la pagina haria 40 peticiones, lo cual tendria un coste muy grande

  - wordpress nos brida una solucion al endpoint en cuestion se le puede poner un parametro especial el cual es **htpps://.../wp-json/wp/v2/post?\_embed** y con esto ya nos traeria los datos que no venian anterior mente
  - detallo esto porque aparte de ser super importante es que esto no viene muy explicado en la doc de wordpress
  - el profe Jon fue enfatico en decir que este tipo de cosas pueden pasar y si suceden debemos indagar si hay solucion mas optima para manejar una api
  - esas soluciones las podemos hallar en las foros (ten en cuenta que 90% de las dificultades que te surgan , otras personas ya pasaron por eso)
  - y si por alguna razon surgen en un proyecto profesional en el cual estemos pago por el servicio, preguntar a los creadores de la api y hay maneras mas optimas (cuando la doc no es muy buena)
  - conclusion: no tengas miedo de investigar y mas importante, de preguntar :)

- Para lograr hacer un scroll infinito o pagina en nuestros sitios web, la **API rest** que consultemos debe tener un paginado que facilite esa tarea
- este paginado variara dependiendo de la **api** pero el codigo que iria para lograr un scroll infinto se veria asi:

  ```js
  //este ejercicio esta en la carpeta de wordpressApi archivo main.js
  window.addEventListener("scroll", (e) => {
    const { scrollTop, clientHeight, scrollHeight } = d.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      //cambiar de pagina
      page++;
      //consultar el endpoint
      getPosts();
    }
  });
  ```

---
