import React from "react";
import { cn } from "@/lib/utils"

export function Logo(props: React.ComponentProps<"div">) {
  return (
    <div className={cn("", props.className)} >
      <svg width="88" height="128" viewBox="0 0 88 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2024_991)">
          <path d="M17.8845 17.2239C27.6905 17.2239 35.6674 25.2719 35.6674 35.1654V110.007C35.6674 119.901 27.6905 127.949 17.8845 127.949C8.07852 127.949 0.101616 119.901 0.101616 110.007V35.1654C0.101616 25.2719 8.07852 17.2239 17.8845 17.2239Z" fill="url(#paint0_linear_2024_991)" />
          <path d="M70.2171 0C80.0231 0 88 8.04806 88 17.9415V76.8923C88 86.7858 80.0231 94.8338 70.2171 94.8338C60.4111 94.8338 52.4342 86.7858 52.4342 76.8923V17.9415C52.4342 8.04806 60.4111 0 70.2171 0Z" fill="url(#paint1_linear_2024_991)" />
          <path d="M87.8476 78.5839C87.0855 82.6848 78.6513 87.2984 74.8915 80.3781C71.7922 74.6368 63.2056 61.4113 60.3603 57.0028L34.1432 9.22707C29.3673 0.563876 18.5451 -2.56308 9.95849 2.25551C-1.77823 9.22707 0.101679 19.1718 0.101679 45.3152C0.863804 41.2143 9.95849 39.1125 13.7183 46.0328C17.4781 52.9531 54.0601 119.491 54.0601 119.491C58.8361 128.154 72.8592 129.23 78.4481 126.718C83.6306 124.412 86.7807 118.824 87.2888 112.878C88.6098 105.906 87.5936 95.2439 87.8476 78.5839Z" fill="url(#paint2_linear_2024_991)" />
        </g>
        <defs>
          <linearGradient id="paint0_linear_2024_991" x1="17.9002" y1="17.2186" x2="17.9002" y2="127.944" gradientUnits="userSpaceOnUse">
            <stop offset="0.165" stop-color="#5F5001" />
            <stop offset="1" stop-color="#FDD201" />
          </linearGradient>
          <linearGradient id="paint1_linear_2024_991" x1="70.2327" y1="0" x2="70.2327" y2="94.8338" gradientUnits="userSpaceOnUse">
            <stop stop-color="#4F8620" />
            <stop offset="1" stop-color="#25430C" />
          </linearGradient>
          <linearGradient id="paint2_linear_2024_991" x1="10.7342" y1="7.39047" x2="80.0622" y2="119.149" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFD403" />
            <stop offset="1" stop-color="#2F5B0B" />
          </linearGradient>
          <clipPath id="clip0_2024_991">
            <rect width="88" height="128" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}
