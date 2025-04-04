"use client";
import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete, profile = false }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  
  const [copied, setCopied] = useState("");
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);
  const [hasVoted, setHasVoted] = useState(false);
  
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }
  
  const handleUpvote = async () => {
    if (hasVoted) return;
    
    try {
      const response = await fetch(`/api/prompt/${post._id}/vote`, {
        method: 'PATCH',
        body: JSON.stringify({ 
          voteType: 'upvote'
        }),
      });
      
      if (response.ok) {
        setUpvotes(upvotes + 1);
        setHasVoted(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleDownvote = async () => {
    if (hasVoted) return;
    
    try {
      const response = await fetch(`/api/prompt/${post._id}/vote`, {
        method: 'PATCH',
        body: JSON.stringify({ 
          voteType: 'downvote'
        }),
      });
      
      if (response.ok) {
        setDownvotes(downvotes + 1);
        setHasVoted(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      
      {!profile && (<div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-1">
          <button 
            onClick={handleUpvote}
            className={`p-1 rounded ${hasVoted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            disabled={hasVoted}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
          <span>{upvotes}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={handleDownvote}
            className={`p-1 rounded ${hasVoted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            disabled={hasVoted}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </button>
          <span>{downvotes}</span>
        </div>
      </div>)}
      
      {session?.user._id === post.creator.id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>
            Edit
          </p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;