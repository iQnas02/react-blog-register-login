import React, {useEffect, useState} from 'react';
import http from "../plugins/http";
import SinglePost from "../components/SinglePost";

const BlogPage = ({loggedIn}) => {

    const [data,setData] = useState([])

    function getPosts() {
        http.get("/getallposts")
            .then(res =>{
                // console.log(res)
                setData(res.data.reverse())
            })
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className="d-flex flex-wrap">
            {data.map(x => <SinglePost getPosts={getPosts} loggedIn={loggedIn} key={x.id} post={x}/>)}
        </div>
    );
};

export default BlogPage;