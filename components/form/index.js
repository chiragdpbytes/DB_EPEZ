import React, { useState, useEffect } from 'react'
import SweetAlert from './hooks/SweetAlert'
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import axios from 'axios';

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

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const Index = () => {
    const [isOpenState, setIsOpenState] = useState(false);
    const [isOpenCity, setIsOpenCity] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [stateAndCityData, setStateAndCity] = useState("");
    const [selectStatesData, setSelectStatesData] = useState();
    const [stateValue, setStateValue] = useState();
    const [city, setCity] = useState();
    const [cityValues, setCityValues] = useState();
    console.log("cityValues",cityValues);
    const [age, setAge] = useState("00");
    // Form Values
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [dateofbirth, setdateofbirth] = useState("");
    const [acmlUsername, setacmlUsername] = useState("");
    const [gender, setGender] = useState('')
    const [selectedOption, setSelectedOption] = useState(null);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    useEffect(() => {
        axios
            .get(`https://ekpedekzindgi.demo1.bytestechnolab.com/api/state-city`)
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                setStateAndCity(data?.data);
            })
            .catch((error) => {
                console.log(error.response.data.error);
            });
    }, []);

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
                temp.push({ value: city[i]?.name, label: city[i]?.name });
            }
            setCityValues(temp);
        }
    }, [stateAndCityData, stateValue, city]);

    const handleStateToggleDropdown = () => {
        setIsOpenState(!isOpenState);
    };

    const handleCityToggleDropdown = () => {
        setIsOpenCity(!isOpenCity);
    };

    const handleClick = () => {
        SweetAlert.success("Thank you for adding your response", "../../../epez-loader.gif")
    };

    const ageCalculation = (e) => {

        setdateofbirth(e.target.value);
        var dob = new Date(e.target.value);
        var month_diff = Date.now() - dob.getTime();
        var age_dt = new Date(month_diff);
        var year = age_dt.getUTCFullYear();
        setAge(Math.abs(year - 1970));
        { age == NaN ? setAge("00") : null }
    }
    const onSubmit = data => { 
        setLoading(true)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 mb-6 lg:grid-cols-4 sm:grid-cols-2">
                {/* <div>
        <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
        </div> */}
                <div className='relative'>
                    <label htmlFor="first_name" className="block mb-4 text-base font-semibold text-[#034729]">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="firstName"
                        {...register("firstName", { required: true })}
                        className="input-field bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4"
                        placeholder="e.g. Meet" />
                    <div className='invalid-feedback' style={{ display: 'block' }}>{errors.firstName && <p style={{ color: '#e50000' }}>First Name is required</p>}</div>
                </div>
                <div className='relative'>
                    <label
                        htmlFor="last_name" className="block mb-4 text-base font-semibold text-[#034729]">Last Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="lastName"
                        {...register("lastName", { required: true })}
                        className="input-field bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4"
                        placeholder="e.g. Patel"

                    />
                    <div className='invalid-feedback' style={{ display: 'block' }}>{errors.lastName && <p style={{ color: '#e50000' }}>Last Name is required</p>}</div>
                </div>
                <div className='relative'>
                    <label htmlFor="age" className="block mb-4 text-base font-semibold text-[#034729]">Age</label>
                    <div className='flex'>
                        <span className="age-count inline-flex items-center px-5 text-sm text-[#AAA895] bg-[#E2E1D3] border-transparent rounded-l-md">{age}</span>
                        <input 
                            type="date"
                            id="age"
                            name='dob'
                            max={new Date().toISOString().split("T")[0]}
                            onChange={(e) => { ageCalculation(e) }}
                            className="input-field bg-transparent border border-[#CFCDB4] text-[#AAA895] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4 pl-16" />
                    </div>
                </div>
                <div className='relative'>
                    <label htmlFor="gender" className="block mb-4 text-base font-semibold text-[#034729]">Gender</label>
                    <div className='flex gender-select'>
                        {/* <div onClick={() => setGender("male")} className={`${gender === 'male' ? 'bg-[#034729] text-white' : 'text-[#AAA895]'} input-field border border-[#CFCDB4] font-normal text-sm text-center rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4 mr-4 cursor-pointer`}>Male</div>
                        <div onClick={() => setGender("female")} className={`${gender === 'female' ? 'bg-[#034729] text-white' : 'text-[#AAA895]'} input-field border border-[#CFCDB4] font-normal text-sm text-center rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4 mr-4 cursor-pointer`}>Female</div>
                        <div onClick={() => setGender("others")} className={`${gender === 'others' ? 'bg-[#034729] text-white' : 'text-[#AAA895]'} input-field border border-[#CFCDB4] font-normal text-sm text-center rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4 cursor-pointer`}>Others</div> */}

                        <label class="rounded-0 text-white">
                            <input type="radio" name="toggle" class="d-none" checked onClick={() => setGender("Male")} />
                            <span class="text-center d-block py-3">Male</span>
                        </label>
                        <label class="rounded-0 text-white">
                            <input type="radio" name="toggle" class="d-none" onClick={() => setGender("Female")} />
                            <span class="text-center d-block py-3">Female</span>
                        </label>
                        <label class="rounded-0 text-white">
                            <input type="radio" name="toggle" class="d-none" onClick={() => setGender("Others")} />
                            <span class="text-center d-block py-3">Others</span>
                        </label>
                    </div>
                </div>
                <div className='relative'>
                    <label htmlFor="state" className="block mb-4 text-base font-semibold text-[#034729]">State</label>

                    <Select
                        placeholder="select state value"
                        className="stylingSelect"
                        // setStateValue
                        onChange={(e) => setStateValue({name: e?.name, id: e.id})}
                        options={selectStatesData}
                        components={{
                        IndicatorSeparator: () => null,
                        }}
                        styles={colourStyles}
                    />

                </div>

                <div className='relative'>
                    <label htmlFor="cty" className="block mb-4 text-base font-semibold text-[#034729]">City</label>

                    <Select
                        placeholder="select city value"
                        className="stylingSelect"
                        options={cityValues}
                        components={{
                            IndicatorSeparator: () => null,
                        }}
                        styles={colourStyles}

                    />
                </div>
                <div className='relative'>
                    <label htmlFor="pincode" className="block mb-4 text-base font-semibold text-[#034729]">Pincode</label>
                    <input
                        type="number"
                        id="pincode"
                        name='pincode'
                        {...register("pincode", {
                            required: {
                                value: true,
                                message: "Pincode is required"
                            },
                            // pattern: {
                            //     value: /^[0-9+-]+$/,
                            //     message: "This is not a valid pincode to me, try again!"
                            // },
                            minLength: {
                                value: 6,
                                message: "Pincode is too short"
                            },
                            maxLength: {
                                value: 6,
                                message: "Now it's too damn long"
                            }
                        })} className="input-field bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4" placeholder="e.g. 380051" />
                    <div className='invalid-feedback' style={{ display: 'block' }}>
                        {errors.pincode && <p style={{ color: '#e50000' }}>{errors?.pincode?.message}</p>}
                    </div>
                </div>
                <div className='relative'>
                    <div className='change-number-wrap flex justify-between'>
                        <label htmlFor="mobile_no" className="block mb-4 text-base font-semibold text-[#034729]">Mobile No</label>
                        <span className="change-number">Change Number</span>
                    </div>
                    <div className='relative'>
                        <input
                            min={0}
                            type="number"
                            id="first_name"
                            name='mobileNo'
                            // {...register("mobileNo", { required: true })}
                            {...register("mobileNo", {
                                required: {
                                    value: true,
                                    message: "Mobile number is required"
                                },
                                // pattern: {
                                //     value: /^[0-9+-]+$/,
                                //     message: "This is not a valid mobile phone to me, try again!"
                                // },
                                minLength: {
                                    value: 10,
                                    message: "Mobile number is too short"
                                },
                                maxLength: {
                                    value: 10,
                                    message: "Now it's too damn long"
                                }
                            })}
                            className="input-field bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4 pr-16" placeholder="e.g. Meet" />
                        <div className='absolute inset-y-0 right-0 flex items-center pl-3 bg-transparent text-[#AAA895] font-normal text-sm p-4 cursor-pointer underline'>
                            verify
                        </div>
                    </div>
                    <div className='invalid-feedback' style={{ display: 'block' }}>
                        {errors.mobileNo && <p style={{ color: '#e50000' }}>{errors?.mobileNo?.message}</p>}
                    </div>
                </div>
            </div>
            <div className="file-upload-wrap flex flex-wrap items-center justify-center w-full mb-6 z-10">
                <label className="w-full block mb-4 text-base font-semibold text-[#034729]">Add Photo</label>
                <label htmlFor="dropzone-file" className="relative flex flex-col items-center justify-center w-full h-40 border-l border-t border-r border-b border-[#034729] border-dashed rounded-lg cursor-pointer bg-transparent p-2 p-3">
                    <div className="flex flex-col items-center justify-center pt-5 pb-5">
                        <img src="../../../Upload.svg" alt="upload" className='mb-4' />
                        <p className="font-semibold text-[#034729]">Drag your files from device or <u>Upload</u></p>
                        <p className="text-sm text-[#AAA895]">Max upload size upto 10 MB</p>
                        {/* <p className="text-sm text-[#AAA895] h-5 overflow-hidden">man-enjoying-indoor-farming.jpg</p> */}
                    </div>
                    <input id="dropzone-file" type="file" className="absolute w-full h-full opacity-0" />
                    {/* <div className='file-upload-load'>
                        <img src="../../../epez-loader.gif" alt="File Upload Loader" />
                    </div> */}
                </label>
            </div>
            <div className='flex justify-end form-btn'>
                <button type="reset" className="text-[#AAA895] font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 hover:bg-[#034729] hover:text-white">Reset</button>

                {
                    !loading ?  <button type="submit" onClick={handleClick} className="text-white bg-[#034729] border border-[#034729] hover:bg-transparent hover:text-[#034729] font-semibold rounded-lg text-base px-5 py15 mb-2">Save to Continue</button> :  <button disabled type="button" class="text-white bg-[#034729] rounded-lg border border-[#034729] hover:bg-transparent hover:text-[#034729] font-semibold rounded-lg text-base px-5 py15 mb-2">
                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffff"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#50BFA5"/>
                    </svg>
                    Loading...
                </button>
                }      
                         
            </div>
        </form>

    )
}

export default Index