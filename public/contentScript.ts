console.log("Content script running on Gmail");

// Example: Highlight unread emails
document.addEventListener('DOMContentLoaded', function() {
  const unreadEmails = document.querySelectorAll<HTMLElement>('.zE');
  unreadEmails.forEach(email => {
    email.style.backgroundColor = '#ffeb3b';
  });
});