# Express App Setup Steps

1. Create project folder and inside run `yarn init`
  * Set up yarn init parameters to fill out `packages.json` configuration file. This file controls all the specific options and add-ons for the project.
 * Specifiy project entry point as `app.js`
2. Add project dependencies with yarn `yarn add ...`
	* Express: for enabling Express.js in Node.js
	* Body-parser: for parsing body data
	* Cookie-parser: for enabling cookies
	* Ejs: for rendering views
	* Faker: for generating fake data
	* Morgan: for logging server log info
	* Pg-knex: for accessing postgresql
	* Nodemon: for auto-updating server process while developing `yarn add -D nodemon`
3. Add `"scripts": {
    "start": "nodemon app.js"
  },` to `package.json` for enabling quick start up of app in node.js `yarn start` to start server and app from pwd.
4. Create and open `app.js` file for use as main project starting file
5. Add following node modules to project:
 * Express `const express = require('express')`
 * Morgan `const logger = require('morgan')`
 * Body-parser `const bodyParser = require('body-parser')`
 * Path `const path = require('path')`
 * Cookie-parser `const cookieParser = require('cookie-parser')`
6. Define express server port as global variable `const PORT = 5000`. Use any port number currently not in use by system.
7. Activate and initalize express.js in project by calling it into a const variable called 'app': `const app = express()`
8. Activate ejs as view engine using `app.set('view engine', 'ejs')`. Create `views` folder in project root
9. Activate morgan module using 'dev' mode as logging format `app.use(logger('dev'))`
10. Activate body-parser module on app variable with `app.use(bodyParser.urlencoded({extended: false}))`
11. Activate cookie-parser module on app `app.use(cookieParser())`
12. Set up public folder for lining local assets like css, images using path module `app.use(express.static(path.join(__dirname, 'public')))`. Create `public` folder in prject root.
13. Activate server to listen on port 5000 or other depending on step 6. `app.listen(PORT,()=>{
	console.log('Server listening on http://localhost:${PORT}')
	})` use backticks for string interpolation. Console log message will tell you when the server is running.
14. Create `.gitignore` folder on project root and include files/folders that we don't want git to track. Enter one item per line, case-sensitive, eg, `node_modules` to exclude that folder, and `.DS_Store` for excluding hidden MacOS files.
15. Basic server set up is now complete. Run server from node.js in Terminal shell using custom script `npm run start`. Now might get a good time to start tracking project on git.

# Adding Routes for App to Generate HTML for Browser Access
Our app is now listening on the localhost:5000 or other desired port. Go to web browser and send get request to URL. Browser will return respond with a 404 which means the server is running but has no data to respond with. Time to set up our router and views to send back pages to display when a client requests a desired URL.
1. Add into `app.js` below last lines of code: `app.use('/', XXX)`. This tells the app to use the root folder as route labelled 'XXX'.
	* Create a folder called `routes` to main project working directory.
	* Inside `routes` folder, create your a file for `XXX.js` that will instruct the app what to do when a request for the root folder is requested from a client browser.
	* `XXX` can be any name for the route that you want the browser to follow when entering your app as specified by the `app.use('/', XXX)` directive. `app.use('/', XXX)` format specifies file path as first argument, and route name as second argument
2. After creating our `XXX.js` file in our `routes` folder, we need to define the route path on the main app program in `app.js`.
	* In `app.js`, for each new routing, create a line of code that defines the route name as variable and use `.require(./routes/XXX)` to define the route to the path.

# Creating Server Actions Once Route is Defined
2. Open `XXX.js` file and add in support for app. As this file is a javascript file in node, we can continue using javasscript and node will run the file as normal.
	* Tell node.js this file needs to use Express:
	`const = express = require('express')`
	* Tell node.js that we are also using the router module, and activate it for this route: `const router = express.Router()`
	* At bottom of this file, we tell node.js to export this whole file as a module export that other files in the project can use: `module.exports = router`.
	* All other code will be input above this last `module.exports = router` line.
