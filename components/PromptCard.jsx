"use client";
import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  return (
    <div className="propmpt_card">
      <div className="flex justify-between items-start gap-5">
        <div>
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
