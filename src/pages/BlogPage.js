import React, { useEffect, useState } from 'react';
import http from "../plugins/http";
import SinglePost from "../components/SinglePost";
import Pagination from "../pages/Pagination";

const BlogPage = ({ loggedIn }) => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(24);
    const [filteredData, setFilteredData] = useState([]);
    const [usernameFilter, setUsernameFilter] = useState('');
    const [dateFromFilter, setDateFromFilter] = useState('');
    const [dateToFilter, setDateToFilter] = useState('');
    const [titleFilter, setTitleFilter] = useState('');

    function getPosts() {
        http.get("/getallposts")
            .then(res => {
                const posts = res.data.reverse();
                setData(posts);
                setFilteredData(posts);
            });
    }

    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
        filterPosts();
    }, [usernameFilter, dateFromFilter, dateToFilter, titleFilter]);

    const filterPosts = () => {
        let filtered = data;

        if (usernameFilter) {
            filtered = filtered.filter(post => post.username.toLowerCase().includes(usernameFilter.toLowerCase()));
        }

        if (dateFromFilter) {
            filtered = filtered.filter(post => new Date(post.timestamp) >= new Date(dateFromFilter));
        }

        if (dateToFilter) {
            filtered = filtered.filter(post => new Date(post.timestamp) <= new Date(dateToFilter));
        }

        if (titleFilter) {
            filtered = filtered.filter(post => post.title.toLowerCase().includes(titleFilter.toLowerCase()));
        }

        setFilteredData(filtered);
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="d-flex mb-3">
                <input
                    type="text"
                    placeholder="Filter by username"
                    value={usernameFilter}
                    onChange={e => setUsernameFilter(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Date from"
                    value={dateFromFilter}
                    onChange={e => setDateFromFilter(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Date to"
                    value={dateToFilter}
                    onChange={e => setDateToFilter(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter by title"
                    value={titleFilter}
                    onChange={e => setTitleFilter(e.target.value)}
                />
            </div>
            <div className="d-flex flex-wrap">
                {currentPosts.map(post => (
                    <SinglePost getPosts={getPosts} loggedIn={loggedIn} key={post.id} post={post} />
                ))}
            </div>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={filteredData.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default BlogPage;
