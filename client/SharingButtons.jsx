import React from 'react';

class SharingButtons extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div
          className="fb-share-button"
          data-href="http://www.depme.com/"
          data-layout="button_count"
          data-size="small"
          data-mobile-iframe="true">
          <a className="fb-xfbml-parse-ignore"
            target="_blank"
            href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.depme.com%2F&amp;src=sdkpreparse">
            Share
          </a>
        </div>
      </div>
    )
  }
}

export default SharingButtons;
