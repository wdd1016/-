import React from "react";

import "./CountryInfo.css";

const CountryInfo = ({country}) => {

  return (
    
    <div className="flag">
      <a href={country.map} target="_blank"><img className src={country.flag}/></a>
      <div className="title">{country.name}</div>
      <div className="infos">Capital: {country.capital}</div>
      <div className="infos">Region: {country.region}</div>
      <div className="infos">Language: {country.lang}</div>
      <div className="infos">Currency: {country.cur}</div>
      <div className="infos">Time zone: {country.time}</div> 
      

    </div>

  );
};

export default CountryInfo;
