import express from 'express';

const app = express();

function openTab(tabName) {
  var tabcontent = document.getElementsByClassName("tab-content");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  var tablinks = document.getElementsByClassName("tab-button");
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // ตรวจสอบว่า tabName มีค่าหรือไม่
  if (tabName) {
    var tabContent = document.getElementById(tabName);
    var tabLink = document.querySelector(`[onclick="openTab('${tabName}')"]`);

    if (tabContent && tabLink) {
      tabContent.style.display = "block";
      tabLink.classList.add("active");
    }
  }
}

