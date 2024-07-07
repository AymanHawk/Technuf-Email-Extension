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
    const getUnreadEmailsCount = () => {
      const unreadEmails = document.querySelectorAll('.zE');
      return unreadEmails.length;
    };

    console.log('Fetching unread email count...');
    if (window.chrome && window.chrome.tabs && window.chrome.scripting) {
      window.chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
        if (tabs.length === 0) {
          console.error('No active tabs found.');
          return;
        }

        window.chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            func: getUnreadEmailsCount,
          },
          (results: any) => {
            if (window.chrome.runtime.lastError) {
              console.error(window.chrome.runtime.lastError.message);
              return;
            }
            if (results && results[0]) {
              setEmailCount(results[0].result);
            } else {
              console.error('No results from script execution.');
            }
          }
        );
      });
    } else {
      console.error('Chrome API is not available.');
    }
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <div className="App">
      <h1>Unread Emails: {emailCount}</h1>
    </div>
  );
}

export default App;
