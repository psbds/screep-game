/// <reference path="./screeps.d.ts" />
import { Roles } from "./enums.roles";
import Role from "./roles_";

class Harvest extends Role {
    public roleName: string = Roles.HARVESTER;

    run(creep: Creep) {
        var memoRoom = creep.room.memory;
        memoRoom[`${creep.pos.x}=${creep.pos.y}`] = memoRoom[`${creep.pos.x}=${creep.pos.y}`] ? memoRoom[`${creep.pos.x}=${creep.pos.y}`] + 1 : 1;

        if (creep.store.getFreeCapacity() != 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
}

export default new Harvest();