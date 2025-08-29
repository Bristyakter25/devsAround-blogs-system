import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <div className='text-center my-32'>
            <h2 className='lg:text-5xl text-2xl font-bold text-black'>Let’s Start The Conversation!</h2>
            <p className='text-gray-700 my-5 w-[250px] lg:w-[450px] mx-auto'>Have a story to share or a question to ask? Reach out we're always
listening and excited to hear from you!</p>
<Link to="/contactForm"><button className='btn bg-black text-white rounded-2xl p-5'>Contact Us</button></Link>
        </div>
    );
};

export default Contact;