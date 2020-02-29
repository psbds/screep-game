/// <reference path="./screeps.d.ts" />

import { Roles } from "./enums.roles";
import Harvester from "./roles.harvest";
import Upgrader from "./roles.upgrader";
import Builder from "./roles.builder";

import SpawnHarvester from "./spawn.harvester";
import SpawnUpgrader from "./spawn.upgrader";
import spawnBuilder from "./spawn.builder";
import RoadMaker from "./service.roadmaker.flag";

export function loop() {
    var ROOM = Game.rooms["E24N11"];
    for (var creepName in Game.creeps) {
        var creep = Game.creeps[creepName];
        var memory: any = creep.memory;

        if (memory.role == Roles.HARVESTER) {
            Harvester.run(creep);
        }

        if (memory.role == Roles.UPGRADER) {
            Upgrader.run(creep);
        }

        if (memory.role == Roles.BUILDER) {
            Builder.run(creep);
        }
    }

    var numberOfHarvesters = Harvester.getNumberOfCreeps(Game.creeps);
    var numberOfUpgraders = Upgrader.getNumberOfCreeps(Game.creeps);
    var numberOfBuilders = Builder.getNumberOfCreeps(Game.creeps);
    Game.rooms["E24N11"].visual.text(`
        Harvesters: ${numberOfHarvesters}
        Upgraders: ${numberOfUpgraders}
        Builder: ${numberOfBuilders}
    `, 20, 25);

    // console.log(JSON.stringify(Game.rooms["E24N11"].memory, null, 4));


    if (typeof (numberOfHarvesters) == "number" && numberOfHarvesters < 2) {
        SpawnHarvester.spawnHarvester(Game.spawns["Main"]);
    }

    if (typeof (numberOfUpgraders) == "number" && numberOfUpgraders < 6) {
        SpawnUpgrader.spawn(Game.spawns["Main"]);
    }

    if (typeof (numberOfBuilders) == "number" && numberOfBuilders < 4) {
        spawnBuilder.spawn(Game.spawns["Main"]);
    }
/*
    var roads = Game.rooms["E24N11"].memory;
    var k = Object.keys(roads);
    k.sort(function (a, b) {
        return roads[b] - roads[a]
    });
   
    var structures = ROOM.find(FIND_STRUCTURES, {
        filter: function (object) {
            return object.structureType === STRUCTURE_ROAD;
        }
    })

    var count = 0;
    for (var i of k) {
        var args = i.split("=");
        var x = parseInt(args[0]), y = parseInt(args[1]);

        if (!structures.some(s => s.structureType == STRUCTURE_ROAD && s.pos.x == x && s.pos.y == y)) {
            // console.log(`Construct ${x}-${y}`)
            Game.rooms["E24N11"].createFlag(x, y, "R" + i, COLOR_RED);
            ROOM.createConstructionSite(x, y, STRUCTURE_ROAD)
            count++;
        }
        //    console.log(i);
        if (count > 5) {
            break;
        }
    }
    // console.log(JSON.stringify(k));
*/
    RoadMaker.roadFlag();
}



/*
global.sp_hav = function(){
    const spawner = require("./spawner")
    spawner.spawn("Main", "harvester-"+Game.time, [WORK,MOVE, CARRY], roles.HARVESTER)
}*/