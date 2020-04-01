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
		oi: new Audio('./sounds/oi.mp3'),
		gameOver: new Audio('./sounds/game_over.ogg')
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
let scoreDisplay;
let highScoreDisplay;
/* let score = ('.score'); */
let score = 0;
let HighScore = 0;
let scorePlane = 10;
let scoreShell = 1;
let lives = 5;///жизни домиков, есть еще один lives после перезапуска
let livesHouse1 = lives;
let livesHouse2 = lives;
let livesHouse3 = lives;
let livesHouse4 = lives;
let livesHouse5 = lives;
let damage = 3; ///урон от бомбы
let damageSplinter = 1; /// урон от осколков
/* let allHouse = ['house', 'house2'];
let allHouseall = allHouse.length; */
let allHouseall = 5;//количество домиков

console.log('allHouse:', allHouseall);
console.log(lives);

/* function drawScore() {

    livesHouse.fillText("Score: "+lives, 8, 20);
} */

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
	HOUSE_LABEL1: 'house',
	HOUSE_LABEL2: 'house2',
	HOUSE_LABEL3: 'house3',
	HOUSE_LABEL4: 'house4',
	HOUSE_LABEL5: 'house5',
	SPLINTERS_LABEL: 'splinters',
	PART_LABEL: 'part_plane'
	
};



/* function gameOver (){
	alert('Game Over');
	SoundManager.playSound('gameOver');
	runMyShit.reset();
}
 */



/* function gameOver (question, yes){
  if (confirm(question)) yes();
  
  gameOver(
	alert('Game Over');
	SoundManager.playSound('gameOver');
	Matter.Render.stop(this.debugRender);
    Matter.World.clear(this.engine.world);
    Matter.Engine.clear(this.engine);
	runMyShit.reset();
	resetScore();
	)
} */

