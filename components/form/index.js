import React, { useState, useEffect } from 'react'
import SweetAlert from './hooks/SweetAlert'
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import axios from 'axios';


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
    const [stateData, setStateData] = useState("");
    const [selectStatesData, setSelectStatesData] = useState();
    const [stateValue, setStateValue] = useState();
    const [city, setCity] = useState();

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


    // useEffect(() => {
    //     axios
    //         .get(`http://192.168.10.150:8000/api/state-city`)
    //         .then((response) => {
    //             return response.data;
    //         })
    //         .then((data) => {
    //             setStateData(data?.data);
    //         })
    //         .catch((error) => {
    //             console.log(error.response.data.error);
    //         });
    // }, []);

    useEffect(() => {

        if (stateData && stateData.length > 0) {
            var temp = [];
            stateData?.map((data) => {
                temp.push({ value: data?.name, label: data?.name, id: data?.id });
            });
            setSelectStatesData(temp);
        }
    }, [stateData]);

    const handleStateToggleDropdown = () => {
        setIsOpenState(!isOpenState);
    };

    const handleCityToggleDropdown = () => {
        setIsOpenCity(!isOpenCity);
    };

    const handleClick = () => {
        SweetAlert.success("Thank you for adding your response", "./images/logo.svg")
    };

    const onSubmit = data => { }

    const handleChange_age = (event) => {
        console.log("DOB:", event.target.value);

        this.setState({ dob1: event.target.value }, () => {
            // example of setState callback
            // this will have the latest this.state.dob1
            console.log(this.state.dob1);
        })

        // call calculate_age with event.target.value
        var age_latest = { age_latest: this.calculate_age(event.target.value) }
        console.log(age_latest);

        this.setState({ age1: age_latest }, () => {
            // this will have the latest this.state.age1
            console.log("Age:", this.state.age1);
        })
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
                <div>
                    <label htmlFor="first_name" className="block mb-4 text-base font-semibold text-[#034729]">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="firstName"
                        {...register("firstName", { required: true })}
                        className="bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4"
                        placeholder="e.g. Meet" />
                    <div className='invalid-feedback' style={{ display: 'block' }}>{errors.firstName && <p style={{ color: 'red' }}>first Name is required</p>}</div>
                </div>
                <div>
                    <label
                        htmlFor="last_name" className="block mb-4 text-base font-semibold text-[#034729]">Last Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="lastName"
                        {...register("lastName", { required: true })}
                        className="bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4"
                        placeholder="e.g. Patel"

                    />
                    <div className='invalid-feedback' style={{ display: 'block' }}>{errors.lastName && <p style={{ color: 'red' }}>Last Name is required</p>}</div>

                </div>
                <div>
                    <label htmlFor="age" className="block mb-4 text-base font-semibold text-[#034729]">Age</label>
                    <div className='flex'>
                        <span className="inline-flex items-center px-5 text-sm text-[#AAA895] bg-[#E2E1D3] border border-r-0 border-[#CFCDB4] rounded-l-md">00</span>
                        <input
                            type="date"
                            id="age"
                            name='dob'
                            onChange={(dob) => calculate_age(dob)}
                            {...register("dob", { required: true })}
                            className="bg-transparent border border-[#CFCDB4] text-[#AAA895] font-normal text-sm rounded-none rounded-r-lg focus:outline-none focus:border-[#034729] block w-full p-4" />
                    </div>
                </div>
                <div>
                    <label htmlFor="gender" className="block mb-4 text-base font-semibold text-[#034729]">Gender</label>
                    <div className='flex'>
                        <div onClick={() => setGender("male")} className={`${gender === 'male' ? 'bg-[#034729] text-white' : 'text-[#AAA895]'} border border-[#CFCDB4] font-normal text-sm text-center rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4 mr-4 cursor-pointer`}>Male</div>
                        <div onClick={() => setGender("female")} className={`${gender === 'female' ? 'bg-[#034729] text-white' : 'text-[#AAA895]'}  border border-[#CFCDB4] font-normal text-sm text-center rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4 mr-4 cursor-pointer`}>Female</div>
                        <div onClick={() => setGender("others")} className={`${gender === 'others' ? 'bg-[#034729] text-white' : 'text-[#AAA895]'}  border border-[#CFCDB4] font-normal text-sm text-center rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4 cursor-pointer`}>Others</div>
                    </div>
                </div>
                <div>
                    <label htmlFor="state" className="block mb-4 text-base font-semibold text-[#034729]">State</label>

                    <Select
                        placeholder="select state value"
                        // setStateValue
                        onChange={(e) => setStateValue({ name: e?.name, id: e.id })}
                        options={selectStatesData}
                        components={{
                            IndicatorSeparator: () => null,
                        }}
                        styles={{
                            control: () => ({
                                padding: "2px 10px 2px 21px",
                                height: "54px",
                                display: "flex",
                                border: "1px solid #D1D2D3",
                                borderRadius: "8px",
                                fontSize: "14px",
                                lineHeight: "28px",
                            }),
                            placeholder: (styles) => ({
                                ...styles,
                                color: "#B2B3B5",
                            }),
                        }}
                    />

                </div>
                

                <div>
                <label htmlFor="cty" className="block mb-4 text-base font-semibold text-[#034729]">City</label>

                    <Select
                        placeholder="select state value"
                        // setStateValue
                        // onChange={(e) => setStateValue({name: e?.name, id: e.id})}
                        options={city}
                        components={{
                            IndicatorSeparator: () => null,
                        }}
                        styles={{
                            control: () => ({
                                padding: "2px 10px 2px 21px",
                                height: "54px",
                                display: "flex",
                                border: "1px solid #D1D2D3",
                                borderRadius: "8px",
                                fontSize: "14px",
                                lineHeight: "28px",
                            }),
                            placeholder: (styles) => ({
                                ...styles,
                                color: "#B2B3B5",
                            }),
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="pincode" className="block mb-4 text-base font-semibold text-[#034729]">Pincode</label>
                    <input
                        type="number"
                        id="pincode"
                        name='pincode'
                        {...register("pincode", {
                            required: {
                                value: true,
                                message: "Please add your pincode "
                            },
                            // pattern: {
                            //     value: /^[0-9+-]+$/,
                            //     message: "This is not a valid pincode to me, try again!"
                            // },
                            minLength: {
                                value: 10,
                                message: "This pincode is too short, not gotta fly, try again"
                            },
                            maxLength: {
                                value: 10,
                                message: "...And now it's too damn long, make sure the number is right, would you?"
                            }
                        })} className="bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4" placeholder="e.g. 380051" />
                    <div className='invalid-feedback' style={{ display: 'block' }}>
                        {errors.pincode && <p style={{ color: 'red' }}>{errors?.pincode?.message}</p>}
                    </div>

                </div>
                <div>
                    <label htmlFor="mobile_no" className="block mb-4 text-base font-semibold text-[#034729]">Mobile No</label>
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
                                    message: "Please add your mobile phone number, I won't call you, promise!"
                                },
                                // pattern: {
                                //     value: /^[0-9+-]+$/,
                                //     message: "This is not a valid mobile phone to me, try again!"
                                // },
                                minLength: {
                                    value: 10,
                                    message: "This number is too short, not gotta fly, try again"
                                },
                                maxLength: {
                                    value: 10,
                                    message: "...And now it's too damn long, make sure the number is right, would you?"
                                }
                            })}
                            className="bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4 pr-16" placeholder="e.g. Meet" />
                        <div className='invalid-feedback' style={{ display: 'block' }}>
                            {errors.mobileNo && <p style={{ color: 'red' }}>{errors?.mobileNo?.message}</p>}
                        </div>
                        <div className='absolute inset-y-0 right-0 flex items-center pl-3 bg-transparent text-[#AAA895] font-normal text-sm p-4 cursor-pointer underline'>
                            verify
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex items-center justify-center w-full mb-6 z-10">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-[#034729] border-dashed rounded-lg cursor-pointer bg-transparent">
                    <div className="flex flex-col items-center justify-center pt-5 pb-5">
                        <img src="../../../Upload.svg" alt="upload" className='mb-4' />
                        <p className="font-semibold text-[#034729]">Drag your files from device or <u>Upload</u></p>
                        <p className="text-sm text-[#AAA895]">Max upload size upto 10 MB</p>
                        <p className="image-name text-[#AAA895]">man-enjoying-indoor-farming.jpg</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>
            <div className='flex justify-end'>
                <button type="reset" className="text-[#AAA895] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:bg-[#034729] hover:text-white">Reset</button>
                <button type="submit" onClick={handleClick} className="text-white bg-[#034729] border border-[#034729] hover:bg-transparent hover:text-[#034729] font-medium rounded-lg text-sm px-5 py-2.5 mb-2">Save to Continue</button>
            </div>
        </form>

    )
}

export default Index