
const storedExpenses = sessionStorage.getItem('expenses');

// Initialize an array to store expenses
let expenses = [];

// Check if there are stored expenses in session storage
if (storedExpenses) {
    // Parse the stored JSON string into an array
    expenses = JSON.parse(storedExpenses);
}


if (sessionStorage.getItem('isLoggedIn') === 'false') {
    window.location.href = 'AccessDenied.html';
}

function searchExpenseTitle() {
    // Get the search input value
    var searchInput = document.getElementById("searchInput").value.toLowerCase();
    var searchCategory = document.getElementById("categorySearch").value.toLowerCase();

    // Filter expenses based on the search input

    var filteredExpenses = expenses.filter(function (expense) {
        return expense.title.toLowerCase().includes(searchInput) && expense.category.toLowerCase().includes(searchCategory);
    });

    // Display filtered expenses
    const expenseListTable = document.getElementById('expenseList');
    expenseListTable.innerHTML = ''; // Clear previous data

    filteredExpenses.forEach(expense => {
        const row = expenseListTable.insertRow();
        row.innerHTML = `
            <td>${expense.title}</td>
            <td>${expense.category}</td>
            <td>${expense.amount}</td>
            <td>${expense.date}</td>
            <td>${expense.note}</td>
            <td><button><i class="material-icons">delete</i></button></td>
            <td><button><i class="material-icons">edit</i></button></td>
        `;
    });
}

// Function to display expenses in the table
function displayExpenses() {

    const expenseListTable = document.getElementById('expenseList');
    expenseListTable.innerHTML = ''; // Clear previous data

    expenses.forEach(expense => {
        const row = expenseListTable.insertRow();
        row.innerHTML = `
            <td>${expense.title}</td>
            <td>${expense.category}</td>
            <td>${expense.amount}</td>
            <td>${expense.date}</td>
            <td>${expense.note}</td>
            <td><button><i class="material-icons">delete</i></button></td>
            <td><button><i class="material-icons">edit</i></button></td>
        `;
    });
}

var modal = document.getElementById("expenseModal");
var addExpenseBtn = document.getElementById("addExpenseBtn");

var span = document.getElementsByClassName("close")[0];
addExpenseBtn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function addExpense() {
    var title_val = document.getElementById("title").value;
    var category_val = document.getElementById("category").value;
    var amount_val = document.getElementById("amount").value;
    var date_val = document.getElementById("date").value;
    var note_val = document.getElementById("note").value;

    if (!category_val || !amount_val || !date_val) {
        alert("Please fill in all required fields."); // Display a warning message
        return;
    }
    // Generate a unique ID for the expense
    const id = expenses.length + 1;

    // Create a new expense object
    const newExpense = { id, title: title_val, category: category_val, amount: amount_val, date: date_val, note: note_val };

    // Add the new expense to the expenses array
    expenses.push(newExpense);

    // Save the updated expenses array to sessionStorage
    sessionStorage.setItem('expenses', JSON.stringify(expenses));

    displayExpenses();

    modal.style.display = "none";
}
function generateExpenseChart() {
    const expenseByCategory = {};
    expenses.forEach(expense => {
      if (!expenseByCategory[expense.category]) {
        expenseByCategory[expense.category] = 0;
      }
      expenseByCategory[expense.category] += parseInt(expense.amount);
    });

    // Prepare data for the chart
    const labels = Object.keys(expenseByCategory);
    const data = Object.values(expenseByCategory);

    // Create the chart
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const expenseChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Expense by Category',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

}

function groupByMonthExpense() {
    // Calculate total expenses for each month
    const expenseByMonth = {};
    expenses.forEach(expense => {
        const month = new Date(expense.date).toLocaleString('default', { month: 'long' }); // Extracting YYYY-MM from the date
      if (!expenseByMonth[month]) {
        expenseByMonth[month] = 0;
      }
      expenseByMonth[month] += parseInt(expense.amount);
    });

    // Prepare data for the chart
    const labels = Object.keys(expenseByMonth);
    const data = Object.values(expenseByMonth);

    // Create the chart
    const ctx = document.getElementById('expensePieChart').getContext('2d');
    const expensePieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Expense by Month',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 99, 132, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      }
    });
}
function generateSampleData() {
    return [
        
            { id: 11, title: "Dinner Party", category: "Food", amount: "200", date: "2024-08-10", note: "Hosting friends" },
            { id: 12, title: "Taxi Ride", category: "Transportation", amount: "30", date: "2024-08-11", note: "Late night ride" },
            { id: 13, title: "Grocery Shopping", category: "Food", amount: "150", date: "2024-08-12", note: "Stocking up" },
            { id: 14, title: "Concert Tickets", category: "Entertainment", amount: "100", date: "2024-08-13", note: "Live music event" },
            { id: 15, title: "Internet Bill", category: "Utilities", amount: "60", date: "2024-09-14", note: "Monthly internet subscription" },
            { id: 16, title: "New Jacket", category: "Clothing and Accessories", amount: "120", date: "2024-09-15", note: "Winter jacket" },
            { id: 17, title: "Fast Food", category: "Food", amount: "20", date: "2024-10-16", note: "Quick lunch" },
            { id: 18, title: "Flight Tickets", category: "Travel", amount: "500", date: "2024-10-17", note: "Vacation booking" },
            { id: 19, title: "Prescription Medicine", category: "Healthcare", amount: "50", date: "2024-11-18", note: "Monthly medication" },
            { id: 20, title: "Car Insurance", category: "Insurance", amount: "100", date: "2024-11-19", note: "Monthly premium" }
        
        
    ];
}


// Generate sample data
const sampleData = generateSampleData();

// Convert the sample data to JSON string
const jsonData = JSON.stringify(sampleData);

// Store the JSON string in session storage
sessionStorage.setItem('expenses', jsonData);
// Retrieve expenses from sessionStorage when the page loads
window.onload = function () {

    const storedExpenses = sessionStorage.getItem('expenses');
    if (storedExpenses) {
        expenses = JSON.parse(storedExpenses);
        displayExpenses();
    }

    generateExpenseChart();
    groupByMonthExpense();
}

function reset(){
        document.getElementById("searchInput").value='';
    document.getElementById("categorySearch").value='';
    displayExpenses();
}

function logout() {
    sessionStorage.setItem('isLoggedIn', 'false');
    window.location.href = 'index.html';
}

