import React from 'react';

var getChatHTML = () => {
  var chatNodes = document.getElementsByClassName("infinite-scroll");
  console.log("ChatNodes: ", chatNodes);
  // return html
}

var SharingButtons = (props) => (
<div className="fb-like"
  data-href="http://depolarizeme.azurewebsites.net/share"
  data-layout="standard"
  data-action="like"
  data-size="small"
  data-show-faces="true"
  data-share="true">
</div>
)

export default SharingButtons;
