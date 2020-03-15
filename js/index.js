'use strict';

// используй const везде, где это возможно. в остальных 5% случаев используй let.


window.SoundManager = (() => {
	//	https://freesound.org/browse/tags/game-sound/
	//	username: edlcxykl@supere.ml
	//	pwd: edlcxykl@supere.ml

	const sounds = {
		bulletExplodes: new Audio('./sounds/explosion.mp3'),
		shellExplodes: new Audio('./sounds/shell_explosion.wav'),
		shoot: new Audio('./sounds/shot.flac'),
		bgMusic: new Audio('./sounds/bg_music.mp3'),
		oi: new Audio('./sounds/oi.mp3')
	};

	sounds.bgMusic.currentTime = 90;


	const playSound = (eventId, offset = 0) => {
		sounds[eventId].currentTime = offset;
		sounds[eventId].play();
	};

	return {
		playSound,

		initializeifNecessary() {
			sounds.bgMusic.play();
		}
	};
})();






const livesHouse = document.getElementById('liveshouse');
let lives = 3;
let damage = 1;
console.log(lives);

function drawScore() {

    livesHouse.fillText("Score: "+lives, 8, 20);
}

function addlives(){
  livesHouse.innerHTML = 'LLDLASdAsd';
};
/* 		function houseLives (){
		
		let livesHouseTwo = ['Количество жизней у домиков'];
		if (livesHouse) {
			let livesHouseTwo = ['Количество жизней у домиков'];
		};
		livesHouse.textContent = livesHouseTwo;			
		}; */

/* function drawScore() {
    livesHouse.font = "16px Arial";
    livesHouse.fillStyle = "#0095DD";
    livesHouse.textContent= ['Количество жизней у домиков'] +lives;
}; */


/* let livesHouse = ('.liveshouse'); */
/* let livesHouse = 3; */

/* function livesHouseUpdate(houseBody) {
livesHouse.text(houseBody);
}; */

window.labels = {
	BULLET_SOURCE_LABEL: 'bullet_source',
	BULLET_LABEL: 'bullet',
	EVIL_SHELL_LABEL: 'evil_shell',
	EVIL_PLANE_LABEL: 'evil_plane',
	PLANE_LABEL: 'plane',
	HOUSE_LABEL: 'house',
	SPLINTERS_LABEL: 'splinters'
	
};


