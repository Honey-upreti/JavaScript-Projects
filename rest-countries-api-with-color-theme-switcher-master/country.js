const countryName = new URLSearchParams(window.location.search).get("name");
const flagImage = document.querySelector(".country-details img");
const countryNameH1 = document.querySelector(".country-details h1");
const details = document.querySelector(".details-text");

fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    const found = data.find((country) => country.name === countryName);
    console.log(found.languages.map((language)=>language.name).join(","));
    flagImage.src = found.flag;
    countryNameH1.innerText = found.name;
    details.innerHTML = `<p><b>Native Name: </b>${found.nativeName}</p>
            <p><b>Population: </b>${found.population.toLocaleString("en-IN")}</p>
            <p><b>Region: </b>${found.region}</p>
            <p><b>Sub Region: </b>${found.subregion}</p>
            <p><b>Capital: </b>${found.capital || "N/A"}</p>
            <p><b>Top Level Domain: </b>${found.topLevelDomain?.join(", ")}</p>
            <p><b>Currencies: </b>${found.currencies?.map((currency)=> currency.name).join(",") || "N/A"}</p>
            <p><b>Languages: </b>${found.languages?.map((language)=>language.name).join(", ")}</p>`;
  });
