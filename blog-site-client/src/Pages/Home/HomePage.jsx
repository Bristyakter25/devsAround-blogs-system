

import DisplayCreatedBlogs from '../Blogs/displayCreatedBlogs';
import EditorsPickBlogs from '../Blogs/EditorsPickBlogs';
import Banner from './Banner';


const HomePage = () => {
    return (
        <div>
   <Banner></Banner>
        <DisplayCreatedBlogs></DisplayCreatedBlogs>
           {/* <DemoBlogs></DemoBlogs> */}
           <EditorsPickBlogs></EditorsPickBlogs>
           
        </div>
    );
};

export default HomePage;