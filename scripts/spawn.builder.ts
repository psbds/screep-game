/// <reference path="./screeps.d.ts" />
import { Roles } from "./enums.roles";
import Spawn from "./spawn_";

class SpawnBuilder extends Spawn {
    spawn(parent: StructureSpawn) {
        super.createCreep(parent, "builder-" + Game.time, [WORK, MOVE, CARRY], { memory: { role: Roles.BUILDER } });
    }
}

export default new SpawnBuilder();