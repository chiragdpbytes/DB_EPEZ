import React, { useState } from 'react'
import SweetAlert from './hooks/SweetAlert'



const Index = () => {
    const [gender, setGender] = useState('')
    const [isOpenState, setIsOpenState] = useState(false);
    const [isOpenCity, setIsOpenCity] = useState(false);

    const handleStateToggleDropdown = () => {
      setIsOpenState(!isOpenState);
    };

    const handleCityToggleDropdown = () => {
      setIsOpenCity(!isOpenCity);
    };

    const handleClick = () => {
        SweetAlert.success("Thank you for adding your response","./images/logo.svg")
    };

  return (
    
<form>
    <div className="grid gap-6 mb-6 lg:grid-cols-4 sm:grid-cols-2">
        <div>
            <label htmlFor="first_name" className="block mb-4 text-base font-semibold text-[#034729]">First Name</label>
            <input type="text" id="first_name" className="bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4" placeholder="e.g. Meet"/>
        </div>
        <div>
            <label htmlFor="last_name" className="block mb-4 text-base font-semibold text-[#034729]">Last Name</label>
            <input type="text" id="last_name" className="bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4" placeholder="e.g. Patel"/>
        </div>
        <div>
            <label htmlFor="age" className="block mb-4 text-base font-semibold text-[#034729]">Age</label>
            <div className='flex'>
                <span className="inline-flex items-center px-5 text-sm text-[#AAA895] bg-[#E2E1D3] border border-r-0 border-[#CFCDB4] rounded-l-md">00</span>
                <input type="date" id="age" className="bg-transparent border border-[#CFCDB4] text-[#AAA895] font-normal text-sm rounded-none rounded-r-lg focus:outline-none focus:border-[#034729] block w-full p-4"/>
            </div>
        </div>
        <div>
            <label htmlFor="gender" className="block mb-4 text-base font-semibold text-[#034729]">Gender</label>
            <div className='flex'>
                <div onClick={() => setGender("male")} className={`${gender === 'male' ? 'bg-[#034729] text-white' : 'text-[#AAA895]' } border border-[#CFCDB4] font-normal text-sm text-center rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4 mr-4 cursor-pointer`}>Male</div>
                <div onClick={() => setGender("female")} className={`${gender === 'female' ? 'bg-[#034729] text-white' : 'text-[#AAA895]' }  border border-[#CFCDB4] font-normal text-sm text-center rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4 mr-4 cursor-pointer`}>Female</div>
                <div onClick={() => setGender("others")} className={`${gender === 'others' ? 'bg-[#034729] text-white' : 'text-[#AAA895]' }  border border-[#CFCDB4] font-normal text-sm text-center rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4 cursor-pointer`}>Others</div>
            </div>
        </div>
        <div className='relative'>
            <label htmlFor="state" className="block mb-4 text-base font-semibold text-[#034729]">State</label>
            <button onClick={handleStateToggleDropdown} id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" 
            className="bg-transparent border relative border-[#CFCDB4] text-[#AAA895] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] text-center inline-flex items-center w-full p-4" type="button">e.g Gujarat <svg className="w-4 h-4 ml-auto" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
            {
                isOpenState && (
                <div id="dropdownSearch" className="absolute top-[96px] z-[2] bg-white rounded-lg shadow w-full ">
                    <div className="p-3">
                    <label htmlFor="input-group-search" className="sr-only">Search</label>
                    <div className="relative">
                        <input type="text" id="input-group-search" className="bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-2 pl-4" placeholder="Search state"/>
                    </div>
                    </div>
                    <div className='p-2'>
                    <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 scrollbar-custom" aria-labelledby="dropdownSearchButton">
                        <li>
                            <div className="flex items-center mb-1">
                                <label htmlFor="checkbox-item-11" className="w-full py-2 text-sm font-medium pl-2 text-black hover:bg-[#034729] hover:text-white cursor-pointer">Gujarat</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center mb-1">
                                <label htmlFor="checkbox-item-11" className="w-full py-2 text-sm font-medium pl-2 text-black hover:bg-[#034729] hover:text-white cursor-pointer">Maharashtra</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center mb-1">
                                <label htmlFor="checkbox-item-11" className="w-full py-2 text-sm font-medium pl-2 text-black hover:bg-[#034729] hover:text-white cursor-pointer">Tamilnadu</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center mb-1">
                                <label htmlFor="checkbox-item-11" className="w-full py-2 text-sm font-medium pl-2 text-black hover:bg-[#034729] hover:text-white cursor-pointer">Delhi</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center mb-1">
                                <label htmlFor="checkbox-item-11" className="w-full py-2 text-sm font-medium pl-2 text-black hover:bg-[#034729] hover:text-white cursor-pointer">Rajasthan</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center mb-1">
                                <label htmlFor="checkbox-item-11" className="w-full py-2 text-sm font-medium pl-2 text-black hover:bg-[#034729] hover:text-white cursor-pointer">Punjab</label>
                            </div>
                        </li>
                    </ul>
                    </div>
                </div>  
                )
            }
        </div>
        <div className='relative'>
            <label htmlFor="city" className="block mb-4 text-base font-semibold text-[#034729]">City</label>
            <button onClick={handleCityToggleDropdown} id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" 
            className="bg-transparent border relative border-[#CFCDB4] text-[#AAA895] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] text-center inline-flex items-center w-full p-4" type="button">e.g Ahmedabad <svg className="w-4 h-4 ml-auto" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
            {
                isOpenCity && (
                <div id="dropdownSearch" className="absolute top-[96px] z-[2] bg-white rounded-lg shadow w-full ">
                    <div className="p-3">
                    <label htmlFor="input-group-search" className="sr-only">Search</label>
                    <div className="relative">
                        <input type="text" id="input-group-search" className="bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-2 pl-4" placeholder="Search state"/>
                    </div>
                    </div>
                    <div className='p-2'>
                    <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 scrollbar-custom" aria-labelledby="dropdownSearchButton">
                        <li>
                            <div className="flex items-center mb-1">
                                <label htmlFor="checkbox-item-11" className="w-full py-2 text-sm font-medium pl-2 text-black hover:bg-[#034729] hover:text-white cursor-pointer">Ahmedabad</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center mb-1">
                                <label htmlFor="checkbox-item-11" className="w-full py-2 text-sm font-medium pl-2 text-black hover:bg-[#034729] hover:text-white cursor-pointer">Surat</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center mb-1">
                                <label htmlFor="checkbox-item-11" className="w-full py-2 text-sm font-medium pl-2 text-black hover:bg-[#034729] hover:text-white cursor-pointer">Bhavnagar</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center mb-1">
                                <label htmlFor="checkbox-item-11" className="w-full py-2 text-sm font-medium pl-2 text-black hover:bg-[#034729] hover:text-white cursor-pointer">Jamanagar</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center mb-1">
                                <label htmlFor="checkbox-item-11" className="w-full py-2 text-sm font-medium pl-2 text-black hover:bg-[#034729] hover:text-white cursor-pointer">Vadodra</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center mb-1">
                                <label htmlFor="checkbox-item-11" className="w-full py-2 text-sm font-medium pl-2 text-black hover:bg-[#034729] hover:text-white cursor-pointer">Morbi</label>
                            </div>
                        </li>
                    </ul>
                    </div>
                </div>  
                )
            }
        </div>
        <div>
            <label htmlFor="pincode" className="block mb-4 text-base font-semibold text-[#034729]">Pincode</label>
            <input type="text" id="pincode" className="bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4" placeholder="e.g. 380051"/>
        </div>
        <div>
            <label htmlFor="mobile_no" className="block mb-4 text-base font-semibold text-[#034729]">Mobile No</label>
            <div className='relative'>
                <input type="text" id="first_name" className="bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4 pr-16" placeholder="e.g. Meet"/>
                <div className='absolute inset-y-0 right-0 flex items-center pl-3 bg-transparent text-[#AAA895] font-normal text-sm p-4 cursor-pointer underline'>
                    verify
                </div>
            </div>
        </div>
    </div>
    <div className="flex items-center justify-center w-full mb-6 z-10">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-[#034729] border-dashed rounded-lg cursor-pointer bg-transparent">
            <div className="flex flex-col items-center justify-center pt-5 pb-5">
                <img src="./images/upload.svg" alt="upload" className='mb-4'/>
                <p className="font-semibold text-[#034729]">Drag your files from device or Upload</p>
                <p className="text-sm text-[#AAA895]">Max Upload size 7-8 MB</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
        </label>
    </div> 
    <div className='flex justify-end'>
        <button type="reset" className="text-[#AAA895] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:bg-[#034729] hover:text-white">Reset</button>
        <button type="button" onClick={handleClick} className="text-white bg-[#034729] border border-[#034729] hover:bg-transparent hover:text-[#034729] font-medium rounded-lg text-sm px-5 py-2.5 mb-2">Save to Continue</button>
    </div>
</form>

  )
}

export default Index