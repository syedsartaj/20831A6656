
   const express = require('express');  //Import Express
   const axios = require('axios');  //Import Axios
    // Create an instance of the Express application
   const app = express();
   // Define the port on which the server will listen
   const port = 8008;
    // Define a route for handling GET requests to '/numbers'
   app.get('/numbers', async (req, res) => {
     const urls = req.query.url || [];
     const numberSets = [];

     try {
       await Promise.all(
         urls.map(async (url) => {
           try {
             const response = await axios.get(url);
             if (response.data.numbers) {
               numberSets.push(...response.data.numbers);
             }
           } catch (error) {
             console.error(`Error fetching data from ${url}:`, error.message);
           }
         })
       );

       const uniqueNumbers = Array.from(new Set(numberSets));
       const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);

       res.json({ numbers: sortedNumbers });
     } catch (error) {
       console.error('Error:', error.message);
       res.status(500).json({ error: 'Internal Server Error' });
     }
   });

   app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
   });
