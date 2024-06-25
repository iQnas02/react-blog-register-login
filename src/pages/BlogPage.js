import React, {useEffect, useState} from 'react';
import http from "../plugins/http";
import SinglePost from "../components/SinglePost";
import Pagination from "../pages/Pagination";

const BlogPage = ({loggedIn}) => {

    const [data,setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage]= useState(24);

    function getPosts() {
        http.get("/getallposts")
            .then(res =>{
                setData(res.data.reverse())
            })
    }

    useEffect(() => {
        getPosts()
    }, [])

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div className="d-flex flex-column align-items-center">
            <div className="d-flex flex-wrap">
                {currentPosts.map(post => (
                    <SinglePost getPosts={getPosts} loggedIn={loggedIn} key={post.id} post={post}/>
                ))}
            </div>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={data.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default BlogPage;