const runMyShit = () => {

	const Engine = Matter.Engine, /// содержит методы для создания и управления движками
		Render = Matter.Render, ///базовый рендерер на основе холста HTML5. Этот модуль необходим для визуализации различных движков.
		World = Matter.World, /// используется для создания и управления миром, в котором работает движок
		Composites = Matter.Composites,
		Composite = Matter.Composite,
		Constraint = Matter.Constraint,
		Events = Matter.Events,
		Mouse = Matter.Mouse,
		MouseConstraint = Matter.MouseConstraint,
		Body = Matter.Body,
		Pair = Matter.Pair,
		Bodies = Matter.Bodies; ////позволяет создавать объекты твердого тела

	const engine = Engine.create(); ///создания нового движка

	const SCREEN_SIZE = {
		width: document.body.clientWidth,
		height: document.body.clientHeight
	};

	window.EnemyGenerator.initialize(engine, SCREEN_SIZE);

	const render = Render.create({
		/// создания нового рендерера
		element: window.document.body,
		///ключ element, куда библиотека вставляет холст, можно поменять на canvas
		engine, ///указание движка, который должен использоваться для визуализации мира
		options: {
			width: SCREEN_SIZE.width,
			height: SCREEN_SIZE.height,
			wireframes: false,
			background: '#00000000'
		}
	});


	const GROUND_HEIGHT = 30;
	const ground = Bodies.rectangle(0, SCREEN_SIZE.height - GROUND_HEIGHT, SCREEN_SIZE.width*2, GROUND_HEIGHT, { isStatic: true });

const generateBrickWall = (fromX, fromY) => {
	const HEIGHT_BRICKS = 1;
	const WIDTH_BRICKS =3;

	const BRICK_SIZE = {
		height: 9,
		width: 40
	};

	const result = [];

	for (let brickX = 0; brickX < WIDTH_BRICKS; brickX += 1) {
		for (let brickY = 0; brickY < HEIGHT_BRICKS; brickY += 1) {
			
	/* const initialVelocity = velocity || { x: 8 + Math.random() * 5, y: - Math.random() * 8 }; */
		

			result.push(Matter.Bodies.rectangle(
				fromX + brickX * BRICK_SIZE.width,
				fromY + brickY * BRICK_SIZE.height,
				BRICK_SIZE.width,
				BRICK_SIZE.height,
				/* {collisionFilter: {group: -1},render: {sprite: {texture: "images/chick.png"}} } */
				/* {setAngularVelocity: Math.PI/6 } */
			));
		}
	}
		
	return result;
	World.add(engine.world, generateBrickWall);
	Body.setAngularVelocity( generateBrickWall, Math.PI/6);
};





	const house = Bodies.rectangle(680, SCREEN_SIZE.height - GROUND_HEIGHT - 45, 100, 100, { isStatic: true, label: window.labels.HOUSE_LABEL,
				render: {
				sprite: { texture: './images/houseAlt2.png', xScale: 0.3, yScale: 0.3}
			} });
	World.add(engine.world, house);
	
	const house2 = Bodies.rectangle(450, SCREEN_SIZE.height - GROUND_HEIGHT - 45, 100, 100, { isStatic: true, label: window.labels.HOUSE_LABEL,
				render: {
				sprite: { texture: './images/house2.png', xScale: 0.3, yScale: 0.3}
			} });
	World.add(engine.world, house2);

			const text0 = Bodies.rectangle(50, 50, 1, 1, { isStatic: true, label: window.labels.TEXT_LABEL, render: {
						sprite: { texture: './images/text_0_small.png'}
					} });
			const text1 = Bodies.rectangle(50, 50, 1, 1, { isStatic: true, label: window.labels.TEXT_LABEL, render: {
						sprite: { texture: './images/text_1_small.png'}
					} });
			const text2 = Bodies.rectangle(50, 50, 1, 1, { isStatic: true, label: window.labels.TEXT_LABEL, render: {
						sprite: { texture: './images/text_2_small.png'}
					} });
			const text3 = Bodies.rectangle(50, 50, 1, 1, { isStatic: true, label: window.labels.TEXT_LABEL, render: {
						sprite: { texture: './images/text_3_small.png'}
					} });	


	const ArtaDown = Bodies.rectangle(600, SCREEN_SIZE.height - GROUND_HEIGHT - 20, 50, 20, {
		collisionFilter: {
			group: -2
		},
		render:{
		
		text:{
			content:"Test",
			color:"blue",
			size:16,
			family:"Papyrus",
		}},
		label: window.labels.BULLET_SOURCE_LABEL,
		isStatic: true
	});

	const ArtaUp = Bodies.rectangle(600, SCREEN_SIZE.height - GROUND_HEIGHT - 40, 15, 30, {
		collisionFilter: {
			group: -2
		},
		label: window.labels.BULLET_SOURCE_LABEL,
		isStatic: true
	});

	const constraint = Constraint.create({
		bodyA: ArtaDown,
		pointA: {
			x: 0,
			y: -15
		},
		bodyB: ArtaUp,
		pointB: {
			x: 0,
			y: 15
		}
	});
	const constraint2 = Constraint.create({
		bodyA: ArtaDown,
		pointA: {
			x: -6,
			y: 4
		},
		bodyB: ArtaUp,
		pointB: {
			x: -1,
			y: 7
		}
	});



	/* const group = Body.nextGroup(true);
	const ArtaUp = Composites.stack(600, SCREEN_SIZE.height-GROUND_HEIGHT-20 , 1, 1, 1, 10, function(x, y) {
				return Bodies.rectangle(x, y, 50, 10,  { ///размеры блока
					collisionFilter: {
						 group: group
					},
					 });
			}); */
	/* Composites.chain(ArtaUp,0.5, 0, -0.4, 0, {stiffness: 0.8, length: 1});
	Composite.add(ArtaUp, Constraint.create({
				bodyB: ArtaDown,
	bodyA: ArtaUp.bodies[0],
			   pointB: {
					x: 0,
					y: -12
				},
				pointA: {
					x: -20,
					y: 0
				},
				stiffness: 0.4,
	length: 0
			})); */
	const keys = [];
	const KEYS = {
		A: 65,
		D: 68
	};

	document.body.addEventListener("keydown", function(e) {
		keys[e.which] = true;
	});
	document.body.addEventListener("keyup", function(e) {
		keys[e.which] = false;
	});


	let bulletAngleDegrees = 12;
	const ANGLE_STEP = 1.5;

	Events.on(engine, "beforeTick", function(event) {
		if (keys[KEYS.A]) {
			bulletAngleDegrees = Math.max(0, bulletAngleDegrees - ANGLE_STEP);

		} else if (keys[KEYS.D]) {
			bulletAngleDegrees = Math.min(180, bulletAngleDegrees + ANGLE_STEP);
		}
	});



	World.add(engine.world, [ground, ArtaDown, ArtaUp, constraint ]);


	const degreesToRadians = degrees => degrees * Math.PI / 180;

	const onSpaceBarPressed = () => {
		let x = ArtaUp.position.x;
		let y = ArtaUp.position.y;

		const bullet = Bodies.circle(x, y, 4, {
			label: window.labels.BULLET_LABEL,
			render: {
				sprite: { texture: './images/bullet.png' }
			}
		});

		const velocityMagnitude = 40;

		const velocityVector = {
			x: velocityMagnitude * Math.cos(degreesToRadians(180 + bulletAngleDegrees)),
			y: velocityMagnitude * Math.sin(degreesToRadians(180 + bulletAngleDegrees)),
		};

		Body.setVelocity(bullet, velocityVector);
		World.add(engine.world, bullet);

		SoundManager.playSound('shoot');
	};



function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
} 


