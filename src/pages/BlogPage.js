import React, {useEffect, useState} from 'react';
import http from "../plugins/http";
import SinglePost from "../components/SinglePost";

const BlogPage = () => {

    const [data,setData] = useState([])

    useEffect(() => {
        http.get("/getallposts")
            .then(res =>{
                console.log(res)
                setData(res.data)
            })
    }, [])

    return (
        <div className="d-flex flex-wrap">
            {data.map(x => <SinglePost key={x.id} post={x}/>)}
        </div>
    );
};

export default BlogPage;