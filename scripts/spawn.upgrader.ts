/// <reference path="./screeps.d.ts" />
import { Roles } from "./enums.roles";
import Spawn from "./spawn_";

class SpawnUpgrader extends Spawn {
    spawn(parent: StructureSpawn) {
        super.createCreep(parent, "upgrader-" + Game.time, [WORK, MOVE, CARRY], { memory: { role: Roles.UPGRADER } });
    }
}

export default new SpawnUpgrader();