3. Once a client makes a GET request to the server, our app routes the request to the file specified by the `app.use('/', XXX.js)` directive. This routes the request to the `XXX.js` file inside the `routes` folder from the app root directory. In this file, we will add code to tell the server how to respond to requests coming into this route. First, we will want to respond with a web page to display to the client.
	* For each request from a client, routes are specified, and then for each route (and depending on the RESTapi method), a certain response will be given by the server. The most basic and default response will be to send a web page back to the client. Use `router.get('/', function(req, res){
	res.render('XXX')
	})` to specify a specific web page to render back to the client.
	* Since we are now inside the `routes` folder and working on the `XXX` route, the `/` of the `router.get` method refers to the index of the `XXX` route, and not the main app.
	* From here, we we now want to send back a render of a web page to display for the client. `res.render('XXX')` is how we do this. However, the argument for the `.render` method is to specify what page to render back. This file will be the `XXX.ejs` file from within our `views` folder.
	* The `views` folder and its contained `.ejs` files, are javascript templates of HTML pages that we want to send back to the client.

# Creating HTML with EJS Javascript templates
`.ejs` files are used to create HTML renders of the web pages a server will send back to the client for display. Files are stored and created in the `views` folder and accessed by the app. Each route of the app will need a corresponding `XXX.ejs` view file to be rendered when that route is request. Steps to create views are as follows:
* Start with the first index route of your app as defined by `app.use('/', XXX)`. This is referencing a javascript file `XXX.js` in the `routes` folder. Open this file and find the router get request at `router.get('/', function(req, res) {
	res.render('XXX')
	})`; this `XXX` reference is now referening which `.ejs` file to render from the `views` folder; `XXX.ejs` to be exact. This file contains the EJS javascript template for an HTML render of the page.
* Now, create and open the file `XXX.ejs`. In this file we can start writting regular HTML code that the client browser will display.
* Different pages of a site can share the same header, footer, or other elements of a page by using EJS partials. Partials are a way to split up an EJS HTML render into different parts to keep common elements of pages in different files for rendering. For example, if all the pages of your site share a common header with nav at the top of the page, you can write this as a partial to be 'included' in the top of the body content of pages on different routes.
* To use partials, create a folder `partials` inside the `views` folder. This will contains common elements of EJS HTML files. Header should contain standard HTML head info up to and including any shared content you want on the body of a page.
* As for the routes, since each route will act as the main content of a get request for a URL, these files will act as the different pages of your website. You can include partials into your differnt page routes by using: `<%- include('./partials/ZZZ') %>` in the part of your route page where you want the partial to be used. Since your main page content for each route is stored in the `views` folder, and partials are stored in a child folder of the `views` folder, you need to access partials by the path `(./partials/header')` to include a `header.ejs` file. This file will contain the standard start of an HTML file and links to css or nav info for routes tha will use the page.
* For each route, you need to design a main body content `.ejs` file for the main page to be rendered. An example page using partials with header and footer would look like this:`<%- include('./partials/header') %>
<div class="main">
<h1>This is My Main Route HTML Page Content</h1>
<p> Some text and content for the main route content page</p>
<%- include('./partials/footer') %>`
* CSS can be linked to in the header and written just like any other CSS file. Save the css file in the 'public' folder so the app can have access to the asset.


