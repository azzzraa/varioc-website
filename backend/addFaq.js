import fetch from "node-fetch"; // npm install node-fetch@2 if needed

const faq = {
  question: "Kaj je varjenje?",
  answer: "Varjenje je postopek spajanja kovin z visoko temperaturo."
};

fetch("http://localhost:5000/faqs", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(faq)
})
  .then(res => res.json())
  .then(data => console.log("Added FAQ:", data))
  .catch(err => console.error(err));
