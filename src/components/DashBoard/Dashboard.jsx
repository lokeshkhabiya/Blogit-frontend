import React, { useState } from 'react';
import Navbar from "./Navbar";
import Categories from './Categories';
import BlogList from './BlogList';

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    return (
        <div className="min-h-screen bg-white dark:bg-[#121212]">
            <div className="sticky top-0 z-50">
                <Navbar searchQuery={ searchQuery } setSearchQuery={ setSearchQuery }/>
            </div>
            <div>
                <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
            </div>
            <div>
                <BlogList selectedCategory={selectedCategory} searchQuery={searchQuery} />
            </div>
        </div>
    )

};

export default Dashboard;
