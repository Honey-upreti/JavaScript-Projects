const countriescontainer = document.querySelector(".countries-container");
fetch("./data.json")
  .then((Response) => Response.json())
  .then((data) =>
    data.forEach((country) => {
      console.log(country.topLevelDomain);
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
    }),
  );
