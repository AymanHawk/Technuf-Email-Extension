import React, { useEffect, useState } from 'react';
import './App.css';

declare global {
  interface Window {
    chrome: any;
  }
}

interface EmailCounts {
  unread: number;
  read: number;
  total: number;
}

interface EmailDetails {
  sender: string;
  recipients: string;
  subject: string;
  emailBody: string;
}

function App() {
  const [emailCounts, setEmailCounts] = useState<EmailCounts>({ unread: 0, read: 0, total: 0 });
  const [emailDetails, setEmailDetails] = useState<EmailDetails | null>(null);

  useEffect(() => {
    const getEmailsCountAndDetails = () => {
      const unreadEmails = document.querySelectorAll('.zE');
      const readEmails = document.querySelectorAll('.yO');
      const totalEmails = unreadEmails.length + readEmails.length;

      const getEmailDetails = (): EmailDetails => {
        const sender = (document.querySelector('.gD') as HTMLElement)?.innerText || '';
        const recipients = (document.querySelector('.g2') as HTMLElement)?.innerText || '';
        const subject = (document.querySelector('.hP') as HTMLElement)?.innerText || '';

        // Collect email body content from multiple potential containers
        const emailBodyElements = document.querySelectorAll('.a3s.aXjCH, .ii.gt');
        const emailBody = Array.from(emailBodyElements).map(element => (element as HTMLElement).innerHTML).join(' ') || '';

        return {
          sender,
          recipients,
          subject,
          emailBody,
        };
      };

      const emailDetails = getEmailDetails();

      return {
        counts: {
          unread: unreadEmails.length,
          read: readEmails.length,
          total: totalEmails
        },
        details: emailDetails
      };
    };

    console.log('Fetching email counts and details...');
    if (window.chrome && window.chrome.tabs && window.chrome.scripting) {
      window.chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
        if (tabs.length === 0) {
          console.error('No active tabs found.');
          return;
        }

        window.chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            func: getEmailsCountAndDetails,
          },
          (results: any) => {
            if (window.chrome.runtime.lastError) {
              console.error(window.chrome.runtime.lastError.message);
              return;
            }
            if (results && results[0]) {
              setEmailCounts(results[0].result.counts);
              setEmailDetails(results[0].result.details);
            } else {
              console.error('No results from script execution.');
            }
          }
        );
      });
    } else {
      console.error('Chrome API is not available.');
    }

    // Listen for messages from the content script
    const handleMessage = (message: EmailDetails) => {
      console.log('Received email details in React Component:', message); // Log here
      setEmailDetails(message);
    };

    window.chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      window.chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  useEffect(() => {
    console.log(emailDetails);
  }, [emailDetails, setEmailDetails]);

  return (
    <div className="App bg-blue-100 min-h-screen w-[300px] text-center p-4">
      {emailCounts &&
        <div>
          <h1 className="text-2xl font-bold">Unread Emails: {emailCounts.unread}</h1>
          <h1 className="text-2xl font-bold">Read Emails: {emailCounts.read}</h1>
          <h1 className="text-2xl font-bold">Total Emails: {emailCounts.total}</h1>
        </div>
      }
      {emailDetails && (
        <div className="email-details text-left mt-4">
          <h2 className="text-xl font-bold">Email Details:</h2>
          <p><strong>Sender:</strong> {emailDetails.sender}</p>
          <p><strong>Recipients:</strong> {emailDetails.recipients}</p>
          <p><strong>Subject:</strong> {emailDetails.subject}</p>
          <div><strong>Body:</strong> <div dangerouslySetInnerHTML={{ __html: emailDetails.emailBody }} /></div>
        </div>
      )}
    </div>
  );
}

export default App;
