"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async (query = "") => {
    setIsLoading(true);
    try {
      const url = query 
        ? `/api/prompt/search?searchText=${encodeURIComponent(query)}` 
        : "/api/prompt";
      
      const response = await fetch(url);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        fetchPosts(e.target.value);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    fetchPosts(tagName);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag, username, or prompt content"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      {isLoading ? (
        <div className="mt-16 flex justify-center">
          <p>Loading...</p>
        </div>
      ) : posts.length > 0 ? (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      ) : (
        <div className="mt-16 flex justify-center">
          <p>No prompts found</p>
        </div>
      )}
    </section>
  );
};

export default Feed;