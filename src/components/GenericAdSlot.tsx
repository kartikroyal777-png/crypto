import React, { useEffect, useRef } from 'react';

interface GenericAdSlotProps {
  htmlContent: string;
  className?: string;
}

/**
 * A component that renders raw HTML content, including script tags.
 * It correctly handles script execution by creating and appending new script elements.
 */
const GenericAdSlot: React.FC<GenericAdSlotProps> = ({ htmlContent, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    // Use a DocumentFragment to parse the HTML string.
    const fragment = document.createRange().createContextualFragment(htmlContent);
    const scripts = Array.from(fragment.querySelectorAll('script'));
    
    // Clear any previous ad content.
    container.innerHTML = ''; 
    // Append the non-script part of the HTML to the container.
    container.appendChild(fragment);

    const loadedScripts: HTMLScriptElement[] = [];

    // Process and execute each script.
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      
      // Copy all attributes from the original script to the new one.
      script.getAttributeNames().forEach(attr => {
        newScript.setAttribute(attr, script.getAttribute(attr) || '');
      });
      
      // Copy the content for inline scripts.
      if (script.textContent) {
        newScript.textContent = script.textContent;
      }
      
      // Append the new script to the body to ensure it executes.
      document.body.appendChild(newScript);
      loadedScripts.push(newScript);
    });

    // Cleanup function to remove the scripts when the component unmounts.
    return () => {
      loadedScripts.forEach(s => {
        if (s.parentNode) {
          s.parentNode.removeChild(s);
        }
      });
    };
  }, [htmlContent]);

  return <div ref={containerRef} className={className} />;
};

export default GenericAdSlot;
