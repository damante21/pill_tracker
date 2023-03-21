import React from 'react';
import ReactDOM from 'react-dom';

const CheckoutPage = ({ htmlContent, landingUrl }) => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const modifiedHtmlContent = htmlContent.replace(/href="(?!http)/g, `href="${landingUrl}/`);
    const modifiedBaseTag = `<base href="${landingUrl}">`;
    const modifiedHtml = `<html><head>${modifiedBaseTag}</head><body>${modifiedHtmlContent}</body></html>`;
    ReactDOM.render(<div dangerouslySetInnerHTML={{ __html: modifiedHtml }} />, containerRef.current);
    return () => {
      ReactDOM.unmountComponentAtNode(containerRef.current);
    }
  }, [htmlContent, landingUrl]);

  return (
    <div ref={containerRef} />
  );
}

export default CheckoutPage;