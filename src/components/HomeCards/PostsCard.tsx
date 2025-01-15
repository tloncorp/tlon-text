import React from 'react';
import BaseCard from './BaseCard';
import type { HomeCard } from '../../utils/types';
import { urlForImage } from '../../utils/urlForImage';

interface PostsCardProps extends HomeCard {
  isTopCard: boolean;
  index: number;
  posts: Post[];
}

interface Post {
  title: string;
  author: {
    label: string;
    slug: string;
  };
  slug: string;
  featuredImage: {
    imageRef: any;
    alt: string;
    dimensions: {
      height: number;
      width: number;
      aspectRatio: number;
    };
  };
}

const PostsCard: React.FC<PostsCardProps> = ({ posts, ...props }) => {
  if (!posts || posts.length === 0) {
    return <BaseCard {...props}><div>No posts available</div></BaseCard>;
  }

  const recentPosts = posts.slice(0, 4).reverse();

  return (
    <BaseCard {...props}>
      <div className="posts-card bg-[#f9f9f9] h-full flex items-center">
        <div className="p-6 md:p-12 w-full">
          <ul className="list-none p-0 flex flex-col gap-6 md:gap-8">
            {recentPosts.slice(0, 1).map((post, index) => (
              <li key={index} 
                  className="flex flex-col gap-4 items-center cursor-pointer text-redfont-medium tracking-tight hover:bg-[#f0f0f0] transition-colors duration-300 rounded-lg p-4 md:hidden"
                  onClick={() => window.location.href = `/posts/${post.slug}`}>
                <div className="w-full aspect-square relative overflow-hidden rounded-lg">
                  <img 
                    src={urlForImage(post.featuredImage.imageRef).width(400).height(400).url()} 
                    alt={post.featuredImage.alt} 
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <span className="text-lg tracking-tighter font-medium text-[#222] mt-4 mb-1">{post.title}</span>
                  <p className="text-base text-[#999] mb-1">by {post.author.label}</p>
                </div>
              </li>
            ))}
            {recentPosts.map((post, index) => (
              <li key={index} 
                  className="hidden md:flex flex-row gap-6 items-center cursor-pointer font-medium tracking-tight hover:bg-[#f0f0f0] transition-colors duration-300 rounded-lg p-4"
                  onClick={() => window.location.href = `/posts/${post.slug}`}>
                <img 
                  src={urlForImage(post.featuredImage.imageRef).width(96).height(96).url()} 
                  alt={post.featuredImage.alt} 
                  className="w-24 h-24 rounded-lg object-cover object-center"
                />
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-lg font-medium tracking-tight text-[#222]">{post.title}</span>
                  <p className="text-base text-[#999]">by {post.author.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </BaseCard>
  );
};

export default PostsCard;