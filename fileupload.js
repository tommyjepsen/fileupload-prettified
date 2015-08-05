/**
 * @author Tommy Jepsen
 *
 * http://www.abeautifulsite.net/whipping-file-inputs-into-shape-with-bootstrap-3/
 *
 * How to use it:
 * <span class="btn btn-primary btn-file" >
 * <p id="fileupload-content">Choose image</p> <input type="file" id="image" name="image">
 * </span>
 *
 * Style css class: fileupload-img for styling the images that outputs
 *
 */

$(document).ready( function() {

	/**
	 * Callback on input file change
	 * @author  Tommy Jepsen
	 * @returns void
	 */
	$(document).on('change', '.btn-file :file', function() {
		var input = $(this),
			numFiles = input.get(0).files ? input.get(0).files.length : 1,
			label = input.val().replace(/\\/g, '/').replace(/.*\//, ''),
			inputThis = this;

		input.trigger('fileselect', [inputThis, numFiles, label]);
	});

	/**
	 * Callback on fileselected
	 * @author  Tommy Jepsen
	 * @param   event, inputThis, numFiles, label
	 * @returns void
	 */
	$('.btn-file :file').on('fileselect', function(event, inputThis, numFiles, label) {

		/* Remove all images */
		var fileuploaddivs = $('.fileupload-img');
		if(fileuploaddivs != undefined) {
			fileuploaddivs.remove();
		}

		/* Loop through every fileupload and draw it */
		var i = 0;
		while(inputThis.files && inputThis.files[i]) {
			var reader = new FileReader();

			reader.onload = function (e) {
				/* Drawing it to parent of input, which is supposed to be .col-sm-12 or something similar */
				var img = $("<img class='fileupload-img' />").attr('src', e.target.result);
				img.appendTo($(inputThis).parent().parent().parent());
			}

			reader.readAsDataURL(inputThis.files[i]);
			i++;
		}

		/* Tell how many */
		var input = $("#fileupload-content"),
			log = numFiles > 1 ? numFiles + ' files selected' : label;

		if( input.length ) {
			input.text(log);
		}

	});
});
