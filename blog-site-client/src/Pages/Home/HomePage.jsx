
import DemoBlogs from '../Blogs/DemoBlogs';
import DisplayCreatedBlogs from '../Blogs/displayCreatedBlogs';


const HomePage = () => {
    return (
        <div>
            <h2>this is home</h2>
            <DisplayCreatedBlogs></DisplayCreatedBlogs>
           <DemoBlogs></DemoBlogs>
           
        </div>
    );
};

export default HomePage;