/* 	function drawScore() {

	
    livesHouse.innerText("Score: ");
} */

if (randomInteger=2){

	Events.on(engine, 'collisionStart', event => {
		const pairs = event.pairs;
		
		
		

		for (var i = 0; i < pairs.length; i++) { ///отслеживание столкновения
			const pair = pairs[i];
			
		let splinters1;
		let splinters2;
		let splinters3;
		let splinters4;
	
			

			const bulletBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.BULLET_LABEL);
			const evilShellBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.EVIL_SHELL_LABEL);
			const houseBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.HOUSE_LABEL);
			const textLabel = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.TEXT_LABEL);
			const evilPlaneBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.EVIL_PLANE_LABEL);
			const otherBody = [pair.bodyA, pair.bodyB].find(body => body.label != window.labels.BULLET_LABEL);
			

			
				
			

			if (!otherBody) {
				continue;
			}

			if (!bulletBody && !evilShellBody ) {
				continue;
			}
			
			if (bulletBody && otherBody.label == window.labels.BULLET_SOURCE_LABEL) {
				//	do nothing, since it's a bullet source
				continue;
			}

			if (bulletBody) {
				Matter.World.remove(engine.world, bulletBody);
				SoundManager.playSound('bulletExplodes');
			}
			
			if (evilShellBody && houseBody) {

			
			 ///нужен текстлейбл


	lives-=damage;
	 if (lives<4 && lives >2 ) {
		console.log(lives);
	Matter.World.add (engine.world, text3)}
	else if (lives<3 && lives >1) {
		console.log(lives);
	Matter.World.add (engine.world, text2);
	Matter.World.remove(engine.world, text3)}
	else if (lives<2 && lives >0) {
		console.log(lives);
	Matter.World.add (engine.world, text1);
	Matter.World.remove(engine.world, text2)}
	
	
	else if (lives<1)  {
		console.log(lives);
		Matter.World.add (engine.world, text0);
		Matter.World.remove(engine.world, [houseBody, text1]);
		drawScore();
		
		addlives();
		/* document.getElementsByClassName('liveshouse').textContent = "ЛОХ" ; */
		
		/* livesHouse.textContent("Score: "); */
		/* alert ( 'Твой мир пал!'); */	
	}
	
				console.log(lives);		
			
				
				/* setInterval(() => { setTimeout(Matter.World.remove(engine.world, houseBody), 3000)}); */
				///как ввести взрыв после времени
			
				SoundManager.playSound('oi');
			}	
			

			
			

			
			if (bulletBody && evilPlaneBody) {
				Matter.World.add (engine.world, 
				
				[splinters1=Bodies.rectangle(evilPlaneBody.position.x, evilPlaneBody.position.y, 30, 10, {collisionFilter: {group: -1}, label: window.labels.SPLINTERS_LABEL, render: {sprite: {texture: "images/santa_head.png"}} }),
				splinters2=Bodies.rectangle(evilPlaneBody.position.x+2, evilPlaneBody.position.y+9, 5, 12, {collisionFilter: {group: -1}, label: window.labels.SPLINTERS_LABEL, render: {sprite: {texture: "images/RTSobject_06.png"}} }),
				splinters3=Bodies.rectangle(evilPlaneBody.position.x-12, evilPlaneBody.position.y+3, 16, 4, {collisionFilter: {group: -1}, label: window.labels.SPLINTERS_LABEL, render: {sprite: {texture: "images/RTSobject_09.png"}} }),
				splinters4=Bodies.rectangle(evilPlaneBody.position.x-5, evilPlaneBody.position.y-8, 9, 2, {collisionFilter: {group: -1}, label: window.labels.SPLINTERS_LABEL, render: {sprite: {texture: "images/RTSobject_04.png"}} })],
				Body.setAngularVelocity( splinters1, Math.PI/6),
				Body.setAngularVelocity( splinters2, Math.PI/6),
				Body.setAngularVelocity( splinters3, Math.PI/2),
				Body.setAngularVelocity( splinters4, Math.PI/6),
				Body.setVelocity(splinters1, { x: 8 + Math.random() * 5, y: - Math.random() * 8 }),
				Body.setVelocity(splinters2, { x: 2 + Math.random() * 5, y: - Math.random() * 2 }),
				Body.setVelocity(splinters3, { x: 4 + Math.random() * 5, y: - Math.random() * 4 }),
				Body.setVelocity(splinters4, { x: Math.random() * 5, y:  Math.random() * 8 }),
				); ////объединить в один маркер не получается из за позиции evilPlaneBody
				

				
				Matter.World.remove(engine.world, evilPlaneBody);
				
				SoundManager.playSound('shellExplodes');
			}
			
			if (evilShellBody) {
				Matter.World.remove(engine.world, evilShellBody);				
				SoundManager.playSound('shellExplodes', 1);
			}
			



		
		if (splinters1 && houseBody) {
		lives-=damage;
		if (lives<1)  {
		console.log(lives);
		Matter.World.remove(engine.world, houseBody);
		}
				console.log(lives);										
				SoundManager.playSound('oi');
			}	

		if (splinters2 && houseBody) {
		lives-=damage;
		if (lives<1)  {
		console.log(lives);
		Matter.World.remove(engine.world, houseBody);
		}
				console.log(lives);										
				SoundManager.playSound('oi');
			}	

		if (splinters3 && houseBody) {
		lives-=damage;
		if (lives<1)  {
		console.log(lives);
		Matter.World.remove(engine.world, houseBody);
		}
				console.log(lives);										
				SoundManager.playSound('oi');
			}			

		if (splinters4 && houseBody) {
		lives-=damage;
		if (lives<1)  {
		console.log(lives);
		Matter.World.remove(engine.world, houseBody);
		}
				console.log(lives);										
				SoundManager.playSound('oi');
			}	

			
			
		}
	});
	
};
	
	
	
	
/* 	if (randomInteger=3){

	Events.on(engine, 'collisionStart', event => {
		const pairs = event.pairs;
		
		
		
		let splinters3;
		let splinters4;

		for (var i = 0; i < pairs.length; i++) { ///отслеживание столкновения
			const pair = pairs[i];

			const bulletBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.BULLET_LABEL);
			const evilShellBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.EVIL_SHELL_LABEL);
			const houseBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.HOUSE_LABEL);
			const evilPlaneBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.EVIL_PLANE_LABEL);
			const otherBody = [pair.bodyA, pair.bodyB].find(body => body.label != window.labels.BULLET_LABEL);
			
			

			if (!otherBody) {
				continue;
			}

			if (!bulletBody && !evilShellBody ) {
				continue;
			}
			
			if (bulletBody && otherBody.label == window.labels.BULLET_SOURCE_LABEL) {
				//	do nothing, since it's a bullet source
				continue;
			}

			if (bulletBody) {
				Matter.World.remove(engine.world, bulletBody);
				SoundManager.playSound('bulletExplodes');
			}
			
			if (evilShellBody && houseBody) {
				Matter.World.remove(engine.world, houseBody);
				SoundManager.playSound('oi');
			}	
			
			if (bulletBody && evilPlaneBody) {
				Matter.World.add (engine.world, 
				
				[
				splinters3=Bodies.rectangle(evilPlaneBody.position.x-12, evilPlaneBody.position.y+3, 16, 4, {collisionFilter: {group: -1},render: {sprite: {texture: "images/RTSobject_09.png"}} }),
				splinters4=Bodies.rectangle(evilPlaneBody.position.x-5, evilPlaneBody.position.y-8, 9, 2, {collisionFilter: {group: -1},render: {sprite: {texture: "images/RTSobject_04.png"}} })],
			
				Body.setAngularVelocity( splinters3, Math.PI/2),
				Body.setAngularVelocity( splinters4, Math.PI/6),
		
				Body.setVelocity(splinters3, { x: 4 + Math.random() * 5, y: - Math.random() * 4 }),
				Body.setVelocity(splinters4, { x: Math.random() * 5, y:  Math.random() * 8 }),
				);
				

				
				Matter.World.remove(engine.world, evilPlaneBody);
				
				SoundManager.playSound('shellExplodes');
			}
			
			if (evilShellBody) {
				Matter.World.remove(engine.world, evilShellBody);				
				SoundManager.playSound('shellExplodes', 1);
			}
			

			
			
		}
	});
	
}; */
	

