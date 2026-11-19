# Lab 14 - Server-Side Rendering with Handlebars

In this lab, you will build an Express application from scratch and use
Handlebars templates to generate HTML on the server. The browser receives the
final HTML; JavaScript expressions in the templates run in Node.js, not in the
browser.

The application will start with a single page and grow into a small product
catalogue.

## 1. Context Object

Handlebars receives a JavaScript object called the **context**. Template
expressions read values from that object:

```handlebars
<h1>{{title}}</h1>
<p>{{description}}</p>
```

```javascript
const context = {
  title: 'Product catalogue',
  description: 'Server-rendered with Handlebars'
}
```

## Exercise 1.1 - Compile a template in Node.js

Create a new directory:

```text
lab14-handlebars/
```

Initialize the project and install Express and Handlebars:

```bash
npm init -y
npm install express express-handlebars handlebars
npm pkg set type=module scripts.start="node app.js"
```

Create `template-demo.js`:

```javascript
import Handlebars from 'handlebars'

const template = Handlebars.compile(
  '<h1>{{title}}</h1><p>{{description}}</p>'
)

const html = template({
  title: 'My shop',
  description: 'Welcome!'
})

console.log(html)
```

Run it:

```bash
node template-demo.js
```

**Change the values in the context and confirm that the output changes.**

## 2. Configure Express

`express-handlebars` connects Handlebars to Express. Create `app.js`:

```javascript
import express from 'express'
import { engine } from 'express-handlebars'

const app = express()

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main'
}))
app.set('view engine', 'hbs')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Product catalogue'
  })
})

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
```

Create the following directories:

```text
views/
views/layouts/
public/
```

The Express setup and template files work together:

* `app.engine('hbs', ...)` registers Handlebars as the engine for `.hbs` files.
  `extname` sets that file extension, and `defaultLayout` selects
  `views/layouts/main.hbs` for views by default.
* `app.set('views', './views')` tells Express where to find the templates.
* `res.render('home', ...)` selects `views/home.hbs` and passes it the object
  in the second argument. The `title` property is available as `{{title}}`.
* Express renders the view, then places its HTML at `{{{body}}}` in the layout.
  The layout and view therefore combine into the complete HTML response.

### Exercise 2.1 - Create the first route and view

Create `views/layouts/main.hbs`:

```handlebars
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{title}}</title>
  </head>
  <body>
    {{{body}}}
  </body>
</html>
```

Create `views/home.hbs`:

```handlebars
<h1>{{title}}</h1>
<p>Welcome to the product catalogue.</p>
```

Start the server:

```bash
npm start
```

Open `http://localhost:3000`.

The layout provides the common HTML document. In this example, both the layout
and view receive `title` from `res.render()`, and `{{{body}}}` is replaced by
the HTML rendered from `home.hbs`.

## 3. Pass and display data

An Express route passes data to `res.render()`:

```javascript
res.render('home', {
  title: 'Products',
  productCount: 3
})
```

The template accesses the values from the current context:

```handlebars
<p>Products: {{productCount}}</p>
```

The dot notation can access object properties:

```handlebars
<p>{{product.name}} - {{product.price}}</p>
```

### Exercise 3.1 - Display a product

Declare an array in `app.js`:

```javascript
const products = [
  { id: 1, name: 'Notebook', price: 4.5, inStock: true },
  { id: 2, name: 'Pen', price: 1.2, inStock: true },
  { id: 3, name: 'Ruler', price: 0.9, inStock: false }
]
```

Change the route to pass the first product:

```javascript
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Product catalogue',
    product: products[0]
  })
})
```

Update `home.hbs` to display the product name and price.

Add a second route:

```javascript
app.get('/product/:id', (req, res) => {
  const product = products.find(
    item => item.id === Number(req.params.id)
  )

  res.render('product', {
    title: product ? product.name : 'Product not found',
    product
  })
})
```

Create `views/product.hbs` and display the product or a not-found
message.

## 4. Conditions and lists

Handlebars uses block helpers.

`{{#if value}}` renders its block when the value is truthy:

```handlebars
{{#if inStock}}
  <span>In stock</span>
{{else}}
  <span>Unavailable</span>
{{/if}}
```

`{{#each items}}` iterates over an array. Inside the block, `this` refers to
the current item:

```handlebars
{{#each products}}
  <li>{{name}} - {{price}}</li>
{{/each}}
```

### Exercise 4.1 - Render the catalogue

Change the `/` route to pass the complete array:

```javascript
res.render('home', {
  title: 'Product catalogue',
  products
})
```

Update `home.hbs`:

```handlebars
<h1>{{title}}</h1>

{{#if products}}
  <ul>
    {{#each products}}
      <li>
        <a href="/product/{{id}}">{{name}}</a>
        - {{price}}
        {{#if inStock}}
          <strong>In stock</strong>
        {{else}}
          <span>Unavailable</span>
        {{/if}}
      </li>
    {{/each}}
  </ul>
{{else}}
  <p>No products available.</p>
{{/if}}
```

Add a not-found block to `product.hbs`:

