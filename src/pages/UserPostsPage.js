import React, {useEffect, useState} from 'react';
import http from "../plugins/http";
import SinglePost from "../components/SinglePost";
import {useParams} from "react-router-dom";

const UserPostsPage = () => {
    const {username} = useParams()

    const [data,setData] = useState([])

    useEffect(() => {
        http.get("/getuserposts/"+username)
            .then(res =>{
                setData(res.data)
            })
    }, [])

    return (
        <div className="d-flex flex-wrap">
            {data.map(x => <SinglePost key={x.id} post={x}/>)}
        </div>
    );
};

export default UserPostsPage;