import React from 'react';
import Laptop from "../assets/laptop.png";

const Home = () => {
  return (
    <div className='container bg-gray-100 min-h-screen flex flex-col md:flex-row gap-2 p-4'>
      <div className='md:w-1/2 p-2'>
        <h1 className='text-2xl font-semibold text-center mb-2'>Welcome to the Todo App!</h1>
        <div className=''>
          <p className='text-gray-700 mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est adipisci officia debitis maiores similique rerum dignissimos eligendi at quas facilis, quae accusantium quia sapiente, ducimus fugit eum? Doloribus, ut temporibus!
          Veniam rem dignissimos unde dolores, laudantium fugiat eius. Nostrum maiores culpa atque eaque ipsam? Beatae quod delectus doloremque eligendi eum et sed molestiae voluptates velit. Vitae neque quae ex optio.
          Quibusdam quasi provident accusantium voluptates assumenda obcaecati repudiandae, distinctio nemo, culpa voluptatibus at saepe unde eos magnam odio commodi nesciunt placeat dolorem numquam ducimus perferendis magni! Excepturi cupiditate dignissimos explicabo!
          </p>
          <p className='text-gray-700'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate pariatur sint quibusdam hic molestiae architecto iure labore nemo voluptatem accusantium! Nam, nesciunt exercitationem eveniet cupiditate minus incidunt dolorum quasi eos.
          Mollitia, aut corrupti quod eum quos magni accusantium esse iste. Voluptatem beatae velit, non sit dolorem ratione alias consequatur nulla saepe amet facilis et aut. In consequuntur ut iste porro.</p>
        </div>
      </div>
      <div className='p-2'>
        <img src={Laptop} alt="" className='bg-gray-200 rounded-xl shadow-xl shadow-gray-400'/>
      </div>
    </div>
  )
}

export default Home
