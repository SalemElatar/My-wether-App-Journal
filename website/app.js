/* Global Variables */
let dbURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&units=imperial&appid=d6a7b3b79b7070676bf3f51308bf61ec';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate)


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  let newZip =  document.getElementById('zip').value;
  let newFeeling =  document.getElementById('feelings').value;

  if (newZip == "") {
    alert(`My smart Developer said tou've to Enter ZIP code`);
  } else if(isNaN(newZip)){alert(`you can't Enter Invalid ZIP, My Developer is a smart man`);} else {
    getTempData(dbURL,newZip, apiKey).then(function(data) {
      postTempData('/add', {temp:data.main.temp, feeling:newFeeling})
      updateUI();
    })
  }
}


//GET Data
const getTempData = async (dbURL, zip, key) => {
  const res = await fetch(dbURL + zip + key)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("errror", error);
    //handle the error
  }
}


//POST Data
const postTempData = async ( url = '', data = {}) => {
  console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  try {
    const newzip = await response.json();
    console.log(newzip);
    return newzip;
  }catch(error) {
  console.log("error", error);
  }
}


//updateUi
const updateUI = async () => {
  const request = await fetch('/get-temp');
  try{
    const allData = await request.json();
    console.log(allData)
    document.getElementById('date').innerHTML = newDate;
    document.getElementById('temp').innerHTML = allData.temp + '°F';
    document.getElementById('feeling').innerHTML = allData.feeling;

  }catch(error){
    console.log("error", error);
  }
}