import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PageFlip } from 'page-flip';
import pdf from './bubi.pdf'; // Ensure the correct path

// Set up the PDF.js worker using a reliable CDN
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Flipbook: React.FC = () => {
  const [numPages, setNumPages] = useState<number>(0); // Total pages in the PDF
  const [pagesLoaded, setPagesLoaded] = useState(false); // Track page rendering
  const flipbookRef = useRef<HTMLDivElement>(null); // Ref for flipbook container
  const pageFlipInstance = useRef<PageFlip | null>(null); // Ref for PageFlip instance

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error: any) => {
    console.error('Error loading document:', error);
  };

  useEffect(() => {
    // Initialize PageFlip only when pages are ready
    if (flipbookRef.current && !pageFlipInstance.current && pagesLoaded) {
      const pageFlip = new PageFlip(flipbookRef.current, {
        width: 400,
        height: 600,
        drawShadow: true,
        flippingTime: 1000,
        showCover: true,
        useMouseEvents: true,
        //useKeyboard: true,
      });

      pageFlip.loadFromHTML(flipbookRef.current.querySelectorAll('.demoPage'));
      pageFlipInstance.current = pageFlip;

      return () => {
        pageFlip.destroy();
        pageFlipInstance.current = null;
      };
    }
  }, [pagesLoaded]); // Re-run when pagesLoaded changes

  const renderPages = () => {
    const pageElements = [];
    for (let i = 1; i <= numPages; i++) {
      pageElements.push(
        <div key={i} className="demoPage">
          <Document file={pdf} onLoadError={onDocumentLoadError}>
            <Page
              pageNumber={i}
              width={400}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              onRenderSuccess={() => {
                if (i === numPages) setPagesLoaded(true); // Ensure all pages are loaded
              }}
            />
          </Document>
        </div>
      );
    }
    return pageElements;
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center overflow-hidden">
      <h1 className="text-3xl text-white text-center font-bold">FlipBook</h1>
      {numPages > 0 ? (
        <div ref={flipbookRef} style={{ width: 400, height: 600 }}>
          {renderPages()}
        </div>
      ) : (
        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess} onLoadError={onDocumentLoadError}>
          <p>Loading Flipbook...</p>
        </Document>
      )}
    </div>
  );
};

export default Flipbook;
