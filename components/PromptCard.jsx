"use client";
import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  return (
    <div className="propmpt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <h3>{post.creator.username}</h3>
            <p>{post.creator.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
