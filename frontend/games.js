const table = document.querySelector("#result-table");
const paginationCont = document.querySelector("#pagination");
let rowsPerPage = 20;
let currentPage = 1;
let ascending = false;
let data;

window.onload = getData();

function createPageLink(linkText, whereTo, isNro, data) {
	const pageLink = document.createElement('a');
	pageLink.href = "#";
	pageLink.innerText = linkText;
	pageLink.onclick = function () {
		currentPage = whereTo;
		displayTable();
	};
	if (whereTo === currentPage && isNro)
		pageLink.style.fontWeight = "bold";
	paginationCont.appendChild(pageLink);
	paginationCont.appendChild(document.createTextNode(" "));	
}

function updatePagination(data) {
	const pageAmt = Math.ceil(data.length / rowsPerPage);
	paginationCont.innerHTML = "";
	let rangeStart, rangeEnd, i;

	if (currentPage > 1)
		createPageLink("Previous", currentPage - 1, false, data);
	if (currentPage > 10) {
		createPageLink("1", Number(1), true, data);
		paginationCont.appendChild(document.createTextNode("... "));
		rangeStart = currentPage - 5;
	}
	else
		rangeStart = 1;
	rangeEnd = Number((pageAmt > (rangeStart + 10)) ? (rangeStart + 10) : pageAmt);
	for (i = rangeStart; i <= rangeEnd; i++)
		createPageLink(i, i, true, data);
	if (i < pageAmt) {
		paginationCont.appendChild(document.createTextNode("... "));
		createPageLink(pageAmt, Number(pageAmt), true, data);
	}		
	if (currentPage < pageAmt)
		createPageLink("Next", currentPage + 1, false, data);
}

function displayTable() {
	const startIndex = (currentPage - 1) * rowsPerPage;
	const endIndex = startIndex + rowsPerPage;
	const slicedData = data.slice(startIndex, endIndex);
	table.innerHTML = `
	<tr>
		<th>Id</th>
		<th>Name</th>
		<th>Released</th>
		<th>Rating</th>
		<th>Top Rating</th>
		<th>Added</th>
		<th>Updated</th>
	</tr>
	`;

	slicedData.forEach(element => {
		const row = table.insertRow(-1);
		const idCell = row.insertCell(0);
		const nameCell = row.insertCell(1);
		const releasedCell = row.insertCell(2);
		const ratingCell = row.insertCell(3);
		const topRatingCell = row.insertCell(4);
		const addedCell = row.insertCell(5);
		const updatedCell = row.insertCell(6);
		idCell.innerHTML = element.id;
		nameCell.innerHTML = element.name;
		releasedCell.innerHTML = element.released;
		ratingCell.innerHTML = element.rating;
		topRatingCell.innerHTML = element.ratingtop;
		addedCell.innerHTML = element.added;
		updatedCell.innerHTML = element.updated;
	});

	updatePagination(data);
}

async function getData() {
	try {
		const response = await fetch('http://localhost:3000/api/games');
		data = await response.json();
		table.innerHTML = "";
		currentPage = 1;
		displayTable();
	} catch (error) {
		console.error('Internal server error:', error);
	}
}