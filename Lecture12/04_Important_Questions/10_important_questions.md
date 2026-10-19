

Theory Ques

1. What is the difference between textContent and innerHTML? Give one use case for each.
2. Why can inserting untrusted input with innerHTML create a security risk? Explain XSS at a beginner-friendly level.
3. Differentiate between a DOM property and an HTML attribute. Give examples using an input element.
4. Explain getAttribute(), setAttribute(), removeAttribute(), and hasAttribute().
5. What are data-* attributes? Explain how dataset converts attribute names such as data-user-id.
6. Why are alt text and appropriate ARIA state attributes important when JavaScript updates an image or interface state?

Practical Ques

7. Create a text box and live preview where the preview always displays user input safely. Demonstrate why textContent is safer than innerHTML for the preview.
8. Create a profile card containing a link and image. Use JavaScript to update the link's href, visible text, and aria-label, and update the image's src and alt.
9. Build a quote generator using an array of quote objects. When the user clicks a button, conditionally update the quote text, author, category, and a data-category attribute.
10. Build an interactive text editor that shows character count and word count, supports uppercase/lowercase/clear operations, and uses textContent for preview output. Explain how your solution prevents untrusted text from being interpreted as HTML.

Interview ques

- When should you avoid innerHTML?
- Why can .value be different from the value attribute of a form control?
- What does getAttribute() return when an attribute is absent?
- How do you remove a data-* value through dataset?
- Why should dynamic URLs be validated instead of blindly copied from user input?
