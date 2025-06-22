const display = document.getElementById("display");
const display1 = document.getElementById("display1");
const calcButtons = document.querySelectorAll('button[data-type="calc"]');
const theme = document.getElementById("themeToggle");
const historyList = document.getElementById("historyList");
const clickSound = new Audio("computer-mouse-click.mp3");

let isDark = localStorage.getItem("theme") === "dark";
applyTheme(isDark);
loadHistory();

theme.addEventListener("click", () =>
   {
  isDark = !isDark;
  localStorage.setItem("theme", isDark ? "dark" : "light");
  applyTheme(isDark);
});

function applyTheme(isDark)
 {
  if (isDark) {
    theme.value = "OFF";
    display1.classList.remove("bg-gray-700", "text-black");
    display1.classList.add("bg-white", "text-black");
  } else {
    theme.value = "ON";
    display1.classList.remove("bg-white", "text-black");
    display1.classList.add("bg-gray-700", "text-black");
  }
}

calcButtons.forEach(button => 
  {
  button.addEventListener("click", () => 
    {
    clickSound.currentTime = 0;
    clickSound.play();

    const value = button.innerText;

    if (display.innerText === "0000")
       {
      display.innerText = "";
    }

    if (value === "C")
       {
      display.innerText = "0000";
    } else if (value === "=") 
      {
      try {
        const result = eval(display.innerText);
        const expression = display.innerText + " = " + result;
        display.innerText = result;
        saveToHistory(expression);
        loadHistory();
      } catch {
        display.innerText = "Error :(";
      }
    } else
     {
      display.innerText += value;
    }
  });
});

function saveToHistory(entry)
 {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.push(entry);
  localStorage.setItem("history", JSON.stringify(history.slice(-5)));
}

function loadHistory() 
{
  let history = JSON.parse(localStorage.getItem("history")) || [];
  historyList.innerHTML = "";
  history.slice().reverse().forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}
const clearHistoryBtn = document.getElementById("clearHistory");

clearHistoryBtn.addEventListener("click", () =>
   {
  localStorage.removeItem("history");
  loadHistory(); 
  alert("code_with_Suraj-7874\n\n\nHistory cleared successfully!");

});