/* 
if (randomInteger=1){

	Events.on(engine, 'collisionStart', event => {
		const pairs = event.pairs;
		

		let splinters4;

		for (var i = 0; i < pairs.length; i++) { ///отслеживание столкновения
			const pair = pairs[i];

			const bulletBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.BULLET_LABEL);
			const evilShellBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.EVIL_SHELL_LABEL);
			const houseBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.HOUSE_LABEL);
			const evilPlaneBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.EVIL_PLANE_LABEL);
			const otherBody = [pair.bodyA, pair.bodyB].find(body => body.label != window.labels.BULLET_LABEL);
			
			

			if (!otherBody) {
				continue;
			}

			if (!bulletBody && !evilShellBody ) {
				continue;
			}
			
			if (bulletBody && otherBody.label == window.labels.BULLET_SOURCE_LABEL) {
				//	do nothing, since it's a bullet source
				continue;
			}

			if (bulletBody) {
				Matter.World.remove(engine.world, bulletBody);
				SoundManager.playSound('bulletExplodes');
			}
			
			if (evilShellBody && houseBody) {
				Matter.World.remove(engine.world, houseBody);
				SoundManager.playSound('oi');
			}	
			
			if (bulletBody && evilPlaneBody) {
				Matter.World.add (engine.world, 
				
				[
				splinters4=Bodies.rectangle(evilPlaneBody.position.x-5, evilPlaneBody.position.y-8, 9, 2, {collisionFilter: {group: -1},render: {sprite: {texture: "images/RTSobject_04.png"}} })],
			
				Body.setAngularVelocity( splinters4, Math.PI/6),
			
				Body.setVelocity(splinters4, { x: Math.random() * 5, y:  Math.random() * 8 }),
				);
				

				
				Matter.World.remove(engine.world, evilPlaneBody);
				
				SoundManager.playSound('shellExplodes');
			}
			
			if (evilShellBody) {
				Matter.World.remove(engine.world, evilShellBody);				
				SoundManager.playSound('shellExplodes', 1);
			}
			

			
			
		}
	});
	
};	 */
	
		/* Body.setAngularVelocity( generateBrickWall, Math.PI/6); */
	

	
	
	document.body.onkeyup = event => {
		if(event.keyCode == 32){
			onSpaceBarPressed();
		}

		window.SoundManager.initializeifNecessary();
	};


	Engine.run(engine);
	Render.run(render);

};


window.onload = runMyShit;