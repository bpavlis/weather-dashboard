/*
Example code from gary:

  There are a bunch of ways of doing multiple asynchronous requests. Here are two of them. None is better than the other. Choose whichever you feel most comfortable with.

  #1: Nested anonymous functions.
  Example:


fetch("some-url-here")
.then( function(response){
  return response.json()
})
.then( function(data){
  // here you can take the data you receive and send any part of it to the next then() block.
  const coolData = data.stuff
  return coolData
})
.then( function(coolDataFromAbove){
  // use the coolDataFromAbove for the next fetch call
  fetch("url-from-cooldata")
  .then( function(response){
    return response.json()
  })
  .then( function(finalData){
    // Here is your final data!!
  })
})



  Example 2: Using async/await


async function getAllTheData(){
  const resp1 = await fetch("url-1");
  const data1 = await resp1.json()

  // data1 gives is all the prelim stuff, which we can use to 
  // compose the next fetch call
  const resp2 = await fetch("url-2");
  const data2 = await resp2.json()

  // data2 is the final data we need to populate the page
}
*/

