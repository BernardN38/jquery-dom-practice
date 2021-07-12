let nameArr = [];
let ratingArr = [];

$('#submit-form').on('click', (event) => {
	event.preventDefault();
	if ($('#movie-rating').val() > 10 || $('#movie-rating').val() < 0) return;
	if ($('#movie-name').val().length < 3) return alert('Movie Name must be longer than 2 characters');
	$('#movie-name-list').append(`<li>${$('#movie-name').val()}</li>`);
	$('#movie-rating-list').append(`<li>${$('#movie-rating').val()}</li>`);
	$('#buttons').append("<button class='delete' >Delete</button>");
	$('#movie-rating').val('');
	$('#movie-name').val('');
	saveTableData();
});

$('#buttons').on('click', '.delete', function() {
	$('#movie-name-list').children().eq($(this).index()).remove();
	$('#movie-rating-list').children().eq($(this).index()).remove();
	$('#buttons').children().eq($(this).index()).remove();
});

$('#sort-names').click(function() {
	if ($(this).prop('checked') == true) {
		$('#sort-ratings').prop('checked', false)
		nameArr.sort();
		$('#movie-name-list').text('');
		$('#movie-rating-list').text('');

		nameArr.map((movie) => {
			$('#movie-name-list').append(`<li>${movie[0]}</li>`);
			$('#movie-rating-list').append(`<li>${ratingArr[movie[1]][0]}`);
		});
		saveTableData();
	}
});

$('#sort-ratings').click(function() {
	if ($(this).prop('checked') == true) {
		$('#sort-names').prop('checked', false)
		ratingArr.sort();
		$('#movie-name-list').text('');
		$('#movie-rating-list').text('');

		ratingArr.map((rating, idx) => {
			if (rating[0] == 10) {
				ratingArr.splice(idx, 1);
				ratingArr.push(rating);
			}
		});
		ratingArr.map((rating, idx) => {
			$('#movie-rating-list').append(`<li>${rating[0]}</li>`);
			$('#movie-name-list').append(`<li>${nameArr[rating[1]][0]}</li>`);
		});

		saveTableData();
	}
});

function saveTableData() {
	nameArr = [];
	ratingArr = [];
	$('#movie-name-list').children().each(function() {
		nameArr.push([ this.innerText, $(this).index() ]);
	});
	$('#movie-rating-list').children().each(function() {
		ratingArr.push([ this.innerText, $(this).index() ]);
	});
}

function init() {
	saveTableData();
}

init();
