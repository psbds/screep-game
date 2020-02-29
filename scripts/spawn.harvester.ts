/// <reference path="./screeps.d.ts" />
import { Roles } from "./enums.roles";
import Spawn from "./spawn_";

class SpawnHarvester extends Spawn {
    spawnHarvester(parent: StructureSpawn) {
        super.createCreep(parent, "harvester-" + Game.time, [WORK, MOVE, CARRY], { memory: { role: Roles.HARVESTER } });
    }
}

export default new SpawnHarvester();