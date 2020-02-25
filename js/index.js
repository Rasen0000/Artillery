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


window.labels = {
	BULLET_SOURCE_LABEL: 'bullet_source',
	BULLET_LABEL: 'bullet',
	EVIL_SHELL_LABEL: 'evil_shell',
	PLANE_LABEL: 'plane',
	HOUSE_LABEL: 'house'
	
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
	const ground = Bodies.rectangle(0, SCREEN_SIZE.height - GROUND_HEIGHT, SCREEN_SIZE.width, GROUND_HEIGHT, { isStatic: true });

const generateBrickWall = (fromX, fromY) => {
	const HEIGHT_BRICKS = 2;
	const WIDTH_BRICKS = 2;

	const BRICK_SIZE = {
		height: 9,
		width: 14
	};

	const result = [];

	for (let brickX = 0; brickX < WIDTH_BRICKS; brickX += 1) {
		for (let brickY = 0; brickY < HEIGHT_BRICKS; brickY += 1) {

			result.push(Matter.Bodies.rectangle(
				fromX + brickX * BRICK_SIZE.width,
				fromY + brickY * BRICK_SIZE.height,
				BRICK_SIZE.width,
				BRICK_SIZE.height
			));
		}
	}

	return result;
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


	const ArtaDown = Bodies.rectangle(600, SCREEN_SIZE.height - GROUND_HEIGHT - 20, 50, 20, {
		collisionFilter: {
			group: -2
		},
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


	Events.on(engine, 'collisionStart', event => {
		const pairs = event.pairs;

		for (var i = 0; i < pairs.length; i++) { ///отслеживание столкновения
			const pair = pairs[i];

			const bulletBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.BULLET_LABEL);
			const evilShellBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.EVIL_SHELL_LABEL);
			const houseBody = [pair.bodyA, pair.bodyB].find(body => body.label == window.labels.HOUSE_LABEL);
			const otherBody = [pair.bodyA, pair.bodyB].find(body => body.label != window.labels.BULLET_LABEL);

			if (!otherBody) {
				continue;
			}

			if (!bulletBody && !evilShellBody) {
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
				Matter.World.add (engine.world, generateBrickWall(100, SCREEN_SIZE.height - 15 * GROUND_HEIGHT, { ///размеры блока
             /*    collisionFilter: {
                     group: group 
                }, */
                render: {
                    sprite: {texture: './images/rope2.png'}
                }
           
		}));
				
				
				Matter.World.remove(engine.world, houseBody);
				SoundManager.playSound('oi');
			}	
			
			if (evilShellBody) {
				
				Matter.World.remove(engine.world, evilShellBody);
				SoundManager.playSound('shellExplodes', 1);
			}
		}
	});
	
	

	
	
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