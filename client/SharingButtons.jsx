import React from 'react';

var SharingButtons = (props) => (
  <div className="fb-share-button"
    data-href="https://www.depme.com"
    data-layout="button_count"
    data-size="small"
    data-mobile-iframe="true">
    <a className="fb-xfbml-parse-ignore"
      target="_blank"
      href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.depme.com%2F&amp;src=sdkpreparse"
    >
      Share
    </a>
  </div>
)

export default SharingButtons;
