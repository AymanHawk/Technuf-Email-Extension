console.log("Content script running on Gmail");

document.addEventListener('DOMContentLoaded', function () {
  const attachClickListeners = () => {
    const emailItems = document.querySelectorAll('.zA');
    emailItems.forEach(item => {
      item.addEventListener('click', function () {
        setTimeout(() => {
          const emailDetails = getEmailDetails();
          console.log('Email Details in Content Script:', emailDetails); // Log here
          chrome.runtime.sendMessage(emailDetails);
        }, 1000); // Adjust delay to allow email content to load
      }, { passive: true }); // Adding passive: true here
    });
  };

  const getEmailDetails = () => {
    const sender = document.querySelector('.gD')?.innerText || '';
    const recipients = document.querySelector('.g2')?.innerText || '';
    const ccList = Array.from(document.querySelectorAll('.gE')).map(cc => cc.innerText).join(', ') || '';
    const subject = document.querySelector('.hP')?.innerText || '';
    const emailBody = document.querySelector('.a3s.aXjCH')?.innerHTML || '';

    return {
      sender,
      recipients,
      ccList,
      subject,
    };
  };

  attachClickListeners();

  const observer = new MutationObserver(attachClickListeners);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
