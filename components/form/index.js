import React, { useState, useEffect, useRef } from "react";
import SweetAlert from "./hooks/SweetAlert";
import { useForm } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { apiconfig } from "./hooks/apiconfig";

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

const Index = (props) => {
  const language = props.lang;
  const langKey = props.langKey;
  const [loading, setLoading] = useState(false);
  const [stateAndCityData, setStateAndCity] = useState("");
  const [selectStatesData, setSelectStatesData] = useState();
  const [stateValue, setStateValue] = useState();
  const [city, setCity] = useState();
  const [cityOptionValues, setCityOptionValues] = useState();
  const [cityValues, setCityValues] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [age, setAge] = useState("22");
  const [phoneNumber, setphoneNumber] = useState("");
  const [dateofbirth, setdateofbirth] = useState("2000-01-01");
  const [gender, setGender] = useState(language.male);
  const [mobileVerify, setMobileVerify] = useState("");
  const [verify, setVerify] = useState(false);
  const [verifyNo, setVerifyNo] = useState("");
  const [errorFileSize, setErrorFileSize] = useState("");
  const [errorAge, setErrorAge] = useState("");
  const [errorState, setErrorState] = useState("");
  const [errorCity, setErrorCity] = useState("");
  const [resetData, setResetData] = useState(false);
  const [fileName, setFileName] = useState(language.uploadSize);
  const [errorFileType, setErrorFileType] = useState("");
  const [selectCityDefaultData, setSelectCityDefaultData] = useState();
  const [cityErrorMessage, setCityErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const selectInputRefState = useRef();
  const selectInputRefCity = useRef();


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    setFileName(language.uploadSize);
    setGender(language.male);
  }, [props]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      axios
        .get(`${apiconfig?.apiEndpoint}state-city`)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setStateAndCity(data?.data);
        })
        .catch((error) => {
          // console.log(error.response.data.error);
        });
    } catch (error) {
      // console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (stateAndCityData && stateAndCityData.length > 0) {
      var temp = [];
      stateAndCityData?.map((data) => {
        temp.push({ value: data?.name, label: data?.name, id: data?.id });
      });
      setSelectStatesData(temp);
    }

    if (stateValue) {
      for (let i in stateAndCityData) {
        if (stateAndCityData[i]?.id === stateValue?.id) {
          setCity(stateAndCityData[i]?.city);
        }
      }
    }
    if (city) {
      var temp = [];
      for (let i in city) {
        temp.push({ value: city[i]?.id, label: city[i]?.name });
      }
      setCityOptionValues(temp);
    }
  }, [stateAndCityData, stateValue, city]);

  useEffect(() => {
    if (selectStatesData) {
      var tempCity = [];
      for (let i in stateAndCityData) {
        if (selectStatesData[0].id === stateAndCityData[i].id) {
          tempCity.push({
            value: stateAndCityData[i].city[i].name,
            label: stateAndCityData[i].city[i].name,
            id: stateAndCityData[i].city[i].id,
          });
          setSelectCityDefaultData(tempCity);
        }
      }
    }
    if (stateValue) {
      var tempCity = [];

      for (let i in stateAndCityData) {
        if (stateValue.id === stateAndCityData[i].id) {
          tempCity.push({
            value: stateAndCityData[i].city[0].name,
            label: stateAndCityData[i].city[0].name,
          });
          setSelectCityDefaultData(tempCity);
        }
      }
    }
  }, [selectStatesData, stateValue]);

  const verifyFunc = () => {
    setMobileVerify("");
    const data = { mobile_no: phoneNumber };
    axios
      .post(`${apiconfig?.apiEndpoint}verify-mobile-sms`, data)
      .then((response) => {
        const successTrue = response.data.success;
        if (successTrue === true) {
          setVerify(true);
          
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  const trackVerify = (e) => {
    if (e.target.value.length == 4) {
      setVerifyNo(e.target.value);
      mobileVerification(e.target.value);
    }
  };

  const mobileVerification = (verificationCode) => {
    const data = {
      mobile_no: phoneNumber,
      verification_code: verificationCode,
    };
    axios
      .post(`${apiconfig?.apiEndpoint}verify-mobile`, data)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setMobileVerify(data?.message);
      })
      .catch((error) => {
        // console.log(error.response.data.error);
      });
  };

  const ageCalculation = (e) => {
    setdateofbirth(e?.target?.value);
    var dob = new Date(e?.target?.value);
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    setAge(Math.abs(year - 1970));
    {
      age == NaN ? setAge("1") : null;
    }
  };
  const onSubmit = (data) => {
    setLoading(true);

    var formdata = new FormData();
    formdata.append("first_name", data?.firstName);
    formdata.append("last_name", data?.lastName);
    formdata.append("age", age);
    formdata.append("dob", dateofbirth);
    formdata.append("gender", gender);
    formdata.append(
      "state",
      stateValue?.id ? stateValue?.id : selectStatesData[0]?.id
    );
    formdata.append(
      "city",
      cityValues ? cityValues : selectCityDefaultData[0].id
    );
    formdata.append("pin_code", data?.pincode);
    formdata.append("mobile_no", phoneNumber);
    formdata.append("image", data?.banner_image);
    axios
      .post(`${apiconfig?.apiEndpoint}registarion`, formdata)
      .then((data) => {
        setLoading(false);
        if (data?.data?.success === false) {
          reset();
          SweetAlert.error(data?.data?.message, data?.data?.message);
          return false;
        }

        if (data?.data?.success === true) {
          setResetData(true);
          setFileName(language.uploadSize);
          handleManageVerify();
          onClear();
          setCityErrorMessage("");
        }

        SweetAlert.success(
          "Thank you for adding your response",
          "./epez-loader.gif"
        );
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    reset();
  }, [resetData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileSizeKb = file.size / 1024;
    const validExtensions = ["png", "jpeg", "jpg"];
    const fileExtension = file.type.split("/")[1];
    const ifValidImgType = validExtensions.includes(fileExtension);
    if (!ifValidImgType) {
      setErrorFileType(language.fileTypeError);
      setErrorMessage(language.fileTypeError);
      return;
    } else {
      if (file && fileSizeKb > 10240) {
        setErrorFileSize(true);
        setErrorMessage(language.uploadSize);
        return;
      } else {
        setValue("banner_image", file, { shouldValidate: true });
        setErrorFileSize(false);
        setFileName(file.name);
        setErrorFileType("");
        setErrorMessage("");
      }
    }
  };

  const handleManageVerify = () => {
    setVerify(false);
    setErrorFileType("");
    setMobileVerify("Verify");
    document.getElementById("verify_no").value = "";
  };

  const handlePhoneSubmit = (e) => {
    setphoneNumber(e);
  };

  const onClear = () => {
    selectInputRefState.current.clearValue();
    selectInputRefCity.current.clearValue();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 mb-6 lg:grid-cols-4 sm:grid-cols-2">
        <div className="relative">
          <label
            htmlFor="first_name"
            className="block mb-4 text-base font-semibold text-[#034729]"
          >
            {language.firstNameLabel}{" "}
            <span style={{ color: "#e50000" }}>*</span>
          </label>
          <input
            type="text"
            id="first_name"
            name="firstName"
            {...register("firstName", {
              required: {
                value: true,
                message: "Firstname is required",
              },
              minLength: {
                value: 2,
                message: "Firstname is too short",
              },
              maxLength: {
                value: 100,
                message: "Firstname is too long",
              },
            })}
            onChange={(e) => {
              setValue("firstName", e?.target?.value, { shouldValidate: true });
            }}
            onBlur={(e) => {
              setValue("firstName", e?.target?.value, { shouldValidate: true });
            }}
            className="input-field bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4"
            placeholder={language.firstNamePlaceholder}
          />
          <div className="invalid-feedback" style={{ display: "block" }}>
            {errors.firstName && (
              <p style={{ color: "#e50000" }}>{errors?.firstName?.message}</p>
            )}
          </div>
        </div>
        <div className="relative">
          <label
            htmlFor="last_name"
            className="block mb-4 text-base font-semibold text-[#034729]"
          >
            {language.lastNameLabel}
            <span style={{ color: "#e50000" }}> *</span>
          </label>
          <input
            type="text"
            id="last_name"
            name="lastName"
            {...register("lastName", {
              required: {
                value: true,
                message: "Lastname is required",
              },
              minLength: {
                value: 2,
                message: "Lastname is too short",
              },
              maxLength: {
                value: 100,
                message: "Lastname is too long",
              },
            })}
            onChange={(e) => {
              setValue("lastName", e?.target?.value, { shouldValidate: true });
            }}
            onBlur={(e) => {
              setValue("lastName", e?.target?.value, { shouldValidate: true });
            }}
            className="input-field bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4"
            placeholder={language.lastNamePlaceholder}
          />
          <div className="invalid-feedback" style={{ display: "block" }}>
            {errors.lastName && (
              <p style={{ color: "#e50000" }}>{errors?.lastName?.message}</p>
            )}
          </div>
        </div>
        <div className="relative">
          <label
            htmlFor="age"
            className="block mb-4 text-base font-semibold text-[#034729]"
          >
            {language.ageLabel} <span style={{ color: "#e50000" }}>*</span>
          </label>
          <div className="flex">
            <span className="age-count inline-flex items-center px-5 text-sm text-[#AAA895] bg-[#E2E1D3] border-transparent rounded-l-md">
              {age}
            </span>
            <input
              required
              value={dateofbirth}
              type="date"
              id="age"
              name="dob"
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                if (e === "00") {
                  setErrorAge("please select age");
                }
                ageCalculation(e);
              }}
              className="input-field bg-transparent border border-[#CFCDB4] text-[#AAA895] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4 pl-16"
            />
            <div className="invalid-feedback" style={{ display: "block" }}>
              {errorAge && <p style={{ color: "red" }}>{errorAge}</p>}
            </div>
          </div>
        </div>
        <div className="relative">
          <label
            htmlFor="gender"
            className="block mb-4 text-base font-semibold text-[#034729]"
          >
            {language.genderLabel} <span style={{ color: "#e50000" }}>*</span>
          </label>
          <div className="flex gender-select">
            <label className="rounded-0 text-white">
              <input
                type="radio"
                name="toggle"
                className="d-none"
                checked={gender === language.male}
                onChange={() => setGender(language.male)}
              />
              <span className="text-center d-block py-3">{language.male}</span>
            </label>
            <label className="rounded-0 text-white">
              <input
                type="radio"
                name="toggle"
                className="d-none"
                checked={gender === language.female}
                onChange={() => setGender(language.female)}
              />
              <span className="text-center d-block py-3">
                {language.female}
              </span>
            </label>
            <label className="rounded-0 text-white">
              <input
                type="radio"
                name="toggle"
                className="d-none"
                checked={gender === language.other}
                onChange={() => setGender(language.other)}
              />
              <span className="text-center d-block py-3">{language.other}</span>
            </label>
          </div>
        </div>
      </div>
      <div className="grid gap-6 mb-6 lg:grid-cols-5 sm:grid-cols-2">
        <div className="relative">
          <label
            htmlFor="state"
            className="block mb-4 text-base font-semibold text-[#034729]"
          >
            {language.stateLabel} <span style={{ color: "#e50000" }}>*</span>
          </label>
          {selectStatesData && (
            <Select
              placeholder="select state value"
              className="stylingSelect"
              ref={selectInputRefState}
              defaultValue={selectStatesData && selectStatesData[0]}
              onInputChange={(e) => setIsDisabled(false)}
              onChange={(e) => {
                setStateValue({ name: e?.name, id: e?.id });
                selectInputRefCity.current.clearValue();
              }}
              options={selectStatesData}
              components={{
                IndicatorSeparator: () => null,
              }}
              styles={colourStyles}
            />
          )}

          <div className="invalid-feedback" style={{ display: "block" }}>
            {errorState && <p style={{ color: "red" }}>{errorState}</p>}
          </div>
          {errors.state && (
            <p style={{ color: "red" }}>state Name is required</p>
          )}
        </div>
        <div className="relative">
          <label
            htmlFor="cty"
            className="block mb-4 text-base font-semibold text-[#034729]"
          >
            {language.cityLabel} <span style={{ color: "#e50000" }}>*</span>
          </label>
          {selectCityDefaultData && (
            <Select
              placeholder="select city value"
              className="stylingSelect"
              ref={selectInputRefCity}
              options={cityOptionValues}
              defaultValue={selectCityDefaultData[0]}
              onChange={(e) => {
                if (e?.value === undefined) {
                  setCityErrorMessage("please select city");
                  setCityValues(e?.value);
                } else {
                  setCityErrorMessage("");
                  setCityValues(e?.value);
                }
              }}
              components={{
                IndicatorSeparator: () => null,
              }}
              styles={colourStyles}
            />
          )}
          <div className="invalid-feedback" style={{ display: "block" }}>
            {cityErrorMessage && (
              <p style={{ color: "red" }}>{cityErrorMessage}</p>
            )}
          </div>
        </div>
        <div className="relative">
          <label
            htmlFor="pincode"
            className="block mb-4 text-base font-semibold text-[#034729]"
          >
            {language.pincodeLabel} <span style={{ color: "#e50000" }}>*</span>
          </label>
          <input
            type="number"
            min={0}
            id="pincode"
            name="pincode"
            {...register("pincode", {
              required: {
                value: true,
                message: "Pincode is required",
              },
              minLength: {
                value: 6,
                message: "Pincode must be 6 digit!",
              },
              maxLength: {
                value: 6,
                message: "Pincode must be 6 digit!",
              },
            })}
            onChange={(e) => {
              setValue("pincode", e?.target?.value, { shouldValidate: true });
            }}
            onBlur={(e) => {
              setValue("pincode", e?.target?.value, { shouldValidate: true });
            }}
            className="input-field bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4"
            placeholder={language.pincodePlaceholder}
          />
          <div className="invalid-feedback" style={{ display: "block" }}>
            {errors.pincode && (
              <p style={{ color: "#e50000" }}>{errors?.pincode?.message}</p>
            )}
          </div>
        </div>
        <div className="relative">
          <div className="change-number-wrap flex justify-between under-verifying">
            <label
              htmlFor="mobile_no"
              className="block mb-4 text-base font-semibold text-[#034729]"
            >
              {language.mobileLabel}

              <span style={{ color: "#e50000" }}>*</span>
            </label>

            {verify == true ? (
              <span className="change-number" onClick={handleManageVerify}>
                {language.changeMobileLabel}
              </span>
            ) : null}
          </div>
          <div className="relative">
            <input
              min={0}
              type="number"
              id="mobile_no"
              disabled={verify ? true : false}
              {...register("mobileNo", {
                required: {
                  value: true,
                  message: "Mobile Number is required",
                },
                pattern: {
                  value: /^\d{10}$/,
                  message: "Mobile Number should be exactly 10 digits",
                },
              })}
              name="mobileNo"
              className="input-field bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4 pr-16"
              placeholder={language.mobilePlaceholder}
              onChange={(e) => {
                handlePhoneSubmit(e?.target?.value);
                setValue("mobileNo", e?.target?.value, {
                  shouldValidate: true,
                });
              }}
              onBlur={(e) => {
                setValue("mobileNo", e?.target?.value, {
                  shouldValidate: true,
                });
              }}
            />
            {!verify && (
              <div className="absolute inset-y-0 right-0 flex items-center pl-3 bg-transparent text-[#AAA895] font-normal text-sm p-4 cursor-pointer underline">
                {!phoneNumber ? (
                  <button disabled>verify</button>
                ) : (
                  <button onClick={handleSubmit(verifyFunc)}>verify</button>
                )}
              </div>
            )}
          </div>
          <div className="invalid-feedback" style={{ display: "block" }}>
            {errors?.mobileNo && (
              <p style={{ color: "red" }}>{errors?.mobileNo?.message}</p>
            )}
          </div>
        </div>
        <div className="relative">
          <div className="change-number-wrap flex justify-between under-verifying">
            <label
              htmlFor="mobile_no"
              className="block mb-4 text-base font-semibold text-[#034729]"
            >
              {language.verificationMobileLabel}{" "}
              <span style={{ color: "#e50000" }}> *</span>
            </label>
          </div>
          <div className="relative">
            <input
              min={0}
              onChange={(e) => trackVerify(e)}
              type="number"
              disabled={!verify || mobileVerify === "Verified!" ? true : false}
              id="verify_no"
              name="verifyNo"
              className="input-field bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4 pr-16"
              placeholder={language.verificationMobileLabel}
              required
            />
            {verify && (
              <div className="absolute inset-y-0 right-0 flex items-center pl-3 bg-transparent text-[#aaa895] font-normal text-sm p-4">
                {mobileVerify}
              </div>
            )}
          </div>
          <div className="invalid-feedback" style={{ display: "block" }}>
            {errors.verifyNo && (
              <p style={{ color: "#e50000" }}>{errors?.verifyNo?.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="file-upload-wrap flex flex-wrap items-center justify-center w-full mb-8 z-10">
        <label className="w-full block mb-4 text-base font-semibold text-[#034729]">
          {language.photoLabel}
        </label>
        <label
          htmlFor="dropzone-file"
          className="relative flex flex-col items-center justify-center w-full h-40 border-l border-t border-r border-b border-[#034729] border-dashed rounded-lg cursor-pointer bg-transparent p-2 p-3"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-5">
            {errorMessage === "" && fileName !== language.uploadSize ? (
              <img
                src="../../../checkmark-transparent.gif"
                alt="Image Uploaded"
                width="60"
                height="60"
                className="mb-4"
              />
            ) : (
              <img src="../../../Upload.svg" alt="upload" className="mb-4" />
            )}
            <p className="font-semibold text-[#034729]">
              {language.uploadLabel} <u>{language.uploadLink}</u>
            </p>
            {errorMessage === "" ? (
              <p className="text-sm text-[#AAA895]">{fileName}</p>
            ) : (
              <p className="text-sm text-[#ff0000]">{errorMessage}</p>
            )}

            {/* {
                errorFileSize && <p className="text-sm text-[#ff0000]">File Size is More than 10MB</p>
            }
            {
                errorFileType && <p className="text-sm text-[#ff0000]">File Type Not Allowed</p>
            } */}

            {/* <p className="text-sm text-[#AAA895] h-5 overflow-hidden">man-enjoying-indoor-farming.jpg</p> */}
          </div>
          <input
            id="dropzone-file"
            type="file"
            name="image"
            accept="image/jpg, image/png, image/jpeg"
            onChange={handleImageChange}
            className="absolute w-full h-full opacity-0"
          />
        </label>
        <div className="invalid-feedback" style={{ display: "block" }}></div>
      </div>
    
      <div className="flex justify-end form-btn">
        <button
          onClick={() => {
            setResetData(true);
            setFileName(language.uploadSize);
            setErrorFileType("");
            setErrorMessage("");
            setVerify(false);
            setMobileVerify("Verify");
            onClear();
            setCityErrorMessage("");
          }}
          type="reset"
          className="text-[#AAA895] font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 hover:bg-[#034729] hover:text-white"
        >
          Reset
        </button>
        {!loading ? (
          <button
            type="submit"
            className={`${`text-white bg-[#034729] border border-[#034729] hover:bg-transparent hover:text-[#034729] font-semibold rounded-lg text-base px-5 py15 mb-2`} 
            ${mobileVerify !== "Verified!" && `pointer-events-none opacity-70 first`}
            ${fileName === language.uploadSize &&`pointer-events-none opacity-70 second`}
            ${errorMessage !== "" && `pointer-events-none opacity-70 third`}
            ${cityErrorMessage !== "" && `pointer-events-none opacity-70 fourth`}
            ${errors.firstName !== undefined && `pointer-events-none opacity-70 five`}
            ${errors.lastName !== undefined && `pointer-events-none opacity-70 six`}
            ${errors.pincode !== undefined && `pointer-events-none opacity-70 seven`}
              `}
          >
            Save to Continue
          </button>
        ) : (
          <button
            disabled
            type="button"
            className="text-white bg-[#034729] rounded-lg border border-[#034729] hover:bg-transparent hover:text-[#034729] font-semibold rounded-lg text-base px-5 py15 mb-2"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#ffffff"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#50BFA5"
              />
            </svg>
            Loading...
          </button>
        )}
      </div>
    </form>
  );
};

export default Index;
