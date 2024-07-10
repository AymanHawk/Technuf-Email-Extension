import React, { useEffect, useState } from 'react';
import './App.css';

declare global {
  interface Window {
    chrome: any;
  }
}

interface EmailDetails {
  sender: string;
  subject: string;
  emailBody: string;
  emailBodyText: string;
}

interface EmailThread {
  emails: EmailDetails[];
}

function App() {
  const [emailThread, setEmailThread] = useState<EmailThread | null>(null);

  useEffect(() => {
    const captureEmailContents = () => {
      // Expand all emails in the thread
      const expandButtons = document.querySelectorAll('[aria-label="Show trimmed quoted text"]');
      expandButtons.forEach(button => (button as HTMLElement).click());

      const containerDivs = document.querySelectorAll('.L72vd');

      const emails = Array.from(containerDivs).map(containerDiv => {
        const senderElement = containerDiv.querySelector('.OZZZK');
        const sender = senderElement ? (senderElement as HTMLElement).innerText : 'Unknown Sender';

        const subjectElement = containerDiv.querySelector('.WWy1F .WWy1F .MByod.JdFsz');
        const subject = subjectElement ? (subjectElement as HTMLElement).innerText : 'No Subject';

        const emailBodyElements = containerDiv.querySelectorAll('.XbIp4.jmmB7.GNqVo.allowTextSelection.OuGoX');
        const emailBodyHTML = Array.from(emailBodyElements).map(element => (element as HTMLElement).innerHTML).join(' ') || 'No Body Content';

        const parser = new DOMParser();
        const doc = parser.parseFromString(emailBodyHTML, 'text/html');

        doc.querySelectorAll('style, script, img, .unwanted-class').forEach(el => el.remove());

        const emailBodyText = Array.from(doc.body.childNodes)
          .filter(node => node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE)
          .map(node => (node as HTMLElement).innerText || node.textContent)
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();

        return {
          sender,
          subject,
          emailBody: emailBodyHTML,
          emailBodyText
        };
      });

      return { emails };
    };

    const getEmailsCountAndDetails = () => {
      const emailThread = captureEmailContents();
      return { details: emailThread };
    };

    console.log('Fetching email details...');
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
              setEmailThread(results[0].result.details);
            } else {
              console.error('No results from script execution.');
            }
          }
        );
      });
    } else {
      console.error('Chrome API is not available.');
    }

    const handleMessage = (message: EmailThread) => {
      console.log('Received email thread details in React Component:', message);
      setEmailThread(message);
    };

    window.chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      window.chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  useEffect(() => {
    console.log(emailThread);
  }, [emailThread]);

  return (
    <div className="App bg-blue-100 min-h-screen w-[300px] text-center p-4">
      <h2>Add On / Off toggle </h2>
      <h2> Also render a button under the reply section to SUGGEST RESPONSE and IMPROVE RESPONSE - only render when reply is clicked  </h2>
      {emailThread && (
        <div className="email-details text-left mt-4">
          <h2 className="text-xl font-bold">Email Thread Details:</h2>
          {emailThread.emails.map((email, index) => (
            <div key={index}>
              <p><strong>Sender:</strong> {email.sender}</p>
              <p><strong>Subject:</strong> {email.subject}</p>
              <div><strong>Body:</strong> <div dangerouslySetInnerHTML={{ __html: email.emailBody }} /></div>
              <hr />
            </div>
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Scan Email
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
