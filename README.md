# Welcome to Training Area
Welcome to our training area! This website provides you with the opportunity to buy courses shared by other users. Follow the instructions below to get started.

## Project Summary
The Training Area project aims to facilitate people who want to learn something new or those who want to pass on their knowledge by providing a platform for their purpose. The project is designed to be convenient and intuitive for both seekers and offerers.

## How It Works
- **Account Creation:** Users register to create their personalized account, enabling them to create listings and purchase courses from other users.

- **Listing a Course:** After registering or logging into their account, users can create a listing for their course and await potential buyers.

- **Purchasing a Course:** Once registered or logged in, users can start buying courses uploaded by other users.

- **Profile Page:** On the profile page, users can find basic information, as well as a list of all the courses they have purchased or created.

## Project Structure
The project follows a structured organization to improve maintainability and ease of navigation. Here's a brief overview of the main directories and their purposes:

* **/src:** Contains the user interface application created with Angular and server part.
    * **/app:** Angular modules, components, services, styles, and application logic.

    - **/server.js:** A file that, when started, enables the use of the SoftUni Practice Server.

Feel free to explore each directory to gain more detailed information about its contents. This structure is designed to facilitate working on specific aspects of the application.

## Run Locally

**Clone the project**

```bash
  
git clone https://github.com/veselinfilev/Training-Area.git
  
```

Go to the src directory

```bash
 
  cd src
 
```

Start the server

```bash
  
  node server.js
  
```

Go to the main directory

```bash
  
  cd Trainig-Area
  
```

Install dependencies

```bash
  
  npm install
  
```

Start application
```bash
  
  ng serve
 
```

## API Endpoints

  ### Authentication

○ **Register User**

  + **POST - /users**

    + **Request:**

    ```bash
    {
      email,
      username,
      password
    }
    ```

○ **Login User**

  + **POST - /users**

    + **Request:**

    ```bash
    {
      email,
      password
    }
    ```

### Course Management    

○ **Create Course**

  + **POST - /data/courses**

    + **Request:**

    ```bash
    {
      title,
      lecture,
      description,
      price,
      image,
      duration
    }
    ```

  ○ **Update Course**

  + **PUT - /data/courses/:courseId**

    + **Request:**

    ```bash
    {
      _id,
      title,
      lecture,
      description,
      price,
      image,
      duration
    }
    ```

  ○ **Delete Course**

  + **DELETE - /data/courses/:courseId**  

   ○ **Get Course**

  + **GET - /data/courses/:courseId** 

 **Enjoy** 😊