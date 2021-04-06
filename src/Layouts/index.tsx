import React, { useRef } from 'react';
import Header from './Header';
import Sidebar from './Sidebar'
import SEO, { SEOProps } from 'components/SEO';

const LayoutPage: React.FC<SEOProps> = ({ children, ...rest }) => {
  const sidebarRef = useRef(null);
  const {title}=rest;
  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900`}>
      <SEO {...rest} />
      {
        title!=='Login'&& <Sidebar toggleSidebar="sek" />
      }
        <div className="flex flex-col flex-1 w-full" style={{zoom:'90%'}}>
          {
            title!=='Login'&& <Header
                                toggleSidebar={() => sidebarRef.current}
                              />
          }
            
            <main className="h-full overflow-y-auto">
              <div className="container grid px-6 mx-auto">{children}</div>
            </main>
        </div>
      </div>
  );
};

export default LayoutPage;
