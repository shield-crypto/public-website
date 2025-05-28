window.addEventListener("load", function () {
  document
    .querySelector("#showMenu")
    .addEventListener("click", function (event) {
      document.querySelector("#mobileNav").classList.remove("hidden");
    });

  document
    .querySelector("#hideMenu")
    .addEventListener("click", function (event) {
      document.querySelector("#mobileNav").classList.add("hidden");
    });

  document.querySelectorAll("[toggleElement]").forEach((toggle) => {
    toggle.addEventListener("click", function (event) {
      console.log(toggle);
      const answerElement = toggle.querySelector("[answer]");
      const caretElement = toggle.querySelector("img");
      console.log(answerElement);
      if (answerElement.classList.contains("hidden")) {
        answerElement.classList.remove("hidden");
        caretElement.classList.add("rotate-90");
      } else {
        answerElement.classList.add("hidden");
        caretElement.classList.remove("rotate-90");
      }
    });
  });
  // Initialize global variable on window object
  window.delegatorApy = 0;

  async function fetchDelegatorApy() {
    try {
      const response = await fetch('https://shield-crypto.github.io/validator-rewards/last_delegator_apy.txt');
      const text = await response.text();
      // Parse text as float and ensure it's a valid number
      const value = parseFloat(text);
      if (!isNaN(value)) {
        window.delegatorApy = value * 100;
      }
    } catch (error) {
      console.error('Error fetching delegator APY:', error);
    }
  }

  // Fetch initially
  fetchDelegatorApy();
  
  // Refresh every 5 minutes
  setInterval(fetchDelegatorApy, 5 * 60 * 1000);
});
