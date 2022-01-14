/* eslint-disable react/prop-types */
import React from 'react';

export default {
  grid: ({ width, height }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="#262626"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M3 3h7v7H3V3zM14 3h7v7h-7V3zM14 14h7v7h-7v-7zM3 14h7v7H3v-7z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  heart: ({ width, height }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.501 5.501 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        stroke="#262626"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  heart2: ({ width, height }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 28.8 25.93"
    >
      <path
        fill="none"
        stroke="#262626"
        strokeDasharray="0 0 0 0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M25.785 3.74a6.807 6.807 0 00-4.862-2.056c-1.824 0-3.573.74-4.863 2.055l-1.325 1.352-1.325-1.352a6.782 6.782 0 00-9.725 0C1 6.48 1 10.92 3.685 13.66L5.01 15.01l9.725 9.92 9.725-9.92 1.325-1.351a7.084 7.084 0 002.015-4.96c0-1.86-.725-3.645-2.015-4.96h0z"
      />
    </svg>
  ),
  heart_full: ({ width, height, color }) => (
    <svg width={width} height={height} viewBox="0 0 26 23" fill="none">
      <path
        d="M11.867 3.15l.707.706.707-.707.303-.302a6.305 6.305 0 018.917 8.916l-9.624 9.624-.104-.104-.303.303-9.623-9.624a6.305 6.305 0 118.916-8.917l.104.104z"
        fill={color}
        stroke={color === 'none' ? '#ff0' : color}
        strokeWidth={2}
      />
    </svg>
  ),
  image: ({ width, height }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className="image-icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
        stroke="#262626"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        clipRule="evenodd"
        d="M8.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        stroke="#262626"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 15l-5-5L5 21"
        stroke="#262626"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  messageSquare: ({ width, height }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
        stroke="#262626"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  type: ({ width, height }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="#262626"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6V3h16v3M9 19h6M12 3v16"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  plus: ({ width, height }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="#262626"
      className="plus-icon"
      viewBox="0 0 30 30"
    >
      <g fillRule="evenodd">
        <path d="M15 0a1.5 1.5 0 011.5 1.5v27a1.5 1.5 0 01-3 0v-27A1.5 1.5 0 0115 0z" />
        <path d="M30 15a1.5 1.5 0 01-1.5 1.5h-27a1.5 1.5 0 010-3h27A1.5 1.5 0 0130 15z" />
      </g>
    </svg>
  ),
  home: ({ width, height }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        stroke="#262626"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 22V12h6v10"
        stroke="#262626"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  userMinus: ({ width, height }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="#262626"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        clipRule="evenodd"
        d="M8.5 11a4 4 0 100-8 4 4 0 000 8z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 11h-6"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  allPosts: ({ width, height }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      className="grid-icon"
      viewBox="0 0 25 25"
    >
      <defs>
        <path
          id="prefix__a"
          fillRule="evenodd"
          d="M3 0h19c1.656 0 3 1.344 3 3v19c0 1.656-1.344 3-3 3H3c-1.656 0-3-1.344-3-3V3c0-1.656 1.344-3 3-3z"
        />
        <mask
          id="prefix__b"
          x={0}
          y={0}
          maskContentUnits="userSpaceOnUse"
          maskUnits="userSpaceOnUse"
        >
          <path d="M0 0h25v25H0z" />
          <use fill="#fff" xlinkHref="#prefix__a" />
        </mask>
      </defs>
      <use
        fillOpacity={0}
        stroke="#262626"
        strokeWidth={2}
        mask="url(#prefix__b)"
        xlinkHref="#prefix__a"
      />
      <g fillRule="evenodd">
        <path d="M4 3h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zM4 10h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a1 1 0 011-1zM4 17h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a1 1 0 011-1zM11 3h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4a1 1 0 011-1zM11 10h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3a1 1 0 011-1zM11 17h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3a1 1 0 011-1zM18 3h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4a1 1 0 011-1zM18 10h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3a1 1 0 011-1zM18 17h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3a1 1 0 011-1z" />
      </g>
    </svg>
  ),
  text: ({ width, height }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      className="text-icon"
      viewBox="0 0 25 25"
    >
      <defs>
        <path
          id="prefix__a"
          fillRule="evenodd"
          d="M3 0h19c1.656 0 3 1.344 3 3v19c0 1.656-1.344 3-3 3H3c-1.656 0-3-1.344-3-3V3c0-1.656 1.344-3 3-3z"
        />
        <mask
          id="prefix__b"
          x={0}
          y={0}
          maskContentUnits="userSpaceOnUse"
          maskUnits="userSpaceOnUse"
        >
          <path d="M0 0h25v25H0z" />
          <use fill="#fff" xlinkHref="#prefix__a" />
        </mask>
      </defs>
      <g stroke="#262626" strokeWidth={2}>
        <g
          fill="none"
          strokeDasharray="0 0 0 0"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.5 7.5v-3h16v3M9.5 20.5h6M12.5 4.5v16" />
        </g>
        <use fillOpacity={0} mask="url(#prefix__b)" xlinkHref="#prefix__a" />
      </g>
    </svg>
  ),
  video: ({ width, height }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="#fff"
      className="video-icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M23 7l-7 5 7 5V7zM1 7a2 2 0 012-2h11a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V7z"
        stroke="#262626"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  profileUser: ({ width, height }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 22 24.95"
    >
      <g
        fill="none"
        stroke="#262626"
        strokeDasharray="0 0 0 0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M21 23.95V21.4c0-2.817-2.239-5.1-5-5.1H6c-2.761 0-5 2.283-5 5.1v2.55M11 11.2c2.761 0 5-2.283 5-5.1C16 3.283 13.761 1 11 1S6 3.283 6 6.1c0 2.817 2.239 5.1 5 5.1h0z" />
      </g>
    </svg>
  ),
  search: ({ width, height }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
    >
      <g
        fill="none"
        stroke="#262626"
        strokeDasharray="0 0 0 0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M8.5 16a7.5 7.5 0 100-15 7.5 7.5 0 000 15h0zM19 19l-5.2-5.2" />
      </g>
    </svg>
  ),
};
