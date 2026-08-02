const addBookingButton = document.getElementById("addBookingButton");
const closeModalButton = document.getElementById("closeModalButton");
const bookingModal = document.getElementById("bookingModal");
const bookingForm = document.getElementById("bookingForm");
const bookingTable = document.getElementById("bookingTable");

addBookingButton.addEventListener("click", () => {
    bookingModal.classList.remove("hidden");
});

closeModalButton.addEventListener("click", () => {
    bookingModal.classList.add("hidden");
});

bookingModal.addEventListener("click", (event) => {
    if (event.target === bookingModal) {
        bookingModal.classList.add("hidden");
    }
});

bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const customerName = document.getElementById("customerName").value;
    const serviceName = document.getElementById("serviceName").value;
    const bookingDate = document.getElementById("bookingDate").value;
    const bookingTime = document.getElementById("bookingTime").value;

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${customerName}</td>
        <td>${serviceName}</td>
        <td>${bookingDate}</td>
        <td>${bookingTime}</td>
        <td>
            <span class="status confirmed">Confirmed</span>
        </td>
    `;

    bookingTable.appendChild(row);

    bookingForm.reset();
    bookingModal.classList.add("hidden");
});
