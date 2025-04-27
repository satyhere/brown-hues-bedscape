
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    // Show cursor elements initially with a delay for smooth fade-in
    setTimeout(() => {
      document.querySelector('.cursor-dot')?.classList.add('opacity-100');
      document.querySelector('.cursor-dot-outline')?.classList.add('opacity-100');
    }, 1000);
    
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    // Track hovering over links and buttons
    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, .glass, .card-animate').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();
    return () => removeEventListeners();
  }, []);

  const cursorDotStyle = {
    transform: `translate(${position.x}px, ${position.y}px) scale(${clicked ? 0.8 : 1})`,
    opacity: hidden ? 0 : 1,
  };

  const cursorDotOutlineStyle = {
    transform: `translate(${position.x}px, ${position.y}px) scale(${clicked ? 0.8 : linkHovered ? 1.4 : 1})`,
    opacity: hidden ? 0 : 0.5,
    backgroundColor: linkHovered ? 'rgba(194, 164, 132, 0.3)' : 'rgba(219, 198, 178, 0.2)',
  };

  // Hide cursor on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      <div className="cursor-dot" style={cursorDotStyle} />
      <div className="cursor-dot-outline" style={cursorDotOutlineStyle} />
    </>
  );
};

export default CustomCursor;
