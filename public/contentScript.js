console.log("Content script running on Outlook Web App");

document.addEventListener('DOMContentLoaded', function () {
  const attachClickListeners = () => {
    const emailItems = document.querySelectorAll('.lvHighlightSubject'); // Adjust selector based on Outlook structure
    emailItems.forEach(item => {
      item.addEventListener('click', function () {
        setTimeout(() => {
          const emailDetails = getEmailDetails();
          console.log('Email Details in Content Script:', emailDetails); // Log here
          chrome.runtime.sendMessage(emailDetails);
        }, 1000); // Adjust delay to allow email content to load
      }, { passive: true });
    });
  };

  const getEmailDetails = () => {
    const sender = document.querySelector('.readMsgFrom')?.innerText || ''; // Adjust selector
    const recipients = document.querySelector('.readMsgTo')?.innerText || ''; // Adjust selector
    const subject = document.querySelector('.readMsgSubject')?.innerText || ''; // Adjust selector
    const emailBodyElements = document.querySelectorAll('.readMsgBody'); // Adjust selector
    const emailBody = Array.from(emailBodyElements).map(element => element.innerHTML).join(' ') || '';

    return {
      sender,
      recipients,
      subject,
      emailBody
    };
  };

  attachClickListeners();

  const observer = new MutationObserver(attachClickListeners);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
