import Select from "react-select";
import { getData } from "country-list";
import { useState } from "react";
import styles from "./CountriesSelectBox.module.css";

const countriesList = getData();

const options = countriesList.map((list) => {
  return {
    value: list.code,
    label: list.name,
  };
});

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    borderRadius: "5rem",
    padding: "0.5rem 1rem",
    margin: "1rem 0",
  }),
};

const CountriesSelectBox = ({ errorMessage }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className={`${styles.input__group}`}>
      <Select
        options={options}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        styles={colourStyles}
      />
      <span className={`${styles.error__message}`}></span>
    </div>
  );
};

export default CountriesSelectBox;
