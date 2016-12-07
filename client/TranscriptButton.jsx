import React from 'react';
import html2canvas from 'html2canvas';

class TranscriptButton extends React.Component {
  constructor(props) {
    super(props)
  }

  convertCanvasToImage(canvas) {
  	var image = new Image();
  	image.src = canvas.toDataURL("image/png");
  	return image;
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
      var img = this.convertCanvasToImage(canvas);
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
        <button className="chat-input-transcribe" onClick={this.generateChatImage.bind(this)}>Generate transcript</button>
      </div>
    )
  }
}

export default TranscriptButton;
