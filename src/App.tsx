import React, { useEffect, useState } from 'react';
import './App.css';

declare global {
  interface Window {
    chrome: any;
  }
}

function App() {
  const [emailCount, setEmailCount] = useState<number>(0);

  useEffect(() => {
    window.chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      window.chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: getUnreadEmailsCount,
        },
        (results: any) => {
          setEmailCount(results[0].result);
        }
      );
    });
  }, []);

  function getUnreadEmailsCount() {
    const unreadEmails = document.querySelectorAll('.zE');
    return unreadEmails.length;
  }

  return (
    <div className="App">
      <h1>Unread Emails: {emailCount}</h1>
    </div>
  );
}

export default App;
