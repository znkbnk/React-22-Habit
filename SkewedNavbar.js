import React, { useState } from "react";
import "./Sidebar.css";

export default function SkewedNavbar(props) {
  const [showDeletedHabits, setShowDeletedHabits] = useState(false);
  const [showFavoriteHabits, setShowFavoriteHabits] = useState(false);
  const [completedHabits, setCompletedHabits] = useState([]);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isBlackBackground, setIsBlackBackground] = useState(false);
  const [isRegistrationVisible, setIsRegistrationVisible] = useState(false);


  const handleBackgroundClick = () => {
    setIsBlackBackground((prev) => !prev); 
  };

  const handleDeleteClick = () => {
    setShowDeletedHabits(!showDeletedHabits);
    props.onDeleteClick(); 
  };

   const handleRegisterClick = () => {
     setIsRegistrationVisible(!isRegistrationVisible);
     props.onRegisterClick(); 
   };

  const handleFavoriteClick = () => {
    setShowFavoriteHabits(!showFavoriteHabits);
    props.onFavoriteClick(); 
  };

  const handleCompletedClick = () => {
    setCompletedHabits(!completedHabits);
    props.onCompletedClick();
  };

  const handleCategoriesClick = () => {
    setShowCategoriesDropdown(!showCategoriesDropdown);
    props.onCategoriesClick(); 
  };

  const handleThemeClick = () => {
    setTheme(!theme);
    props.onThemeClick();
  };

  return (
    <div>
      <ul>
        <li>
          <a href='#' className='nav-dark' onClick={handleDeleteClick}>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={192}
                height={192}
                fill='currentColor'
                viewBox='0 0 256 256'
              >
                <rect width={256} height={256} fill='none' />
                <circle
                  cx={128}
                  cy={128}
                  r={96}
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <circle
                  cx={128}
                  cy={120}
                  r={40}
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <path
                  d='M63.79905,199.37405a72.02812,72.02812,0,0,1,128.40177-.00026'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
              </svg>
              Deleted
            </span>
          </a>
        </li>
        <li>
          <a href='#' className='nav-dark' onClick={handleFavoriteClick}>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={192}
                height={192}
                fill='currentColor'
                viewBox='0 0 256 256'
              >
                <rect width={256} height={256} fill='none' />
                <circle
                  cx={128}
                  cy={128}
                  r={96}
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <circle
                  cx={128}
                  cy={120}
                  r={40}
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <path
                  d='M63.79905,199.37405a72.02812,72.02812,0,0,1,128.40177-.00026'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
              </svg>
              Favorite
            </span>
          </a>
        </li>
        <li>
          <a href='#' className='nav-dark' onClick={handleCompletedClick}>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={192}
                height={192}
                fill='currentColor'
                viewBox='0 0 256 256'
              >
                <rect width={256} height={256} fill='none' />
                <path
                  d='M224,177.32122V78.67878a8,8,0,0,0-4.07791-6.9726l-88-49.5a8,8,0,0,0-7.84418,0l-88,49.5A8,8,0,0,0,32,78.67878v98.64244a8,8,0,0,0,4.07791,6.9726l88,49.5a8,8,0,0,0,7.84418,0l88-49.5A8,8,0,0,0,224,177.32122Z'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <polyline
                  points='177.022 152.511 177.022 100.511 80 47'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <polyline
                  points='222.897 74.627 128.949 128 33.108 74.617'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <line
                  x1='128.94915'
                  y1={128}
                  x2='128.01036'
                  y2='234.82131'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
              </svg>
              Completed
            </span>
          </a>
        </li>
        <li>
          <a href='#' className='nav-dark' onClick={handleCategoriesClick}>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={192}
                height={192}
                fill='currentColor'
                viewBox='0 0 256 256'
              >
                <rect width={256} height={256} fill='none' />
                <rect
                  x={24}
                  y={56}
                  width={208}
                  height={144}
                  rx={8}
                  strokeWidth={16}
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  fill='none'
                />
                <line
                  x1='167.99414'
                  y1={168}
                  x2='199.99414'
                  y2={168}
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <line
                  x1='119.99414'
                  y1={168}
                  x2='135.99414'
                  y2={168}
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <line
                  x1='23.99414'
                  y1='96.85228'
                  x2='231.99412'
                  y2='96.85228'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
              </svg>
              Categories
            </span>
          </a>
        </li>
        <li>
          <a href='#' className='nav-dark' onClick={handleRegisterClick}>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={192}
                height={192}
                fill='currentColor'
                viewBox='0 0 256 256'
              >
                <rect width={256} height={256} fill='none' />
                <rect
                  x={24}
                  y={56}
                  width={208}
                  height={144}
                  rx={8}
                  strokeWidth={16}
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  fill='none'
                />
                <line
                  x1='167.99414'
                  y1={168}
                  x2='199.99414'
                  y2={168}
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <line
                  x1='119.99414'
                  y1={168}
                  x2='135.99414'
                  y2={168}
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
                <line
                  x1='23.99414'
                  y1='96.85228'
                  x2='231.99412'
                  y2='96.85228'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                />
              </svg>
              Register
            </span>
          </a>
        </li>
        <li>
          <a
            href='#'
            className={`theme-toggle ${
              isBlackBackground ? "" : "white-background"
            }`}
            onClick={(e) => {
              handleThemeClick(e); // Call the original theme click handler first
              handleBackgroundClick(); // Then toggle background color
            }}
          >
            <span>
              <rect width={256} height={256} fill='none' />
              <rect
                x={24}
                y={56}
                width={208}
                height={144}
                rx={8}
                strokeWidth={16}
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                fill='none'
              />
              <line
                x1='167.99414'
                y1={168}
                x2='199.99414'
                y2={168}
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={16}
              />
              <line
                x1='119.99414'
                y1={168}
                x2='135.99414'
                y2={168}
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={16}
              />
              <line
                x1='23.99414'
                y1='96.85228'
                x2='231.99412'
                y2='96.85228'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={16}
              />
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}
