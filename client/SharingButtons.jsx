import React from 'react';

class SharingButtons extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="fb-like"
          data-href="http://www.depme.com"
          data-layout="standard"
          data-action="like"
          data-size="small"
          data-show-faces="true"
          data-share="true">
        </div>
      </div>
    )
  }
}

export default SharingButtons;