# Creating a New Route for Posting data
1. The first step in creating new routes for the app is to decide where the app route should go. In this example, we want to create a page called 'new' accessed from the `XXX` route straight from the app index (URL: `/`) on a new URL of `/new`. This is the convention for RESTful API convention. Whenever we are going to post new data to a route, it should be done on a from a new route called `/new`. This also means a new page which consists of a form, so the client can enter data.
	* To display a new page for the user to see when they want to post some new data, we need to create a new view render. On the same `XXX.js` route, add the code `router.get('/new', function(req, res){
		res.render('new-XXX')
		})`. This simply tells the app, when a request for the URL `/new` respond with the EJS view render of `new-XXX.ejs`.
	* From here, we need to create the file `new-XXX.ejs` in our main `views` folder as it a new page for our site on a new route.
	* Remember to include the common site `header.ejs` and `footer.ejs` partial files using the EJS `<%- include('./partials/header') %>` where necessary. Since the header contains the head and end of our HTML code we need these files in our `new-XXX.ejs` view file or the client browser won't understand `new-XXX.ejs` is an HTML file to render.
	* Within the file `new-XXX.ejs` file, to allow the client to post data, we need to include an HTML form for them to enter data. The most critical part of the form will be the `action="/new"` and `method="post"` attributes of the `<form>` element. An 'action' attribute set to '/new' will tell the client where to submit the form data when the client submits the form.
	* The input box needs to have a 'name' attribute defined so we can pick up the data later from the post request body at name value. Ex `<input type="text" name="newTask">` means input data can be recieved by the server using `req.body.newTask`.
	* For the server to receive the data, we add `router.post('/new', (req, res) => {
		console.log(req.body)
		res.redirect('/')
		})`. This code enables the server to listen for 'post' requests made from the client on the '/new' URL, and defines code on how to respond to such post request from clients.
	* Essentially, when a client submits the form from '/new' with a 'post' method, they are requesting the server to accept data and respond accordingly.

# Posting Reqests to Server
Posting requests to the server means submitting a form or requesting to add a post, or create some sort of data to persist; Create action in a CRUD workflow. In order for a server to keep posted data, we need to store the data in a database. This will entail the use of add-ons to node.js such as pg-promise via postgreSql or similar. Conversely, we can try to store data in cookies. Cookies are little files created by a server and stored in a clients browser to identify a client browser to the server. The server may place a cookie in the client so that the server can see metadata about a clients session such as if the client is logged in or not, if the client has been to the site before, or if the client has items stored in a cart, account or other feature.
* To set up cookies using Express and Node we will require the use of the cookie-parser module we added at the start of the project. However we will need to create new routes for the pages so the client can actually input data.
* Once a new route for catching post requests to the `/new` URL has been created. Data from the form post can be saved using cookies or posted to a database.
* Here we will use `router.post('/new', (req, res)=>{
	const {newTask} = req.body
	res.cookie('newTask', newTask, {maxAge: 1000*60*60})
	res.redirect('/')
	})` to listen for post requests from the form on URL '/new'
*	`const {newTask} = req.body` saves data from the `req.body.newTask`
* `res.cookie('newTask', newTask, {maxAge: 1000*60*60})` tells the server to then respond with sending a cookie to the client with a name of 'newTask' and value of our variable data newTask, and a maximum life of 1000 milliseconds * 60 = 1 minute * 60 = 1 hour. After this time the cookie will delete itself.

# Viewing Stored Cookie Data On View pages
Cookies should now be send from the server and stored in the clients browser with a name of our form input name attribute : `name="newTask"`. To access this data from a page view, we need to add some code to store the data from the cookie out into a global variable.
*	Back to the main app file `app.js`, add the custome middlware code: `app.use(function(req, res, next){
		const {newTask} = req.cookies
		console.log(newTask)
		res.locals.globalTask = newTask
		next()
		})`. The placement of this code matters and should can be placed above the `app.use('/', XXX)` main router block for now.
* `function(req, res, next) {}` this is a custom middleware function so we need to include a next argument to tell the server to move onto the next middleware function after it completes the 'req' and 'res' functions.
* `const {newTask} = req.cookies` saves the data value that was stored in our cookie as a new variable 'newTask'. This format is shorthand for `const newTask = req.cookies.newTask` which finds and saves the property `newTask` from within the `req.cookies` object as a variable with the same name `newTask`.
* Just to see if we're accessing the right data, we can run a `console.log(newTask)` to verify we're grabbing the right data
* Next we will set a new value on to the `res.locals` object as our value `newTask`. The `locals` property is an object of the 'response' that we can set new properties on. In this case we are setting a new property and value pair onto `res.locals.globalTask` equal to our saved data in `newTask`
* Setting the data as `res.locals.globalTask` allows the data to be accessed as a global variable from any view page with the app. Thus allowing us display any data we choose from within our app.
