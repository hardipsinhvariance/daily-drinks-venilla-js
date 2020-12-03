(function () {
	//Global array contains in memory data
	var records = [];

	$(document).ready(function () {
		listRecords();
	});

	$(document.body).on("click", ".faEdit", function (e) {
		let recordId = $(this).data("id");
		if (recordId) {
			$("#recordModal .rmcTitle").text("Edit Record");
			$("#btnSubmit").text("Update");
			for (let i in records) {
				let record = records[i];
				if (record.id == recordId) {
					$("#txtName").val(record.name);
					$("#txtPrice").val(record.price);
					$("#txtNotes").val(record.notes);
					$("#recordId").val(record.id);
				}
			}
			showModal("recordModal");
		}

	});

	$("#spanAddNew").click(function () {
		$("#frmAddNew").trigger("reset");
		$("#btnSubmit").text("Add");
		$("#recordModal .rmcTitle").text("Add New Record");
		$("#recordId").val("");
		showModal("recordModal");
	});
	$(document.body).on("click", ".faDelete", function (e) {
		let recordId = $(this).data("id");
		if (confirm("Are you sure to delete?")) {
			deleteRecord(recordId);
			listRecords();
		}

	});

	//Scripts for modal

	$(".modal #btnCancel").click(function () {
		closeModal("recordModal");
	});

	$(document.body).on("click", "#btnSubmit", addRecord);

	function addRecord() {
		if (validateForm()) {
			let recordId = $("#recordId").val();

			if (recordId) {
				for (let i in records) {
					if (records[i].id == recordId) {
						let record = records[i];
						record.name = $("#txtName").val();
						record.price = $("#txtPrice").val();
						record.notes = $("#txtNotes").val();
						break;
					}
				}
			}
			else {
				//Adding record to in memory global array
				records.push({
					"id": records.length + 1,
					"name": $("#txtName").val(),
					"price": $("#txtPrice").val(),
					"notes": $("#txtNotes").val()
				});
			}
			listRecords();
			closeModal("recordModal");
		}
	}
	
	// Checks for required valications on the page
	function validateForm() {
		if ($.trim($("#txtName").val()).length == 0) {
			alert("Enter Name");
			setTimeout(function () { $("#txtName").focus(); }, 0);
			return false;
		}

		if ($.trim($("#txtPrice").val()).length == 0) {
			alert("Enter Price");
			setTimeout(function () { $("#txtPrice").focus(); }, 0);
			return false;
		}

		return true;
	}
	// Fetches data from global variable and render it as HTML
	function listRecords() {
		$("#recordsBody").empty();
		if (records.length > 0) {
			for (let i = 0; i < records.length; i++) {
				let record = records[i];
				$("#recordsBody").append('\
					<tr>     \
						<td class="row-id-header"> \
							'+ record.id + ' \
						</td> \
					<td class="row-name-header"> \
						'+ record.name + ' \
					</td> \
						<td class="row-price-header"> \
							'+ record.price + ' \
						</td> \
						<td class="row-notes-header" title="'+ escapeHtml(record.notes) + '"> \
							'+ record.notes + '\
						</td> \
							<td class="row-actions-header"> <i class="fa fa-edit faEdit" data-id="'+ record.id + '" title="Edit"></i>&nbsp;<i class="fa fa-trash faDelete"  data-id="' + record.id + '" title="Delete"></i>&nbsp;  \
							</td> \
					</tr> \
				');
			}
		}
		else {
			$("#recordsBody").append('\
					<tr>     \
						<td colspan="5" class="text-center"> \
							No Records Found! \
						</td> \
					</tr> \
				');
		}

	}
	function closeModal(id) {
		$("#" + id +" .close-modal").trigger("click");
	}

	function showModal(id) {
		$("#" + id).modal();
	}
	function deleteRecord(recordId) {
		//Returns new array that does not contain specified recordId and store it to the global array.
		records = records.filter(function (obj) {
			return obj.id != recordId;
		});
	}
})();

