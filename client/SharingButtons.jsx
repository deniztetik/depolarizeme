import React from 'react';
import html2canvas from 'html2canvas';

function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}

class SharingButtons extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      chatImage: null
    }
  }

  openNewWindow(data) {
    var myWindow = window.open("data:text/html," + encodeURIComponent(data), "_blank", "width=200,height=100");
    myWindow.focus();
  }

  generateChatImage() {
    var $chatNodes = document.getElementsByClassName("shadow-chat")[0];
    //temporarily unhide shadow-chat
    document.getElementById("shadow-chat-hider").className = "";
    html2canvas($chatNodes).then((canvas) => {
      var img = convertCanvasToImage(canvas);
      var tmp = document.createElement("div");
      tmp.appendChild(img);
      this.openNewWindow(tmp.innerHTML);
      //re-hide shadow-chat.
      document.getElementById("shadow-chat-hider").className = "hidden";
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.generateChatImage.bind(this)}>Download this conversation</button>
        <div className="fb-like"
          data-href={this.state.chatImage ? this.state.chatImage.src : "http://www.depme.com"}
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
