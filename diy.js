(function(){
	var oldData;
	var html = `
		<button class="ys-btn" id="importData">
			导入<input type="file" id="fileInput">
		</button>
		<button class="ys-btn" id="exportJson">导出</button>
		
	`
	// <button class="ys-btn" id="exportMarkdown">导出 Markdown</button>
	
	// html += '<button class="diy input">',
	// html += '导入<input type="file" id="fileInput">',
	// html += '</button>';

	$('.editor-title').append(html);

	$('#export-test').on('click', function () {
		editor.minder.exportData('markdown').then(function(content){
			console.log('导出回调', content)
			// switch(exportType){
			// 	case 'json':
			// 		console.log($.parseJSON(content));
			// 		break;
			// 	default:
			// 		console.log(content);
			// 		break;
			// }
		})
	})
	$('#exportJson').on('click', function () {
		editor.minder.exportData('json').then(function(content){
			var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
			saveAs(blob, "脑图.json")
		})
	})
	$('#exportMarkdown').on('click', function () {
		editor.minder.exportData('markdown').then(function(content){
			var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
			saveAs(blob, "脑图.json")
		})
	})

	$('.diy').css({
		// 'height': '30px',
		// 'line-height': '30px',
		'margin-top': '0px',
		'float': 'right',
		'background-color': '#fff',
		'min-width': '60px',
		'text-decoration': 'none',
		color: '#999',
		'padding': '0 10px',
		border: 'none',
		'border-right': '1px solid #ccc',
	});
	$('.input').css({
		'overflow': 'hidden',
		'position': 'relative',
	}).find('input').css({
		cursor: 'pointer',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		display: 'inline-block',
		opacity: 0
	});

	// 导入
	window.onload = function() {
		var fileInput = document.getElementById('fileInput');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0],
					// textType = /(md|km)/,
					fileType = file.name.substr(file.name.lastIndexOf('.')+1);
			console.log(file);
			switch(fileType){
				case 'md':
					fileType = 'markdown';
					break;
				case 'km':
				case 'json':
					fileType = 'json';
					break;
				default:
					console.log("File not supported!");
					alert('只支持.km、.md、.json文件');
					return;
			}
			var reader = new FileReader();
			reader.onload = function(e) {
				var content = reader.result;
				editor.minder.importData(fileType, content).then(function(data){
					console.log(data)
					$(fileInput).val('');
				});
			}
			reader.readAsText(file);
		});
	}

})();
