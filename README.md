## CPSC_455_Project: Peter Ko (o8n2b), Daniel Lee, Derek Yeh, Yukie Man (a9r2b), Abdurahman Mudasiru (w3q1b)

## Fresh Furniture
We are Fresh Furniture and ready to help you find the best second-hand or handcrafted furniture at the best value and quality! Our furniture not only helps reduce waste for the environment but also supports local carpenters. You can even sell your own furniture, and if you do well, your ratings and reviews will reflect that! Visit Fresh Furniture and begin your furniture journey there!

## Final Project Report
### 2. Project Task Requirements
#### Minimal Requirements (will definitely complete)
1. buy and sell furniture
2. users can post furniture to sell on their account
3. rate sellers
4. login/register feature

#### Standard Requirements (will most likely complete)
1. provide delivery service
2. price matching feature (filter)
3. search for location (filter)
4. type of furniture (filter)

#### Stretch Requirements (plan to complete at least 1)
1. chat feature that allows meeting arragenment
2. contactless drop off functionality
3. trade furniture
4. individuals can set up their own service
5. comment on stores/services 
6. individuals can set up their own store
7. sharing links on social media

### 3. Tech
We used basic web technologies HTML/CSS/JS to provide the content for our webpage. CSS is used to style React components and make our web application responsive. React is used to provide all frontend functionality. It provides design and interface users interact with and send requests to backend. We used Node with Express to set up ther server and provide REST services. They fulfill requests that are sent from frontend by interacting with databse. We used MongoDB with mongoose to connect to database and store our data. Atlas is used to host our database. Finally, we used Heroku with Git to deploy our application.

### 4. 'Above and Beyond'
The above and beyond functionality for our project is the payment system we implemented. We successfully incorporate paypal into our system to allow for transactions to take plce in our project. At first, we wanted to store user sensitive personal information in our web app to implement our own payment system but we were concerned we would not be able to store in securly. By letting PayPal handle this, we perserve this funcionality and solve the security issues as well.

### 5. Next Steps 
We believe that havig a chat feature to allow users to message each other within the app would further improve this application and create a better user experience, since communication is done within the app instead of using service outside (e.g., email). Also, being able to share links of listings on social media would be a great next step for this application.

### 6. List of Contributions
Derek (x7c1b):
I worked on both front-end and back-end as well as implmeneting Google log in across front-end and back-end. On the back-end side, I helped set up user end points. Here I primarily work on the end points that will send an API call to back-end the moment user logs in, including verification in the back-end. On the front end side, I set up redux so that we can store important data in store and have it be accessible across all our components(ex: cartQuantity). I also write search functions so that users can look up for the furniture he/she wants. Finally, I set up the payment system using PayPal to allow for transactions in our web app.

Peter (o8n2b): 
I mostly worked on the server side code, where Daniel and I set up the database and connected our backend to it, and implemented all the backend API endpoints. I also implemented API endpoints for filtering users by locations or email, sorting listings by dates, filtering listings by types, and adding / updating user's reviews and comments, so that the frontend code can easily retrieve what it needs without having to do all the work. I deployed the application on Heroku for the demos as well, and fixed the problems that we've encountered while deploying the application (e.g., app not fetching env variables). 

Abdurahman (w3q1b) :
I worked on the frontend and backend but the frontend mostly. I set up react-router for the project which I used to implement the Navbar. I worked on the AddListing Modal which required setting up image upload from the frontend, I made it robust to the different pitfalls a user might face while filling the form. I also implemented the cart system and checkout. I worked on some backend endpoints which include getUserById and deleteUserById. I also implemented the APIs which would enable the frontend to access the backend APIs.

------

## Project Description (Original Idea)
Note: Due to the time frame of our course, we realized our original idea would require more time for completion. Thus, we have changed it accordingly. 

Fresh Furniture is a web application that aims to facilitate furniture trading on the market. It will support selling, buying, and even loaning second-hand or newly made furniture. Users have the option of opening their own store to sell their pre-owned furniture or service to build customized or fix furniture. Otherwise, users can just shop or order a service. Our app will aid in reducing waste and provide affordable furniture.

Furthermore, our app will store personal data, such as the user's name, address, and login information. We will encrypt simple data such as passwords ourselves. Financial data for payments will not be stored because third party service(s) like PayPal will be used instead. These specific data are selected and stored so that users do not have to re-enter these data every time they make a purchase. Other data such as store/service ratings from users will also be stored to promote those with great products and services.

Depending on the time we have, it will be in our best interest to allow buyers to arrange a meeting with the sellers to examine the condition of the products (designed to cope with situations in the pandemic). On top of that, maybe we can create functionality that supports contactless drop off of the product(s) sold.

## Task Breakdown
### Break Down of Minimal Requirement #2:
1. allow individual to choose a store, service, or both to set up
2. individuals can upload images of product
3. individuals can upload description and price of product/service
4. display empty rating of store/service
5. allow individual to upload description, location, logo, contact info. for their store/service

### Break Down of Minimal Requirement #3:
1. allow consumers to rate
2. if bought from the store or used the service, then is a verified customer 
3. upvote/downvote reviews
4. sorting feature for reviews

## Prototypes
- Login Page
![Login Page](https://user-images.githubusercontent.com/57734613/120066681-688b8480-c02c-11eb-9e3d-e7feabfae2b7.png)

- Registration Page
![Registration Page](https://user-images.githubusercontent.com/57734613/120066682-6d503880-c02c-11eb-98d7-3a0fd83cb395.png)

- Home/Landing Page
![Home_Landing Page](https://user-images.githubusercontent.com/57734613/120066685-7214ec80-c02c-11eb-916e-cfe2727379c1.png)

- Shop Page
![Shop Page](https://user-images.githubusercontent.com/57734613/120066688-77723700-c02c-11eb-8f43-4656f065e22a.png)

- Service Page
![Service Page](https://user-images.githubusercontent.com/57734613/120066694-7ccf8180-c02c-11eb-9dee-9687f367bf87.png)

- My Cart Page
![My Cart Page](https://user-images.githubusercontent.com/57734613/120066696-82c56280-c02c-11eb-82d5-16054f8e8ca8.png)

- Set Up Store/Service Page
![Set Up Store_Service Page](https://user-images.githubusercontent.com/57734613/120066699-8658e980-c02c-11eb-9d05-88daec3bee48.png)

- Message Page
![Message Page](https://user-images.githubusercontent.com/57734613/120066702-88bb4380-c02c-11eb-9e4d-07063e3803c3.png)
