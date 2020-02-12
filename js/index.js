'use strict';
//	Пусть все твои JS-файлы всегда начинаются с такой строки, как выше. Она должна быть самая первая.


//	везде использовать var — тухлая тема.
//	https://learn.javascript.ru/let-const
//	используй const везде, где это возможно. в остальных 5% случаев используй let.




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

	const render = Render.create({	/// создания нового рендерера
		element: window.document.body,	///ключ element, куда библиотека вставляет холст, можно поменять на canvas
		engine: engine, ///указание движка, который должен использоваться для визуализации мира
		options: {
			width: SCREEN_SIZE.width,
			height: SCREEN_SIZE.height,
			wireframes: false ////каркас
		}
	});

	const GROUND_HEIGHT = 30;
	const ground = Bodies.rectangle(0, SCREEN_SIZE.height - GROUND_HEIGHT, SCREEN_SIZE.width, GROUND_HEIGHT, { isStatic: true });
 
	const ArtaDown = Bodies.rectangle(600, SCREEN_SIZE.height-GROUND_HEIGHT-20 , 50, 20, { isStatic: true });
	
	const group = Body.nextGroup(true);
	const ArtaUp = Composites.stack(600, SCREEN_SIZE.height-GROUND_HEIGHT-20 , 1, 1, 1, 10, function(x, y) {
            return Bodies.rectangle(x, y, 50, 10,  { ///размеры блока
                collisionFilter: {
                     group: group 
                },
				
                 });
			
        });
	
	Composites.chain(ArtaUp,0.5, 0, -0.4, 0, {stiffness: 0.8, length: 1});
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
        }));	
	
	
	
 
	
 
World.add(engine.world, [ground, ArtaDown, ArtaUp]);





	Engine.run(engine); ///запуск движка
	Render.run(render); ///запуск рендера
	

	

};


window.onload = runMyShit;