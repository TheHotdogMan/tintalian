import { useState, useRef, useEffect } from 'react';
import { SwipeDirection } from '../types';

interface SwipeProps {
  onSwipe: (direction: SwipeDirection) => void;
  swipeThreshold?: number;
}

export const useSwipe = ({ onSwipe, swipeThreshold = 100 }: SwipeProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSwipeStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setStartY(clientY);
  };

  const handleSwipeMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    const dx = clientX - startX;
    const dy = clientY - startY;
    setOffsetX(dx);
    setOffsetY(dy);
    
    // Calculate rotation based on horizontal movement
    setRotation(dx * 0.1);
    
    // Adjust opacity based on dragging distance
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = window.innerWidth / 2;
    setOpacity(Math.max(1 - distance / maxDistance, 0.5));
  };

  const handleSwipeEnd = () => {
    if (!isDragging) return;
    
    let direction: SwipeDirection = null;
    const absX = Math.abs(offsetX);
    const absY = Math.abs(offsetY);
    
    if (absX > swipeThreshold && absX > absY) {
      direction = offsetX > 0 ? 'right' : 'left';
    } else if (absY > swipeThreshold && absY > absX) {
      direction = offsetY > 0 ? 'down' : 'up';
    }
    
    if (direction) {
      onSwipe(direction);
    } else {
      // Reset if not swiped far enough
      setOffsetX(0);
      setOffsetY(0);
      setRotation(0);
      setOpacity(1);
    }
    
    setIsDragging(false);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleSwipeStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleSwipeMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleSwipeEnd();
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    handleSwipeStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleSwipeMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleSwipeEnd();
  };

  // Clean up event listeners
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleSwipeEnd();
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  const cardStyle = {
    transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`,
    opacity,
    transition: isDragging ? 'none' : 'transform 0.5s ease, opacity 0.5s ease',
  };

  const eventHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onMouseDown: handleMouseDown,
    onMouseMove: isDragging ? handleMouseMove : undefined,
    onMouseUp: handleMouseUp,
  };

  return {
    cardRef,
    cardStyle,
    eventHandlers,
    isDragging,
    resetPosition: () => {
      setOffsetX(0);
      setOffsetY(0);
      setRotation(0);
      setOpacity(1);
    },
  };
};