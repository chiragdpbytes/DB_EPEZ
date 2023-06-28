import React from 'react';
import 'tailwindcss/tailwind.css'
import '../app/globals.css'
import Form from '../components/form'


export default function Home() {
    return (
      <main>
        <div className='container'>
          <div className='flex justify-between mt-4 mb-6'>
            <img src="./images/logo.svg" alt="logo"/>
            <img src="./images/language.svg" alt="language" />
          </div>
          <div className='flex justify-center mb-11'>
            <h1 className='main-heading text-center 2xl:text-[32px] xl:text-2xl lg:text-xl md:text-lg text-lg font-bold	text-[#034729] 2xl:w-9/12 md:w-8/12 sm:w-10/12 w-10/12 '>Please fill your details and share a clear image of yourself/family along with the germinated plant/plants</h1>
          </div>
          <Form/>
        </div>
        <footer>
          <img src="./images/Footer.svg" alt="footer" height="100%" width="100%"/>
        </footer>
      </main>
    )
}