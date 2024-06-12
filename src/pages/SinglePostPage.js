import React, {useEffect, useState} from 'react';
import http from "../plugins/http";
import {useParams} from "react-router-dom";
import SinglePost from "../components/SinglePost";

const SinglePostPage = () => {
    const {username, id} = useParams()

    const [data,setData] = useState(null)

    useEffect(() => {
        http.get(`/getsinglepost/${username}/${id}`)
            .then(res =>{
                console.log(res)
                setData(res.data)
            })
    }, [])

    return (
        <div>
            {data && <SinglePost post={data}/>}
        </div>
    );
};

export default SinglePostPage;