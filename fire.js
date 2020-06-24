const firePixelsArray = [];
const panelWidth = 60;
const panelHeight= 40;
const fireColorsPallete = ['610000','610000','610000','610000','610000','610600','611C15','610000','611C15','EB0109',
'EB5C00','EB0109','610000','EB4221','EB3F00','EB3F00','EB5E00','9E2009','E88E20','E88E20','EB4316','EB4316','EB7334',
'EB7334','EB4C01','EB4C01','EB4C01','EBC400','EB6300','EB8101','EBC400','EB4800','EBC400','FFAF03','FFAF03','ffffff','ffffff']

function start(){
 	createFireDataStructure();
 	createFireSource();
 	renderFire();

 	setInterval(calcFirePropagation, 50);
}

/* Esta função vai utilizar estrutura de dados
Array Linear para criar a base do fogo */
function createFireDataStructure(){
	const numberOfPixels = panelWidth * panelHeight;

	for (let i = 0; i < numberOfPixels; i++){
		firePixelsArray[i] = 0;
	}
}



/* Esta função vai dar movimento e intesnsidade 
a animação do fogo */
function calcFirePropagation(){
	for (let column = 0; column < panelWidth; column++){
		for (let row = 0; row < panelHeight; row++){
			const pixelIndex = column + (panelWidth * row);

			updateFireIntensityPerPixel(pixelIndex);
		}
	}

	renderFire();
}


/* Esta função altera a intensidade do fogo
dependendo da posição que o ponteiro estiver*/
function updateFireIntensityPerPixel(currentPixelIndex){
	// Armazenando posição do pixel anterior
	const belowPixelIndex = currentPixelIndex + panelWidth;

	// Se o valor do pixel anterior ultrapassa o tamanho do canvas...
	if(belowPixelIndex >= panelWidth * panelHeight){
		return;// O programa não interage com este pixel
	}

	const decay = Math.floor(Math.random() * 5);
	const belowPixelFireIntensity = firePixelsArray[belowPixelIndex];
	const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay: 0;

	// Alterando a intensidade do fogo
	firePixelsArray[currentPixelIndex] = newFireIntensity;

}



/*Esta função vai converter para um cenário visual (renderizar)*/
function renderFire(){
	const debug = false;

	let html = '<table cellpadding=0 cellspacing=0>';

	for (let row = 0; row < panelHeight; row++){	// Criando as linhas
		html += '<tr>';

		for (let column = 0; column < panelWidth; column++){  // Criando as celulas
			// Armazenando a posição atual dos pixels
			const pixelIndex = column + (panelWidth * row);
			// Armazenando a intensidade do fogo na posição do pixel
			const fireIntensity = firePixelsArray[pixelIndex];
			
			if(debug === true){
				html += '<td>';
				html += `<div class="pixel-index">${pixelIndex}</div>`;
				html += fireIntensity;
				html += '</td>';
			}
			else{
				const color = fireColorsPallete[fireIntensity];
				const colorString = `#${color}`
				html += `<td class="pixel" style="background-color: ${colorString}">`;
				html += `</td>`;
			}
			
		}

		html += '</tr>';
	}

	html += '</table>'

	document.querySelector('#fireCanvas').innerHTML = html;
}

/* Função que cria o recurso para a base do visual do fogo*/
function createFireSource(){
	for (let column = 0; column <= panelWidth; column++){
		// Armazenando o valor do ultimo pixel no canvas
		const overflowPixelIndex = panelWidth * panelHeight;
		const pixelIndex = (overflowPixelIndex - panelWidth) + column;

		firePixelsArray[pixelIndex] = 36;
	}
}

//--------------------------------------

start();