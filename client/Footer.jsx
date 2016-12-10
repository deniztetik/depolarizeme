import React from 'react'

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hidden: true
    }
  }

  render() {
    return (
      <div className="footer-container">
        <div className="disclaimer">By using the Depolarize Me Web site, also called the Depme website, and/or related products and/or services ("Depme", "Depolarize Me", provided by Depme.com), you agree to the following terms: Do not use Depme if you are under 13. If you are under 18, use it only with a parent/guardian's permission. Do not transmit nudity, sexually harass anyone, publicize other peoples' private information, make statements that defame or libel anyone, violate intellectual property rights, use automated programs to start chats, or behave in any other inappropriate or illegal way on Depme. Understand that human behavior is fundamentally uncontrollable, that the people you encounter on Depme may not behave appropriately, and that they are solely responsible for their own behavior. Use Depme at your own peril. Disconnect if anyone makes you feel uncomfortable. You may be denied access to Depme for inappropriate behavior, or for any other reason. DEPME IS PROVIDED AS IS, AND TO THE MAXIMUM EXTENT ALLOWED BY APPLICABLE LAW, IT IS PROVIDED WITHOUT ANY WARRANTY, EXPRESS OR IMPLIED, NOT EVEN A WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. TO THE MAXIMUM EXTENT ALLOWED BY APPLICABLE LAW, THE PROVIDER OF DEPME, AND ANY OTHER PERSON OR ENTITY ASSOCIATED WITH DEPME'S OPERATION, SHALL NOT BE HELD LIABLE FOR ANY DIRECT OR INDIRECT DAMAGES ARISING FROM THE USE OF DEPME, OR ANY OTHER DAMAGES RELATED TO DEPME OF ANY KIND WHATSOEVER. By using Depme, you accept the practices outlined in Depme's <a style={{fontWeight: 'bold', textDecoration: 'underline', color: 'blue'}} onClick={() => {this.setState({hidden: !this.state.hidden})}}>PRIVACY POLICY and INFORMATION ABOUT THE USE OF COOKIES </a> (updated 10-28-2016).</div>
        <div className={this.state.hidden ? "hidden" : ""}>
          <h1><strong>Effective date:</strong><span> 10/28/2016</span></h1>
          <br />
          <p>
          This document is here to inform you about the privacy practices of the Depolarize Me, also called Depme, chat service ("Depolarize Me", "Depme", provided by <a href="http://depme.com">depme.com</a>), which are designed to protect your privacy to the maximum reasonable extent. By making use of Depme, you accept these practices. This document may be updated from time to time. When changes are made, the effective date at the top will be changed. This date is also noted on Depme's home page.</p>
          <h3>Chat privacy</h3>
          <p>In general, messages are not stored indefinitely, but select messages may be read by a human being to improve Depme services or for other quality control purposes.</p>
          <p>At the beginning of every chat, a record is made of the fact that a chat occurred between youand your chat partner. This record includes a timestamp, as well as IP address, and similar information for you and your chat partner. These records may be used for the purpose of tracking spammers, hackers, and others who pose harm to the site; and may also be used for law enforcement purposes; oranalyzed in aggregate to produce statistical data (e.g., average number ofchats started at different times of day). These records are typically stored for a limited time.</p>
          <p>Users are given an option to save the chat's log and share the link. Understand that <strong>strangers can potentially tell other people anything you tell them, </strong>whether by sharing the log, or just by repeating what you said. Be careful what information you reveal to them.</p>
          <p>The records Depme keeps may be shared with third parties for the purpose of law enforcement, to monitor and enforce compliance with DepMe's rules, or to improve DepMe's monitoring and enforcement processes.</p>
          <h3>Information made availableto other chat users</h3>
          <p>In a Depme text chat, only the following information is made available to other chat users:</p>
          <ul>
            <li>Anything you say in the chat.</li>
            <li>Your chosen political affiliation and the political affiliation of your partner.</li>
          </ul>
          <h3>Use of cookies</h3>
          <p>Depme uses Google Analytics to track non-personally-identifying statistical information about site usage. Google provides a <a href="http://tools.google.com/dlpage/gaoptout?hl=en">browser add-on to opt out of Google Analytics</a>.</p>
          <h3>Facebook integration</h3>
          <p>Depme can optionally be linked with a Facebook account to enable certain features. Currently, Facebook integration is used for the following purposes:</p>
          <ul>
            <li>Depme provides an option for publishing a chat log to your Facebook account.</li>
          </ul>
          <p>The Facebook API allows Depme to access other information about you, such as your name and other personal details. However, Depme does <strong>not</strong> share, save, or make any use of this information.</p>
          <p>Depme does not share personal information about you with Facebook, except in order to perform actions you explicitly initiate. Use of Facebook is subject to <a href="https://www.facebook.com/about/privacy/">Facebook's privacy policy</a>.</p>
          <br/>
          <p>Contact us at depolarizeme@gmail.com or find us on facebook or twitter.</p>
        </div>
      </div>
    )
  }
}

export default Footer;
