$('#flightForm').on('submit', function (e) {
    e.preventDefault();


    let formData = new FormData(this);
    // try {
    $.ajax({
        url: 'http://localhost:3000/api/v1/airplanes',
        method: 'POST',
        // contentType: 'application/json',
        processData: false, // Tell jQuery not to process the data
        contentType: false, // Tell jQuery not to set a contentType (browser will set it to multipart)
        data: formData,
        success: function (resp) {
            if (resp.success) {
                let successHtml = '<div class="alert alert-success"><ul>';

                successHtml += `<li>${resp.message}</li>`;
                successHtml += '</ul></div>';

                // Show uploaded image
                if (resp.data && resp.data.full_file_url) {
                    const imgHtml = `
                <div class="mt-3">
                    <p><strong>Uploaded Image:</strong></p>
                    <img src="${resp.data.full_file_url}" 
                         alt="Airplane Image" 
                         style="max-width: 300px; border-radius: 10px;" />
                </div>
            `;

                    $('#imagePreview').html(imgHtml);
                }

                // reset form
                $('#flightForm')[0].reset();

                $('#errorBox').html(successHtml);

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