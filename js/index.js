'use strict';

// используй const везде, где это возможно. в остальных 5% случаев используй let.




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
engine: engine, ///указание движка, который должен использоваться для визуализации мира
options: {
width: SCREEN_SIZE.width,
height: SCREEN_SIZE.height,
wireframes: false ////каркас
}
});

const GROUND_HEIGHT = 30;
const ground = Bodies.rectangle(0, SCREEN_SIZE.height - GROUND_HEIGHT, SCREEN_SIZE.width, GROUND_HEIGHT, { isStatic: true });
 
const ArtaDown = Bodies.rectangle(600, SCREEN_SIZE.height-GROUND_HEIGHT-20 , 50, 20, {collisionFilter: {group: -2}, isStatic: true });
const ArtaUp = Bodies.rectangle(600, SCREEN_SIZE.height-GROUND_HEIGHT-40 , 15, 30, {collisionFilter: {group: -2}});
const constraint = Constraint.create({
        bodyA: ArtaDown,
pointA: { x: 0, y: -15 },
        bodyB: ArtaUp,
pointB: { x: 0, y: 15 }
    });
const constraint2 = Constraint.create({
        bodyA: ArtaDown,
pointA: { x: -6, y: 4 },
        bodyB: ArtaUp,
pointB: { x: -1, y: 7 }
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
document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});



Events.on(engine, "beforeTick", function(event) {

  
  if (keys[70]) {
    ArtaUp.torque = -0.001;
  } else {
    if (keys[68]) {
    ArtaUp.torque = 0.001;
    } 
    }
  
}); 





 
 const triangle1= Bodies.polygon(580, SCREEN_SIZE.height-GROUND_HEIGHT-37, 3, 8, {angle: -Math.PI * 0.15,isStatic: true, render: {visible: false}} );

 const triangle2= Bodies.polygon(617, SCREEN_SIZE.height-GROUND_HEIGHT-37, 3, 8, {angle: -Math.PI * 0.15,isStatic: true, render: {visible: false}});
 
 
 const evil = Bodies.polygon(180, SCREEN_SIZE.height-GROUND_HEIGHT-75, 8, 80, {
angle: -Math.PI * 0.35,
isStatic: true,
            chamfer: { radius: [5, 10, 20, 50] }
        });
		
		
		
/* const chevron = Bodies.fromVertices('100 0 75 50 100 100 25 100 0 50 25 0');		
		 */
 
World.add(engine.world, [ground, ArtaDown, ArtaUp, constraint, /* constraint2, */ triangle1, triangle2, evil, /* chevron */]);

Events.on(engine, 'beforeUpdate', function(event) {
        const engine = event.source;
		const evilShell = Bodies.rectangle(30, 30, 60, 60);	

        // apply random forces every 5 secs
        if (event.timestamp % 5000 < 50)
            World.add(engine.world, evilShell);
    });



Events.on(engine, "tick", function(event) {

	
if (keys[32]) {
	let x=ArtaUp.position.x;
	let y=ArtaUp.position.y;
	let bullet = Bodies.circle(x, y, 8); 
	Body.setVelocity( bullet, {x: 5, y: -10});
	World.add(engine.world, bullet);
	
	
	
	Events.on(engine, 'collisionStart', function(event) {
        var pairs = event.pairs;
	for (var i = 0; i < pairs.length; i++) { ///отслеживание столкновения
        var pair = pairs[i];
			if (pair.bodyA === bullet && pair.bodyB === evilShell) { ///здесь ошибка
			pair.bodyB.render.fillStyle = '#333';
			Matter.World.remove(engine.world, evilShell);} } ///здесь ошибка
	});
}
});



Engine.run(engine); ///запуск движка
Render.run(render); ///запуск рендера


};


window.onload = runMyShit;