```handlebars
{{#if product}}
  <h1>{{product.name}}</h1>
  <p>Price: {{product.price}}</p>
{{else}}
  <h1>Product not found</h1>
{{/if}}
```

## 5. Change the context

`{{#with product}}` temporarily makes `product` the current context:

```handlebars
{{#with product}}
  <h1>{{name}}</h1>
  <p>{{price}}</p>
{{/with}}
```

Use `../` to access the parent context.

### Exercise 5.1 - Use `with`

Replace the product data block in `product.hbs` with `#with`.

Add a route value:

```javascript
fromCatalogue: true
```

Inside `#with`, add a link that uses the parent context:

```handlebars
{{#with product}}
  <h1>{{name}}</h1>
  <p>Price: {{price}}</p>
  {{#if ../fromCatalogue}}
    <a href="/">Back to catalogue</a>
  {{/if}}
{{/with}}
```

Confirm that `../fromCatalogue` reads `fromCatalogue` from outside `product`.

## 6. HTML forms

Express does not parse URL-encoded form bodies by default. Add middleware:

```javascript
app.use(express.urlencoded({ extended: false }))
```

A form posts to a route:

```html
<form action="/products" method="post">
  <label>
    Name
    <input name="name">
  </label>
  <button type="submit">Add</button>
</form>
```

The submitted values are available in `req.body`.

### Exercise 6.1 - Add a product

Add the middleware before the routes.

Add a form to `home.hbs`:

```handlebars
<form action="/products" method="post">
  <label>
    Name
    <input name="name" required>
  </label>

  <label>
    Price
    <input name="price" type="number" step="0.01" required>
  </label>

  <button type="submit">Add product</button>
</form>
```

Add the POST route:

```javascript
app.post('/products', (req, res) => {
  const name = req.body.name.trim()
  const price = Number(req.body.price)

  if (!name || !Number.isFinite(price) || price < 0) {
    return res.status(400).render('home', {
      title: 'Product catalogue',
      products,
      error: 'Invalid product data'
    })
  }

  products.push({
    id: products.length + 1,
    name,
    price,
    inStock: true
  })

  res.redirect('/')
})
```

Update `home.hbs` to display `{{error}}` when it exists.

This route validates submitted values before changing the in-memory array.

## 7. Partials

A partial is a reusable Handlebars template. Configure the partial directory:

```javascript
app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: './views/layouts',
  partialsDir: './views/partials'
}))
```

Include a partial with:

```handlebars
{{> navigation}}
```

The current context is passed to the partial unless a specific context is
given.

### Exercise 7.1 - Create a navigation partial

Create `views/partials/navigation.hbs`:

```handlebars
<nav>
  <a href="/">Catalogue</a>
</nav>
```

Add `{{> navigation}}` to `main.hbs`.

Create `views/partials/product.hbs`:

```handlebars
<li>
  <a href="/product/{{id}}">{{name}}</a>
  - {{price}}
</li>
```

Update the `#each` block in `home.hbs` to use:

```handlebars
{{> product}}
```

## 8. Custom helpers

A helper is a function registered in the Handlebars engine:

```javascript
helpers: {
  upper(value) {
    return String(value).toUpperCase()
  }
}
```

Call it from a template:

```handlebars
<h1>{{upper title}}</h1>
```

Helpers can format values, but templates should not contain application logic.
Keep validation and data preparation in JavaScript route or service code.

### Exercise 8.1 - Format prices

Register a `formatPrice` helper:

```javascript
app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: './views/layouts',
  partialsDir: './views/partials',
  helpers: {
    formatPrice(value) {
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'EUR'
      }).format(value)
    }
  }
}))
```

Use it in the catalogue and product views:

```handlebars
{{formatPrice price}}
```

Create a helper named `pluralize` that receives a count and a singular and
plural word:

```handlebars
{{pluralize products.length 'product' 'products'}}
```

Pass `products.length` to the template and display a sentence such as:

```text
3 products available
```

## 9. Static assets

Express can serve CSS and images from a public directory:

```javascript
app.use(express.static('public'))
```

The layout can link to the file:

```handlebars
<link rel="stylesheet" href="/style.css">
```

### Exercise 9.1 - Style the catalogue

Enable static files in `app.js`.

Create `public/style.css` and link it in `main.hbs`.

Style the navigation, form, product list and unavailable state.

## 10. Final exercise

Complete the application with the following requirements:

1. The `/` route displays all products.
2. The `/product/:id` route displays one product or a not-found view.
3. The `POST /products` route creates an in-memory product.
4. Submitted names are trimmed.
5. Invalid prices are rejected.
6. The catalogue and product detail pages use a shared layout.
7. Navigation is implemented as a partial.
8. Product entries are implemented as a partial.
9. Prices are formatted with a custom helper.
10. At least one conditional and one array iteration are used.
11. A CSS file is served from the `public` directory.

Restart the server and test:

- An empty product name.
- A negative price.
- A product name containing HTML.
- A valid product submission.
- An unknown product URL.

The server-side templates must remain responsible for presentation. Validation
and state changes remain in Express route code.
