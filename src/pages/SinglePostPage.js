import React, {useEffect, useState} from 'react';
import http from "../plugins/http";
import {useParams} from "react-router-dom";
import SinglePost from "../components/SinglePost";

const SinglePostPage = ({loggedIn}) => {
    const {username, id} = useParams()

    const [data,setData] = useState(null)

    useEffect(() => {
        http.get(`/getsinglepost/${username}/${id}`)
            .then(res =>{
                setData(res.data)
            })
    }, [username, id])

    return (
        <div>
            {data && <SinglePost post={data} loggedIn={loggedIn} getPosts={() => {}} hideDeleteButton={true} hideDetails={true} className="singlePostPage"/>}



        </div>
    );
};

export default SinglePostPage;