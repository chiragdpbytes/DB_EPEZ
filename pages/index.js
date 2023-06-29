import Image from 'next/image'
import { Inter } from 'next/font/google'
import Form from '../components/form'
const inter = Inter({ subsets: ['latin'] })
import Select from "react-select";
import React, { useState, useEffect } from 'react'


export const colourOptions = [
  { value: "hindi", label: "Hindi" },
  { value: "english", label: "English" },
  { value: "gujarati", label: "Gujarati" },
  { value: "marathiv", label: "Marathi" },
];

const colourStyles = {
  control: (base) => ({
    ...base,
    height: 54,
    minHeight: 54,
  }),

  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#034729" : isSelected ? "#3d976f" : null,
      color: isFocused ? "#fff " : isSelected ? "#fff !important" : null,
      cursor: isDisabled ? "not-allowed" : "default",

      // control: (base, state) => ({
      //   ...base,
      //   border: "1px solid black",
      //   boxShadow: "none !important",
      //   "&:hover": {
      //     border: "1px solid black",
      //   },
      // }),

      placeholder: (styles) => ({
        ...styles,
        color: "#B2B3B5",
      }),
    };
  },
};


export default function Home() {
  const [isSearchable, setIsSearchable] = useState(true);

  return (
    <main>
      <div className='container'>
        <header className='flex justify-between mt-4 mb-6'>
          <img src="./logo.svg" alt="logo"/>
          <div className='language-select flex items-center gap-5 cursor-pointer'>
            {/* <span className='text-base font-semibold	text-[#034729]'>English</span> */}
            <Select
              className="basic-single text-base font-semibold	text-[#034729]"
              classNamePrefix="select"
              defaultValue={colourOptions[0]}
              isSearchable={isSearchable}
              name="color"
              options={colourOptions}
              styles={colourStyles}
            />
            <img src="./Language.svg" alt="language" />
          </div>
        </header>
        <div className='flex justify-center mb-11 main-heading-wrap'>
          <h1 className='main-heading text-center 2xl:text-[32px] xl:text-2xl lg:text-xl md:text-lg text-lg font-bold	text-[#034729] w-[1030px]'>Please fill your details and share a clear image of yourself/family along with the germinated plant/plants</h1>
        </div>
        <Form/>
      </div>
      <footer>
        <img src="./Footer.svg" alt="footer" height="100%" width="100%"/>
      </footer>
    </main>
  )
}
