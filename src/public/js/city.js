$('#flightForm').on('submit', async function (e) {
    e.preventDefault();

    const data = {
        name: $('#cityName').val()
    };

    // try {
    const response = await $.ajax({
        url: 'http://localhost:3000/api/v1/cities',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (resp) {
            console.log(resp);
            if (resp.success) {
                let successHtml = '<div class="alert alert-success"><ul>';

                successHtml += `<li>${resp.message}</li>`;
                successHtml += '</ul></div>';

                $('#errorBox').html(successHtml);
                $('#cityName').val('')

            }
        },
        error: function (err) {
            const errors = err.responseJSON?.message ? [err.responseJSON?.message] : ['Something went wrong'];

            let errorHtml = '<div class="alert alert-danger"><ul>';

            errors.forEach(err => {
                errorHtml += `<li>${err}</li>`;
            });

            errorHtml += '</ul></div>';

            $('#errorBox').html(errorHtml);
        }
    });

    
});