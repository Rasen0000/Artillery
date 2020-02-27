'use strict';

window.EnemyGenerator = (() => {
	let g_engine = null;
	let g_screenSize = null;


	const generateRocket = (position = null, velocity = null) => {
		const size = { width: 55, height: 25 };
		const initialPosition = position || { x: 0, y: g_screenSize.height / 4 + Math.round(Math.random() * g_screenSize.height / 4) };

		const evilShell = Matter.Bodies.rectangle(initialPosition.x, initialPosition.y, size.width, size.height, {
			label: window.labels.EVIL_SHELL_LABEL,
			render: {
				sprite: { texture: './images/evil_shell.png' }
			}
		});

		const initialVelocity = velocity || { x: 8 + Math.random() * 5, y: - Math.random() * 8 };
		Matter.Body.setVelocity(evilShell, initialVelocity);

		Matter.World.add(g_engine.world, evilShell);
	};


	setInterval(() => {
		generateRocket();

		if (Math.random() > 0.5) {
			setTimeout(generateRocket, 1e3);
		}

		if (Math.random() > 0.8) {
			setTimeout(generateRocket, 1.5 * 1e3);
		}

	}, 7 * 1e3);


	class Plane {
		constructor(position, velocity) {
			const size = { width: 180, height: 30 };

			this._physicalBody = Matter.Bodies.rectangle(position.x, position.y, size.width, size.height, {
				label: window.labels.EVIL_PLANE_LABEL,
				render: {
					sprite: { texture: './images/plane.png' }
				}
			});

			Matter.Body.setVelocity(this._physicalBody, velocity);
			Matter.World.add(g_engine.world, this._physicalBody);

			setTimeout(this._dropTheBomb.bind(this), Math.random() * 50);
			setTimeout(this._dropTheBomb.bind(this), Math.random() * 100 + 50);
			setTimeout(this._dropTheBomb.bind(this), Math.random() * 100 + 200);
		}


		isAlive() {
			return g_engine.world.bodies.includes(this._physicalBody);
		}


		_dropTheBomb() {
			if (!this.isAlive()) {
				return;
			}

			const bombPosition = Object.assign({}, this._physicalBody.position);
			bombPosition.y += 30;

			generateRocket(bombPosition, {
				x: this._physicalBody.velocity.x,
				y: 0
			});
		}
	}


	const generatePlane = () => {
		const size = { width: 180, height: 30 };
		const position = { x: 0, y: g_screenSize.height / 4 + Math.round(Math.random() * g_screenSize.height / 4) };

		return new Plane(position, { x: 27 + Math.random() * 5, y: -13 - Math.random() * 5 });
	};


	setInterval(generatePlane, 3 * 1e3);


	return {
		initialize(engine, screenSize) {
			g_engine = engine;
			g_screenSize = screenSize;
		}
	}
})();


