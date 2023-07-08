import Image from "next/image";
import { Inter } from "next/font/google";
import Form from "../components/form";
const inter = Inter({ subsets: ["latin"] });
import Select from "react-select";
import React, { useState, useEffect, useRef, Fragment } from "react";
import locales from "../locales";
import { Dialog, Transition } from "@headlessui/react";

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
      placeholder: (styles) => ({
        ...styles,
        color: "#B2B3B5",
      }),
    };
  },
};

export const languageOptions = [
  { value: "hi", label: "Hindi" },
  { value: "en", label: "English" },
  { value: "gu", label: "Gujarati" },
  { value: "ma", label: "Marathi" },
];

export default function Home() {
  const [isSearchable, setIsSearchable] = useState(true);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  console.log("languagelanguagelanguage", language);

  var selectedLogo = "./logo.svg";
  var selectedLanguage = "";
  var languageKey = languageOptions[0]?.value;

  Object.keys(locales).map((key) => {
    if (key == language.value) {
      languageKey = key;
      selectedLanguage = locales[key];
      selectedLogo = selectedLanguage.logoLabel;
    }
  });
  let props = {
    lang: selectedLanguage,
    langKey: languageKey,
  };
  return (
    <main>
      <Transition.Root show={!open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#E2E1D3] bg-opacity-96 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all   w-[759px] h-[513px] py-16 px-8">
                  <div className="w-full">
                    <img
                      src="./logo.svg"
                      className="w-[139px] h-[125px] block text-center mx-auto"
                    />
                  </div>
                  <h2 className="main-heading text-center popup-title mt-[40px]">
                    What &apos;s your preferred Language?
                  </h2>
                  <div className="relative max-w-[574px] mx-auto mt-[40px]">
                    <div className="flex gender-select">
                      <label className="rounded-0 text-white">
                        <input
                          type="radio"
                          name="toggle"
                          className="d-none"
                          onChange={(e) => setLanguage(languageOptions[0])}
                          checked={languageOptions[0].value === language.value}
                        />
                        <span className="text-center d-block py-3">हिंदी</span>
                      </label>
                      <label className="rounded-0 text-white">
                        <input
                          type="radio"
                          name="toggle"
                          className="d-none"
                          onChange={(e) => setLanguage(languageOptions[1])}
                          checked={languageOptions[1].value === language.value}
                        />
                        <span className="text-center d-block py-3">
                          English
                        </span>
                      </label>
                      <label className="rounded-0 text-white">
                        <input
                          type="radio"
                          name="toggle"
                          className="d-none"
                          checked={languageOptions[2].value === language.value}
                          onChange={(e) => setLanguage(languageOptions[2])}
                        />
                        <span className="text-center d-block py-3">
                          ગુજરાતી
                        </span>
                      </label>
                      <label className="rounded-0 text-white">
                        <input
                          type="radio"
                          name="toggle"
                          className="d-none"
                          checked={languageOptions[3].value === language.value}
                          onChange={() => setLanguage(languageOptions[3])}
                        />
                        <span className="text-center d-block py-3">मराठी</span>
                      </label>
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <p
                      className="flex items-center gap-[10px] justify-center cursor-pointer"
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      {" "}
                      <span className="continue">Continue</span>{" "}
                      <span>
                        <img src="./images/right-arrow-icon.svg" />
                      </span>
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="container">
        <div className="flex justify-between mt-4 mb-6">
          <img src={selectedLogo} alt="logo" className="block w-[92px]" />
          <div className="language-select flex items-center gap-5 cursor-pointer">
            <Select
              className="basic-single text-base font-semibold	text-[#034729]"
              classNamePrefix="select"
              isSearchable={isSearchable}
              value={language}
              name="color"
              options={languageOptions}
              onChange={(e) => setLanguage(e)}
              styles={colourStyles}
            />
            <img src="./Language.svg" alt="language" />
          </div>
        </div>
        <div className="flex justify-center mb-11">
          <h1 className="main-heading text-center 2xl:text-[32px] xl:text-2xl lg:text-xl md:text-lg text-lg font-bold	text-[#034729] w-[969px]">
            Please fill your details and share a clear image of yourself/family
            along with the germinated plant/plants
          </h1>
        </div>
        <Form {...props} />
      </div>
      <footer>
        <img src="./Footer.svg" alt="footer" height="100%" width="100%" />
      </footer>
    </main>
  );
}