function resetScore(){
	score = 0;
	}

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





	const house = Bodies.polygon(680, SCREEN_SIZE.height - GROUND_HEIGHT - 45, 3, 50, { isStatic: true, label: window.labels.HOUSE_LABEL1,
	angle: Math.PI * 0.5 ,
 				render: {
				sprite: { texture: './images/houseAlt2.png', xScale: 0.3, yScale: 0.3 }
			}  });
			
	World.add(engine.world, house);
	
	
	const house2 = Bodies.polygon(450, SCREEN_SIZE.height - GROUND_HEIGHT - 45, 3, 50, { isStatic: true, label: window.labels.HOUSE_LABEL2,
	angle: Math.PI * 0.5 ,
				render: {
				sprite: { texture: './images/house2.png', xScale: 0.3, yScale: 0.3}
			} });
	World.add(engine.world, house2);

	const house3 = Bodies.polygon(790, SCREEN_SIZE.height - GROUND_HEIGHT - 45, 3, 50, { isStatic: true, label: window.labels.HOUSE_LABEL3,
	angle: Math.PI * 0.5 ,
				render: {
				sprite: { texture: './images/house1.png', xScale: 0.3, yScale: 0.3}
			} });
	World.add(engine.world, house3);
	
	
	const house4 = Bodies.polygon(890, SCREEN_SIZE.height - GROUND_HEIGHT - 45, 3, 50, { isStatic: true, label: window.labels.HOUSE_LABEL4,
	angle: Math.PI * 0.5 ,
				render: {
				sprite: { texture: './images/house2.png', xScale: 0.3, yScale: 0.3}
			} });
	World.add(engine.world, house4);
	
	const house5 = Bodies.polygon(1200, SCREEN_SIZE.height - GROUND_HEIGHT - 45, 3, 50, { isStatic: true, label: window.labels.HOUSE_LABEL5,
	angle: Math.PI * 0.5 ,
				render: {
				sprite: { texture: './images/houseAlt1.png', xScale: 0.3, yScale: 0.3}
			} });
	World.add(engine.world, house5);

			const text0 = Bodies.rectangle(50, 50, 1, 1, { isStatic: true,  render: {
						sprite: { texture: './images/text_0_small.png'}
					} });
			const text1 = Bodies.rectangle(50, 50, 1, 1, { isStatic: true,  render: {
						sprite: { texture: './images/text_1_small.png'}
					} });
			const text2 = Bodies.rectangle(50, 50, 1, 1, { isStatic: true,  render: {
						sprite: { texture: './images/text_2_small.png'}
					} });
			const text3 = Bodies.rectangle(50, 50, 1, 1, { isStatic: true,  render: {
						sprite: { texture: './images/text_3_small.png'}
					} });	
			const text4 = Bodies.rectangle(50, 50, 1, 1, { isStatic: true,  render: {
						sprite: { texture: './images/text_4_small.png'}
					} });
			const text5 = Bodies.rectangle(50, 50, 1, 1, { isStatic: true,  render: {
						sprite: { texture: './images/text_5_small.png'}
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

	 if (allHouseall<6 && allHouseall >4) {
		console.log('allHouse:', allHouseall);
	Matter.World.add (engine.world, text5)};


if (randomInteger=2){

	Events.on(engine, 'collisionStart', event => {
		const pairs = event.pairs;
		
	if (allHouseall<5 && allHouseall >3) {
	console.log('allHouse:', allHouseall);
	Matter.World.remove(engine.world, text5);
	Matter.World.add (engine.world, text4)}
	
	else if (allHouseall<4 && allHouseall >2) {
	console.log('allHouse:', allHouseall);
	Matter.World.remove(engine.world, text4);
	Matter.World.add (engine.world, text3)}
	
	else if (allHouseall<3 && allHouseall >1) {
	console.log('allHouse:', allHouseall);
	Matter.World.remove(engine.world, text3);
	Matter.World.add (engine.world, text2)}
		
	else if (allHouseall<2 && allHouseall >0) {
	console.log('allHouse:', allHouseall);
	Matter.World.remove(engine.world, text2);
	Matter.World.add (engine.world, text1)}

	else if (allHouseall<1)  {
		console.log(allHouseall);
		Matter.World.remove(engine.world, text1);
		Matter.World.add (engine.world, text0);		
		console.log('allHouse:', allHouseall);
		gameOver ();
	};
		

		for (var i = 0; i < pairs.length; i++) { ///отслеживание столкновения
			const pair = pairs[i];
			
		let splinters1;
		let splinters2;
		let splinters3;
		let splinters4;
			
			
			 
			

			const bulletBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.BULLET_LABEL);
			const evilShellBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.EVIL_SHELL_LABEL);
			const houseBody1 = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.HOUSE_LABEL1);
			const houseBody2 = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.HOUSE_LABEL2);
			const houseBody3 = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.HOUSE_LABEL3);
			const houseBody4 = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.HOUSE_LABEL4);
			const houseBody5 = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.HOUSE_LABEL5);
			
			
			/* const textLabel = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.TEXT_LABEL); */
			const evilPlaneBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.EVIL_PLANE_LABEL);
			const otherBody = [pair.bodyA, pair.bodyB].find(body => body.label != window.labels.BULLET_LABEL);
			const partPlaneBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.PART_LABEL);
			
			
				
			

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
			
			if (evilShellBody && houseBody1) {

			
			 ///нужен текстлейбл


	livesHouse1-=damage;
	if (livesHouse1<0)  {
		console.log(livesHouse1);
		
		Matter.World.remove(engine.world, houseBody1);
		allHouseall-=1;
		console.log('allHouse:', allHouseall);
	}

				console.log(livesHouse1);		
			
				
				/* setInterval(() => { setTimeout(Matter.World.remove(engine.world, houseBody), 3000)}); */
				///как ввести взрыв после времени
			
				SoundManager.playSound('oi');
			}	
			

	if (evilShellBody && houseBody2) {
	livesHouse2-=damage;
		if (livesHouse2<0)  {
		console.log(livesHouse2);
		Matter.World.remove(engine.world, houseBody2);
		allHouseall-=1;
		console.log('allHouse:', allHouseall);
	}
			console.log(livesHouse2);		
			SoundManager.playSound('oi');
			}	
			
	if (evilShellBody && houseBody3) {
	livesHouse3-=damage;
		if (livesHouse3<0)  {
		console.log(livesHouse3);
		Matter.World.remove(engine.world, houseBody3);
		allHouseall-=1;
		console.log('allHouse:', allHouseall);
	}
			console.log(livesHouse3);		
			SoundManager.playSound('oi');
			}			
	if (evilShellBody && houseBody4) {
	livesHouse4-=damage;
		if (livesHouse4<0)  {
		console.log(livesHouse4);
		Matter.World.remove(engine.world, houseBody4);
		allHouseall-=1;
		console.log('allHouse:', allHouseall);
	}
			console.log(livesHouse4);		
			SoundManager.playSound('oi');
			}			
	if (evilShellBody && houseBody5) {
	livesHouse5-=damage;
		if (livesHouse5<0)  {
		console.log(livesHouse5);
		Matter.World.remove(engine.world, houseBody5);
		allHouseall-=1;
		console.log('allHouse:', allHouseall);
	}
			console.log(livesHouse5);		
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
				score=score+scorePlane;
				/* score.text(score); */
				scoreDisplay = document.getElementById('score');
				scoreDisplay.innerText = score;
				console.log('Score:', score);
				SoundManager.playSound('shellExplodes');
			}
			

			if (bulletBody && evilShellBody ) {
				Matter.World.remove(engine.world, evilShellBody);	
				score=score+scoreShell;
				scoreDisplay = document.getElementById('score');
				scoreDisplay.innerText = score;
				/* scoreDisplay.innerText = score; */
				console.log('Score:', score);				
				SoundManager.playSound('shellExplodes', 1);
			}
			
			
			if (evilShellBody) {
				Matter.World.remove(engine.world, evilShellBody);				
				SoundManager.playSound('shellExplodes', 1);
			}
					
			
		}
	});
	
};
	

		Events.on(engine, 'collisionEnd', function(event) {
        var pairs = event.pairs;
		
		
		for (var i = 0; i < pairs.length; i++) { ///отслеживание столкновения
            var pair = pairs[i];
			const bulletBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.BULLET_LABEL);
			const evilShellBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.EVIL_SHELL_LABEL);
			const houseBody1 = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.HOUSE_LABEL1);
			const houseBody2 = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.HOUSE_LABEL2);
			const houseBody3 = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.HOUSE_LABEL3);
			const houseBody4 = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.HOUSE_LABEL4);
			const houseBody5 = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.HOUSE_LABEL5);
			const evilPlaneBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.EVIL_PLANE_LABEL);
			const splinterBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.SPLINTERS_LABEL);			
			const otherBody = [pair.bodyA, pair.bodyB].find(body => body.label != window.labels.BULLET_LABEL);
			const partPlaneBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.PART_LABEL);
			
			

			

	if (splinterBody && houseBody1) {
	
	
	livesHouse1-=damageSplinter;
	if (livesHouse1<0)  {
		console.log(livesHouse1);
		
		Matter.World.remove(engine.world, house);
		 allHouseall-=1; 
		console.log('allHouse:', allHouseall);
	}
				console.log(livesHouse1);		
				SoundManager.playSound('oi');
			}
			
			
	if (splinterBody && houseBody2) {
	
	
	livesHouse2-=damageSplinter;
	if (livesHouse2<0)  {
		console.log(livesHouse2);
		
		Matter.World.remove(engine.world, house2);
		allHouseall-=1; 
		console.log('allHouse:', allHouseall);
	}
				console.log(livesHouse2);	
				SoundManager.playSound('oi');
			}
			
	if (splinterBody && houseBody3) {
	
	
	livesHouse3-=damageSplinter;
	if (livesHouse3<0)  {
		console.log(livesHouse3);
		
		Matter.World.remove(engine.world, house3);
		allHouseall-=1; 
		console.log('allHouse:', allHouseall);
	}
				console.log(livesHouse3);	
				SoundManager.playSound('oi');
			}
			
	if (splinterBody && houseBody4) {
	
	
	livesHouse4-=damageSplinter;
	if (livesHouse4<0)  {
		console.log(livesHouse4);
		
		Matter.World.remove(engine.world, house4);
		allHouseall-=1; 
		console.log('allHouse:', allHouseall);
	}
				console.log(livesHouse4);	
				SoundManager.playSound('oi');
			}	
			
	if (splinterBody && houseBody5) {
	
	
	livesHouse5-=damageSplinter;
	if (livesHouse5<0)  {
		console.log(livesHouse5);
		
		Matter.World.remove(engine.world, house5);
		allHouseall-=1; 
		console.log('allHouse:', allHouseall);
	}
				console.log(livesHouse5);	
				SoundManager.playSound('oi');
			}				
			
		}
		});
		
	function gameOver (){
	alert('Game Over');
	SoundManager.playSound('gameOver');
	/* window.EnemyGenerator.stop(); */
	/* runMyShit.reset(); */
/* 	Engine.clear(engine);
	return runMyShit(); */
	/* Render.stop(render); */
World.clear(engine.world);
	Matter.World.remove(engine.world, text0);
	lives = 5;
	allHouseall = 5;
	
	World.add(engine.world, [
	ground, ArtaDown, ArtaUp, constraint,
	house,
	house2,
	house3,
	house4,
	house5,	
	text5

	]);
	
	if (score>HighScore){
	HighScore=score;
	highScoreDisplay = document.getElementById('HighScore');
	highScoreDisplay.innerText = HighScore;
	console.log('HighScore:', HighScore);
	};
	
	resetScore();
	/* Engine.clear(engine);  */
	/* Render.run(render); */
}	
		
		


	
	
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