/*=============== SHOW SIDEBAR ===============*/
const showSidebar = (toggleId, sidebarId, headerId, mainId) => {
  const toggle = document.getElementById(toggleId),
    sidebar = document.getElementById(sidebarId),
    header = document.getElementById(headerId),
    main = document.getElementById(mainId);

  if (toggle && sidebar && header && main) {
    toggle.addEventListener("click", () => {
      /* Show sidebar */
      sidebar.classList.toggle("show-sidebar");
      /* Add padding header */
      header.classList.toggle("left-pd");
      /* Add padding main */
      main.classList.toggle("left-pd");
    });
  }
};
showSidebar("header-toggle", "sidebar", "header", "main");

/*=============== LINK ACTIVE ===============*/
const sidebarLink = document.querySelectorAll(".sidebar__list a");

function linkColor() {
  sidebarLink.forEach((l) => l.classList.remove("active-link"));
  this.classList.add("active-link");
}

sidebarLink.forEach((l) => l.addEventListener("click", linkColor));

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-fill";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme)
    ? "ri-moon-clear-fill"
    : "ri-sun-fill";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[
    selectedIcon === "ri-moon-clear-fill" ? "add" : "remove"
  ](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// for search usermanagementjs
function searchUsers() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const table = document.getElementById("usersTable");
  const rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName("td");
    let match = false;
    for (let j = 0; j < cells.length; j++) {
      if (cells[j].textContent.toLowerCase().includes(input)) {
        match = true;
        break;
      }
    }
    rows[i].style.display = match ? "" : "none";
  }
}

//modal for create account usermanagement.php

// Open the Create Account Modal
function openCreateAccountModal() {
  document.getElementById("createAccountModal").style.display = "block";
}

// Close the Create Account Modal
function closeCreateAccountModal() {
  document.getElementById("createAccountModal").style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == document.getElementById("createAccountModal")) {
    closeCreateAccountModal();
  }
};

// Function to open the edit modal and populate it with user data
function editUser(userId) {
  // Fetch user data via an AJAX request
  fetch("get_user_data.php?user_id=" + userId)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("editUserId").value = data.user_id;
      document.getElementById("editUsername").value = data.username;
      document.getElementById("editEmail").value = data.email;
      document.getElementById("editRole").value = data.role;
      document.getElementById("editPassword").value = ""; // Reset password field
      document.getElementById("editModal").style.display = "block";
    });
}

// Function to open the delete modal
function deleteUser(userId) {
  document.getElementById("deleteUserId").value = userId;
  document.getElementById("deleteModal").style.display = "block";
}

// Function to close any modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Close the modal if the user clicks on the background
window.onclick = function (event) {
  if (event.target.className == "modal") {
    closeModal("editModal");
    closeModal("deleteModal");
  }
};
