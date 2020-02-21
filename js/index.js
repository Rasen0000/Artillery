'use strict';

// используй const везде, где это возможно. в остальных 5% случаев используй let.


//	https://freesound.org/browse/tags/game-sound/
//	username: edlcxykl@supere.ml
//	pwd: edlcxykl@supere.ml

const sounds = {
	bulletExplodes: new Audio('./sounds/explosion.mp3'),
	shellExplodes: new Audio('./sounds/shell_explosion.wav'),
	shoot: new Audio('./sounds/shot.flac'),
	bgMusic: new Audio('./sounds/bg_music.mp3')
};

sounds.bgMusic.currentTime = 90;


const playSound = (eventId, offset = 0) => {
	sounds[eventId].currentTime = offset;
	sounds[eventId].play();
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

	const BULLET_SOURCE_LABEL = 'bullet_source';

	const GROUND_HEIGHT = 30;
	const ground = Bodies.rectangle(0, SCREEN_SIZE.height - GROUND_HEIGHT, SCREEN_SIZE.width, GROUND_HEIGHT, { isStatic: true });

	const ArtaDown = Bodies.rectangle(600, SCREEN_SIZE.height - GROUND_HEIGHT - 20, 50, 20, {
		collisionFilter: {
			group: -2
		},
		label: BULLET_SOURCE_LABEL,
		isStatic: true
	});

	const ArtaUp = Bodies.rectangle(600, SCREEN_SIZE.height - GROUND_HEIGHT - 40, 15, 30, {
		collisionFilter: {
			group: -2
		},
		label: BULLET_SOURCE_LABEL,
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



	const triangle1 = Bodies.polygon(580, SCREEN_SIZE.height - GROUND_HEIGHT - 37, 3, 8, {
		angle: -Math.PI * 0.15,
		isStatic: true,
		render: {
			visible: false
		}
	});

	const triangle2 = Bodies.polygon(617, SCREEN_SIZE.height - GROUND_HEIGHT - 37, 3, 8, {
		angle: -Math.PI * 0.15,
		isStatic: true,
		render: {
			visible: false
		}
	});


	const evil = Bodies.polygon(180, SCREEN_SIZE.height - GROUND_HEIGHT - 75, 8, 80, {
		angle: -Math.PI * 0.35,
		isStatic: true,
		chamfer: {
			radius: [5, 10, 20, 50]
		}
	});



	World.add(engine.world, [ground, ArtaDown, ArtaUp, constraint, /* constraint2, */ triangle1, triangle2, evil ]);


	const BULLET_LABEL = 'bullet';
	const EVIL_SHELL_LABEL = 'evil_shell';


	const generateEvilShell = () => {
		const size = { width: 55, height: 25 };
		const position = { x: 0, y: SCREEN_SIZE.height / 4 + Math.round(Math.random() * SCREEN_SIZE.height / 4) };

		const evilShell = Bodies.rectangle(position.x, position.y, size.width, size.height, {
			label: EVIL_SHELL_LABEL,
			render: {
				sprite: { texture: './images/evil_shell.png' }
			}
		});
		Body.setVelocity(evilShell, { x: 8 + Math.random() * 5, y: - Math.random() * 8 });

		World.add(engine.world, evilShell);
	};


	setInterval(() => {
		generateEvilShell();

		if (Math.random() > 0.5) {
			setTimeout(generateEvilShell, 1e3);
		}

		if (Math.random() > 0.8) {
			setTimeout(generateEvilShell, 1.5 * 1e3);
		}

	}, 7 * 1e3);



	const degreesToRadians = degrees => degrees * Math.PI / 180;

	const onSpaceBarPressed = () => {
		let x = ArtaUp.position.x;
		let y = ArtaUp.position.y;

		const bullet = Bodies.circle(x, y, 4, {
			label: BULLET_LABEL,
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

		playSound('shoot');
	};


	Events.on(engine, 'collisionStart', function(event) {
		const pairs = event.pairs;

		for (var i = 0; i < pairs.length; i++) { ///отслеживание столкновения
			const pair = pairs[i];

			const bulletBody = [pair.bodyA, pair.bodyB].find(body => body.label == BULLET_LABEL);
			const evilShellBody = [pair.bodyA, pair.bodyB].find(body => body.label == EVIL_SHELL_LABEL);
			const otherBody = [pair.bodyA, pair.bodyB].find(body => body.label != BULLET_LABEL);

			if (!otherBody) {
				continue;
			}

			if (!bulletBody && !evilShellBody) {
				continue;
			}

			if (bulletBody && otherBody.label == BULLET_SOURCE_LABEL) {
				//	do nothing, since it's a bullet source
				continue;
			}

			if (bulletBody) {
				Matter.World.remove(engine.world, bulletBody);
				playSound('bulletExplodes');
			}

			if (evilShellBody) {
				Matter.World.remove(engine.world, evilShellBody);
				playSound('shellExplodes', 1);
			}
		}
	});

	document.body.onkeyup = event => {
		if(event.keyCode == 32){
			onSpaceBarPressed();
		}

		sounds.bgMusic.play();
	};


	Engine.run(engine); ///запуск движка
	Render.run(render); ///запуск рендера

};


window.onload = runMyShit;