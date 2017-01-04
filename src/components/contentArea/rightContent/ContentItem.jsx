
/* eslint-disable */ 

import React from 'react';
 
export default ({uid, htmlInfo, isVisible}) => {
    
    return (
        <section className="pageContent" data-uid={uid}
            dangerouslySetInnerHTML={{ __html: htmlInfo }}
            style={{ display: isVisible ? "block" : "none" }}>
        </section>
    );
}