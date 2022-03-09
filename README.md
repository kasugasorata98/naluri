# Naluri Space Project

This project consists of both frontend and backend applications in react js, and node js.

## Features

- Calculating PI, and increasing its precision.
- Calculating the circumference of the sun with the latest value of stored Pi.
- CPU clustering to help deligate task to other CPUs reduce stress on a single core.
- Saving the latest value of Pi so that a server crash will not reset the precision of Pi.

## Installation

The project requires [Node.js](https://nodejs.org/) to run.
Install the dependencies and start the server
[BACKEND]

```sh
cd backend
npm install
npm start
```

[FRONTEND]

```sh
cd frontend
npm install
npm start
```

Additional Steps to access the application

```sh
Backend IP : localhost:3000
Frontend IP: localhost:6001
```

## Limitations

The limitations to this application is its ability to generate unique pi values on each api call. To further elaborate, if a load test was done, with 100 concurrency, while the value of Pi is currently at 3, after 100 api calls concurrently, the 101th api call will return Pi value of 3.1 rather than Pi to the decimal of 101. To further illustrate, imagine the decimals that are being tracked and stored is equal to 1, however when 2 calls from the api to increase the precision of Pi is made, the value 1 is obtained and stored in a variable by both calls. In the end, the value will increase by 1 which will make the decimals end up with a value of 2 hence stored again. By right, it should be 3.

Another limitation is the circumference of sun being unable to be more than 20 in length of a number. With Pi being unlimited due to it being a string, it is not possible to store a number in a variable in JavaScript if it is more than the length of 20 numbers.

## Future Work Areas

In the future, it is possible to use a database like MongoDB with its 'Transaction' feature in-order to lock any changes made to the document (database table) if an operation is already in process. This will solve the limitations stated above.

Perhaps, in the future, there would be a way to perform multiplications using JavaScript that could return the value in string so that there can be more than just 20 numbers.
