window.onload = function () {
	document.getElementsByClassName('tables')[0].addEventListener('click', tableClickListener);
	document.getElementById('modal').getElementsByClassName('modal__close')[0]
		.addEventListener('click', closeModalListener);
	document.getElementById('date_input').value = window.location.pathname.split('/')[2];

	if (window.location.pathname.split('/').length !== 3) {
		const today = new Date();
		const dd = String(today.getDate()).padStart(2, '0');
		const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		const yyyy = today.getFullYear();
		window.history.pushState("object or string", "Title", `/home/${yyyy}-${mm}-${dd}`);
	}
	document.getElementById('date_input').addEventListener('change', changeDate);

};

function changeDate(e) {
	const arr = window.location.pathname.split('/');
	if (arr.length === 3) {
		arr[2] = e.target.value;
	} else {
		arr.push(e.target.value);
	}
	window.location.href = window.location.origin + arr.join('/');
}

function renderTableInfo({guests}, tableId, date) {
	let resultHtml = '<ul class="modal__guests">';
	for (const guest of guests) {
		resultHtml += `<li class="modal__guest">${guest.name}</li>`
	}
	resultHtml += '</ul>';
	const modal = document.getElementById('modal');
	document.getElementById('table_id_input').value = tableId;
	document.getElementById('form_date_input').value = date;
	modal.getElementsByClassName('modal__content')[0].innerHTML = resultHtml;
	modal.classList.remove('modal_hidden');
}

function closeModalListener() {
	document.getElementById("modal").classList
		.add('modal_hidden');
}

function tableClickListener(event) {
	if (event.target.className !== 'table')
		return;
	const tableId = event.target.dataset.tableId;
	const host = new URL(window.location.href).origin;
	const arr = new URL(window.location.href).pathname.split('/');
	if (arr.length < 3) {
		alert('укажите дату');
		return;
	}
	const date = arr[arr.length - 1];
	fetch(`${host}/getTableInfo/${tableId}/${date}`)
		.then(x => x.json(), err => alert(`server error ${err}`))
		.then(x => renderTableInfo(x, tableId, date))
		.catch(err => alert(err));
}
