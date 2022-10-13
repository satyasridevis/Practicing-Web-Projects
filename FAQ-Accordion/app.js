fetch("app.json")
  .then((res) => res.json())
  .then((faqItems) => console.log(faqItems));

const makeFaqContainerElement = () => {
  const faqContainerElem = document.createElement("div");
  faqContainerElem.classList.add("faq-container");
  return faqContainerElem;
};

const makeFaqItemElement = (faqItem) => {};

const makeFaq = (faqItems, parentElement) => {
  const container = makeFaqContainerElement();
  parentElement.appendChild(container);
};

window.addEventListener("DOMContentLoaded", () => {
  const faqParentElement = document.getElementById("faq-section");
  makeFaq(
    [
      {
        question: "what am i doing?",
        answer: " I am not giving up",
      },
    ],
    faqParentElement
  );
});
