

import DisplayCreatedBlogs from '../Blogs/displayCreatedBlogs';
import EditorsPickBlogs from '../Blogs/EditorsPickBlogs';
import Banner from './Banner';
import Contact from './Contact';


const HomePage = () => {
    return (
        <div>
   <Banner></Banner>
        <DisplayCreatedBlogs></DisplayCreatedBlogs>
           {/* <DemoBlogs></DemoBlogs> */}
           <EditorsPickBlogs></EditorsPickBlogs>
          <Contact></Contact>
           
        </div>
    );
};

export default HomePage;