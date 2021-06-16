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
