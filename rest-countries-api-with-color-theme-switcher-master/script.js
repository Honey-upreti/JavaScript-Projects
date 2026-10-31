const countriescontainer = document.querySelector(".countries-container");
const filterbyregion = document.querySelector('.filter-by-region');
const searchinput = document.querySelector('.search-container input')

let allcountriesdata

fetch("./data.json")
  .then((Response) => Response.json())
  .then((data)=>{
    renderedCountries(data)
    allcountriesdata= data
  });


  filterbyregion.addEventListener("change", () => {
  fetch("./data.json")
    .then((Response) => Response.json())
    .then((data) => {
      const filteredcountry = data.filter(
        (country) => country.region === filterbyregion.value
      );

      renderedCountries(filteredcountry);
    });
});

  function renderedCountries(data){
    countriescontainer.innerHTML = ""

    data.forEach((country) => {
      // console.log(country.region); 
      const countrycard = document.createElement("a");
      countrycard.classList.add("country-card");
countrycard.href= `/country.html?name=${country.name}`
      countrycard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name} flag" />
          <div class="card-text">
            <h3>${country.name}</h3>
            <p><b>Population: </b>${country.population.toLocaleString("en-IN")}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country?.capital || "N/A"}</p>
          </div>
`;
      countriescontainer.append(countrycard);
    })
  }

  searchinput.addEventListener('input',()=>{
    // console.log(searchinput.value);
    // console.log(allcountriesdata)
    const filteredcountries = allcountriesdata.filter((country)=>
     country.name.toLowerCase().includes(searchinput.value.toLowerCase()))
    renderedCountries(filteredcountries )
  })

  const themechanger = document.querySelector('.theme-changer')

  themechanger.addEventListener('click',()=>{
    document.body.classList.toggle('dark')
 if (document.body.classList.contains('dark')) {
    themechanger.innerHTML = '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode';
  } else {
    themechanger.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode';
  }
  })