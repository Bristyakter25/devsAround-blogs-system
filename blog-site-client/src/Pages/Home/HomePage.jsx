
import DemoBlogs from '../Blogs/DemoBlogs';
import DisplayCreatedBlogs from '../Blogs/displayCreatedBlogs';
import EditorsPickBlogs from '../Blogs/EditorsPickBlogs';


const HomePage = () => {
    return (
        <div>
            
        <DisplayCreatedBlogs></DisplayCreatedBlogs>
           {/* <DemoBlogs></DemoBlogs> */}
           <EditorsPickBlogs></EditorsPickBlogs>
           
        </div>
    );
};

export default HomePage;